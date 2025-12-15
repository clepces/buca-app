// ======================================================
// ARCHIVO: src/store/actions.js
// VERSIÓN: 3.1.0 (Arquitectura Híbrida)
// AUTOR: Clepces & IA Team
// PROPÓSITO: Manejo de acciones y mutaciones del estado global.
// NOTA: Las Vistas LLAMAN a estas acciones. Las acciones LLAMAN a los servicios.
// ======================================================

import { state, getInitialState } from './state.js';
import { loadUserPermissions } from '../services/permissions.service.js';
import { Logger } from '../services/logger.service.js';

// Importamos TODAS las funciones del servicio de almacenamiento
import {
    // --- LEGACY (Productos/Templates) ---
    saveNewProduct,
    updateProductById,
    deleteProductById,
    saveGlobalTemplate,
    updateGlobalTemplate,
    deleteGlobalTemplate,

    // --- NUEVO (Puente Genérico) ---
    getGenericItems,
    createGenericItem,
    updateGenericItem, // Agregamos update
    deleteGenericItem  // Agregamos delete
} from '../services/storage.service.js';

// ======================================================
// 1. SISTEMA DE REACTIVIDAD (CORE)
// Permite que la UI se actualice cuando cambia el estado.
// ======================================================

let rerenderCallback = null;

/**
 * Registra la función que repinta la aplicación (usualmente en main.js).
 */
export function registerRerender(callback) {
    rerenderCallback = callback;
}

/**
 * Fuerza una actualización de la interfaz visual.
 */
export function triggerRerender() {
    if (rerenderCallback) {
        rerenderCallback();
    }
}

/**
 * Controla el spinner de carga global (pantalla completa).
 */
export function setLoading(isLoading) {
    state.isLoading = isLoading;
    triggerRerender();
}

// ======================================================
// 2. GESTIÓN DE SESIÓN Y USUARIO
// Maneja el Login, Logout y Permisos.
// ======================================================

export function setUser(sessionData) {
    if (!sessionData) {
        Logger.error('[Auth] setUser llamado sin datos. Cerrando sesión.');
        clearUser();
        return;
    }

    state.isAuthenticated = true;
    state.isLoading = false;

    // Guardamos datos vitales en sesión
    state.session = {
        isLoggedIn: true,
        user: {
            uid: sessionData.uid,
            email: sessionData.email,
            name: sessionData.name,
            role: sessionData.role
        },
        business: {
            id: sessionData.businessId,
            departmentId: sessionData.departmentId
        }
    };

    // Cargamos permisos basados en el rol
    loadUserPermissions([sessionData.role]);
    Logger.info(`[Auth] Sesión iniciada: ${sessionData.email} (${sessionData.role})`);
}

export function clearUser() {
    // Reseteamos al estado inicial limpio
    const initialState = getInitialState();

    // Copiamos propiedades clave para resetear el objeto reactivo 'state'
    state.isAuthenticated = initialState.isAuthenticated;
    state.isLoading = initialState.isLoading;
    state.session = initialState.session;
    state.ui = initialState.ui;             // Reseteamos UI
    state.checkout = initialState.checkout; // Reseteamos POS
    state.products = initialState.products;
    state.clients = initialState.clients;
    state.sales = initialState.sales;
    state.resources = initialState.resources; // Limpiamos datos dinámicos

    Logger.info('[Auth] Sesión cerrada. Estado limpiado.');
    triggerRerender();
}

// ======================================================
// 3. CONFIGURACIÓN GLOBAL
// ======================================================

export function setSettings(settingsData) {
    state.settings = { ...state.settings, ...settingsData };
    // No siempre necesitamos rerender aquí, depende del caso
}

// ======================================================
// 4. ACCIONES LEGACY (PRODUCTOS / TEMPLATES)
// Se mantienen por compatibilidad con código existente.
// ======================================================

export function setProducts(products) {
    state.products = products;
}

export async function addProductToState(appState, product) {
    Logger.trace('[Legacy Action] addProductToState', product);
    const productWithId = await saveNewProduct(appState, product);
    appState.products.push(productWithId);
    triggerRerender();
}

export async function updateProductInState(appState, productId, updatedData) {
    Logger.trace('[Legacy Action] updateProductInState', productId);
    await updateProductById(appState, productId, updatedData);

    const index = appState.products.findIndex(p => p.id === productId);
    if (index !== -1) {
        appState.products[index] = { ...appState.products[index], ...updatedData };
    }
    triggerRerender();
}

export async function deleteProduct(appState, productId) {
    Logger.trace('[Legacy Action] deleteProduct', productId);
    await deleteProductById(appState, productId);
    appState.products = appState.products.filter(p => p.id !== productId);
    triggerRerender();
}

// --- Global Templates Actions ---
export async function addTemplateToState(template) {
    await saveGlobalTemplate(template);
    triggerRerender();
}
export async function updateTemplateInState(id, data) {
    await updateGlobalTemplate(id, data);
    triggerRerender();
}
export async function deleteTemplate(id) {
    await deleteGlobalTemplate(id);
    triggerRerender();
}

// ======================================================
// 5. ACCIONES GENÉRICAS (NUEVA ARQUITECTURA)
// Estas funciones gestionan el estado dinámico (resources).
// Úsalas para: Roles, Categorías, Unidades, Logs, etc.
// ======================================================

