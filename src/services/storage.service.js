// ======================================================
// ARCHIVO: src/services/storage.service.js
// VERSIÓN: 3.1.0 (Arquitectura Híbrida)
// AUTOR: Clepces & IA Team
// PROPÓSITO: Fachada (Facade) para el almacenamiento de datos.
// NOTA: Este servicio decide qué adaptador usar (Firebase, IndexedDB, LocalStorage)
//       y centraliza todas las peticiones de datos de la aplicación.
// ======================================================

import { db } from '../firebase-config.js';
import { collection, doc, getDoc } from 'firebase/firestore';
import { getInitialState } from '../store/state.js';
import { indexedDbAdapter } from './storage-adapters/indexedDb.adapter.js';
import { firebaseAdapter } from './storage-adapters/firebase.adapter.js';
import { localStorageAdapter } from './storage-adapters/localStorage.adapter.js';
import { Logger } from './logger.service.js';

// Mapa de adaptadores disponibles
const adapters = {
    indexedDB: indexedDbAdapter,
    firebase: firebaseAdapter,
    localStorage: localStorageAdapter
};

let activeAdapter;

// ======================================================
// 1. INICIALIZACIÓN DEL SERVICIO
// ======================================================

/**
 * Inicializa el adaptador de almacenamiento seleccionado.
 * @param {string} providerName - 'firebase', 'indexedDB', o 'localStorage'
 */
export async function initializeStorage(providerName = 'firebase') {
    activeAdapter = adapters[providerName];

    if (!activeAdapter) {
        Logger.error(`Proveedor de almacenamiento "${providerName}" no válido. Usando IndexedDB por defecto.`);
        activeAdapter = adapters.indexedDB;
    }

    await activeAdapter.init();
    Logger.info(`[Storage] Servicio inicializado con: ${providerName}`);
}

// ======================================================
// 2. GESTIÓN DE ESTADO Y CONFIGURACIÓN (CORE)
// ======================================================

export async function loadState() {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    const state = getInitialState();
    Logger.info('✅ Estado inicial cargado (Reset).');
    return state;
}

export async function loadGlobalConfig() {
    try {
        // Esta lógica es específica de Firestore y crítica para el arranque
        const configCollectionRef = collection(db, 'app_config');
        const docNames = [
            'system',
            'featureFlags',
            'plans',
            'definitions',
            'templates',
            'defaultBusinessSettings'
        ];

        const configPromises = docNames.map(async (docName) => {
            const docRef = doc(configCollectionRef, docName);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                Logger.warn(`Config faltante: 'app_config/${docName}'`);
                return { [docName]: null };
            }
            return { [docName]: docSnap.data() };
        });

        const configArray = await Promise.all(configPromises);
        const globalConfig = configArray.reduce((acc, current) => ({ ...acc, ...current }), {});

        Logger.info('✅ Configuración global cargada desde Firestore.');
        return globalConfig;

    } catch (error) {
        Logger.error('Error Crítico al cargar configuración global:', error);
        throw new Error(`CONFIG_LOAD_FAILED: ${error.message}`);
    }
}

export async function saveState(state) {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    // Guarda la configuración local (settings) del negocio
    await activeAdapter.saveSettings(state);
}

// ======================================================
// 3. MÉTODOS ESPECÍFICOS (LEGACY / COMPATIBILIDAD)
// Estos métodos contienen lógica de negocio "hardcodeada"
// necesaria para los módulos antiguos (Productos, Usuarios).
// ======================================================

// --- Gestión de Productos ---
export async function loadBusinessData(state) {
    if (!activeAdapter || !state.session.business) throw new Error("Usuario sin negocio asociado.");
    Logger.info(`Cargando datos del negocio: ${state.session.business.id}`);
    const products = await activeAdapter.getAllProducts(state);
    return { products: products || [] };
}

export async function saveNewProduct(state, productData) {
    if (!activeAdapter) throw new Error("Storage service not initialized.");

    // Verificación de seguridad por si el adaptador es básico
    if (typeof activeAdapter.createProduct !== 'function') {
        Logger.warn(`El adaptador actual no soporta createProduct.`);
        return productData;
    }
    return await activeAdapter.createProduct(state, productData);
}

export const deleteProductById = (state, productId) => {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    return activeAdapter.deleteProduct(state, productId);
};

export const updateProductById = (state, productId, data) => {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    return activeAdapter.updateProduct(state, productId, data);
};

// --- Gestión de Usuarios ---
export const getUserByUsername = (username) => activeAdapter.getUserByUsername(username);
export const saveUser = (user) => activeAdapter.saveUser(user);

// --- Gestión de Negocios (Super Admin) ---
export async function loadAllBusinesses() {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    if (typeof activeAdapter.getAllBusinesses !== 'function') return [];
    return await activeAdapter.getAllBusinesses();
}

// --- Plantillas Globales ---
export async function loadGlobalTemplates() {
    if (!activeAdapter) throw new Error("Storage not initialized.");
    // Usa un método semi-genérico del adaptador si existe
    if (activeAdapter.getAll) return await activeAdapter.getAll('global_templates');
    return [];
}

export async function saveGlobalTemplate(templateData) {
    if (!activeAdapter) throw new Error("Storage not initialized.");
    if (activeAdapter.create) return await activeAdapter.create('global_templates', templateData);
    return null;
}

export async function updateGlobalTemplate(id, data) {
    if (!activeAdapter) throw new Error("Storage not initialized.");
    if (activeAdapter.update) await activeAdapter.update('global_templates', id, data);
}

export async function deleteGlobalTemplate(id) {
    if (!activeAdapter) throw new Error("Storage not initialized.");
    if (activeAdapter.remove) await activeAdapter.remove('global_templates', id);
}

// ======================================================
// 4. PUENTE GENÉRICO (NUEVA ARQUITECTURA HÍBRIDA)
// Conecta las Actions dinámicas con el Adaptador expuesto.
// Permite CRUD sobre: Roles, Categorías, Unidades, Logs, etc.
// ======================================================

/**
 * Obtiene todos los documentos de una colección arbitraria.
 * @param {string} collectionName - Nombre de la colección en Firestore.
 */
export async function getGenericItems(collectionName) {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    // Llama al método 'getAll' puro expuesto en firebase.adapter.js
    return await activeAdapter.getAll(collectionName);
}

/**
 * Crea un documento en una colección arbitraria.
 * @param {string} collectionName 
 * @param {object} data 
 * @returns {Promise<string>} ID del nuevo documento.
 */
export async function createGenericItem(collectionName, data) {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    return await activeAdapter.create(collectionName, data);
}

/**
 * Actualiza un documento existente.
 * @param {string} collectionName 
 * @param {string} id 
 * @param {object} data 
 */
export async function updateGenericItem(collectionName, id, data) {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    return await activeAdapter.update(collectionName, id, data);
}

/**
 * Elimina un documento.
 * @param {string} collectionName 
 * @param {string} id 
 */
export async function deleteGenericItem(collectionName, id) {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    return await activeAdapter.remove(collectionName, id);
}