/**
 * Carga una colección completa en state.resources de forma segura (Anti-Bucle).
 * @param {string} collectionName - Nombre exacto de la colección
 * @param {boolean} forceRefresh - (Opcional) Si es true, ignora el caché y recarga
 */
export async function loadResource(collectionName, forceRefresh = false) {
    // 1. Inicializar banderas si no existen
    if (!state.resourceFlags) state.resourceFlags = {};
    if (!state.resourceFlags[collectionName]) {
        state.resourceFlags[collectionName] = { loading: false, loaded: false, error: null };
    }

    const flags = state.resourceFlags[collectionName];

    // 🛑 2. PROTECCIÓN ANTI-BUCLE
    // Si ya está cargando, O si ya está cargado (y no forzamos refresco)... ¡NO HACER NADA!
    if (flags.loading) return;
    if (flags.loaded && !forceRefresh) return;

    // 3. Marcar como "Cargando"
    // NOTA IMPORTANTE: Actualizamos el flag pero intentamos NO disparar un rerender global 
    // inmediato si solo es un flag interno, para evitar parpadeos, 
    // pero para spinners locales sí es necesario.
    state.resourceFlags[collectionName] = { ...flags, loading: true, error: null };

    // Activar spinner visual en UI (opcional, según tu gusto)
    if (state.ui && state.ui.loading) {
        state.ui.loading.resources = true;
    }
    triggerRerender(); // Actualizamos para que aparezca el spinner

    try {
        Logger.info(`[Action] Cargando recurso: ${collectionName}...`);

        // 4. Llamada al Backend
        const data = await getGenericItems(collectionName);

        // 5. Guardar Datos
        if (!state.resources) state.resources = {};
        state.resources[collectionName] = data;

        // 6. Actualizar Bandera a "Éxito"
        state.resourceFlags[collectionName] = { loading: false, loaded: true, error: null };

        Logger.info(`[Action] Recurso cargado: ${collectionName} (${data.length} items)`);

    } catch (error) {
        Logger.error(`[Action] Error cargando ${collectionName}`, error);

        // Registrar el error en el flag para que la vista lo sepa
        state.resourceFlags[collectionName] = { loading: false, loaded: false, error: error.message };

    } finally {
        // 7. Limpieza final
        if (state.ui && state.ui.loading) {
            state.ui.loading.resources = false;
        }
        triggerRerender(); // ¡Ahora sí repintamos con los datos!
    }
}

/**
 * Agrega un ítem a una colección genérica y actualiza el estado local.
 * @param {string} collectionName 
 * @param {object} itemData 
 * @returns {Promise<boolean>} True si tuvo éxito.
 */
export async function addResourceItem(collectionName, itemData) {
    setLoading(true); // Bloqueo breve para operaciones de escritura
    try {
        Logger.info(`[Action] Creando ítem en: ${collectionName}`);

        // 1. Guardar en Base de Datos
        const newId = await createGenericItem(collectionName, itemData);

        // 2. Actualización Optimista (Local State)
        const newItem = { id: newId, ...itemData };

        if (!state.resources) state.resources = {};
        if (!state.resources[collectionName]) state.resources[collectionName] = [];

        // Al agregar manualmente, nos aseguramos que las banderas sigan coherentes
        if (!state.resourceFlags) state.resourceFlags = {};
        if (!state.resourceFlags[collectionName]) state.resourceFlags[collectionName] = {};

        // Marcamos como loaded para que no intente recargar de la BD innecesariamente
        state.resourceFlags[collectionName].loaded = true;
        state.resources[collectionName].push(newItem);

        Logger.info(`[Action] Ítem creado exitosamente. ID: ${newId}`);
        triggerRerender();
        return true;
    } catch (error) {
        Logger.error(`[Action] Error creando ítem en ${collectionName}`, error);
        throw error; // Re-lanzar para que el formulario muestre el error
    } finally {
        setLoading(false);
    }
}

/**
 * Actualiza un ítem genérico.
 */
export async function updateResourceItem(collectionName, id, updates) {
    setLoading(true);
    try {
        // 1. Actualizar DB
        await updateGenericItem(collectionName, id, updates);

        // 2. Actualizar Local
        if (state.resources && state.resources[collectionName]) {
            const index = state.resources[collectionName].findIndex(item => item.id === id);
            if (index !== -1) {
                // Merge de los datos viejos con los nuevos
                state.resources[collectionName][index] = {
                    ...state.resources[collectionName][index],
                    ...updates
                };
            }
        }

        Logger.info(`[Action] Ítem actualizado: ${id}`);
        triggerRerender();
        return true;
    } catch (error) {
        Logger.error(`[Action] Error actualizando ${collectionName}`, error);
        throw error;
    } finally {
        setLoading(false);
    }
}

/**
 * Elimina un ítem genérico.
 */
export async function deleteResourceItem(collectionName, id) {
    setLoading(true);
    try {
        // 1. Borrar de DB
        await deleteGenericItem(collectionName, id);

        // 2. Borrar de Local
        if (state.resources && state.resources[collectionName]) {
            state.resources[collectionName] = state.resources[collectionName].filter(item => item.id !== id);
        }

        Logger.info(`[Action] Ítem eliminado: ${id}`);
        triggerRerender();
        return true;
    } catch (error) {
        Logger.error(`[Action] Error eliminando ${collectionName}`, error);
        throw error;
    } finally {
        setLoading(false);
    }
}