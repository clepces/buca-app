// ======================================================
// ARCHIVO: src/store/actions.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.2 - FILE: 1.0.5
// CORRECCIÓN: (Anotación J-2) Acciones unificadas para
//             escribir solo en 'state.session'.
// ======================================================
import { state, getInitialState } from './state';
import { loadUserPermissions } from '../services/permissions.service.js';
import { saveNewProduct, updateProductById, deleteProductById, saveGlobalTemplate, updateGlobalTemplate, deleteGlobalTemplate } from '../services/storage.service.js';
import { Logger } from '../services/logger.service.js';

let rerenderCallback = null;

export function registerRerender(callback) {
  rerenderCallback = callback;
}

export function triggerRerender() {
  if (rerenderCallback) {
    rerenderCallback();
  }
}

export function setLoading(isLoading) {
  state.isLoading = isLoading;
}

export function setUser(sessionData) {
    if (!sessionData) {
        console.error('setUser fue llamado sin sessionData. Limpiando sesión.');
        clearUser();
        return;
    }

    state.isAuthenticated = true; // <-- Mantenido por compatibilidad
    state.isLoading = false;

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

    loadUserPermissions([sessionData.role]);
}

export function clearUser() {
    const initialState = getInitialState();
    state.isAuthenticated = initialState.isAuthenticated;
    state.isLoading = initialState.isLoading;
    state.session = initialState.session;
    state.products = initialState.products;
    state.clients = initialState.clients;
    state.sales = initialState.sales;
}

export function setSettings(settingsData) {
    state.settings = { ...state.settings, ...settingsData };
}

export function setProducts(products) {
    state.products = products;
}

export async function addProductToState(appState, product) {
    Logger.trace('Action: addProductToState', product);
    const productWithId = await saveNewProduct(appState, product);
    appState.products.push(productWithId);
    triggerRerender();
}

export async function updateProductInState(appState, productId, updatedData) {
    Logger.trace('Action: updateProductInState', productId, updatedData);
    await updateProductById(appState, productId, updatedData);
    const index = appState.products.findIndex(p => p.id === productId);
    if (index !== -1) {
        appState.products[index] = { ...appState.products[index], ...updatedData };
    }
    triggerRerender();
}

export async function deleteProduct(appState, productId) {
    Logger.trace('Action: deleteProduct', productId);
    await deleteProductById(appState, productId);
    appState.products = appState.products.filter(p => p.id !== productId);
    triggerRerender();
}

export async function addTemplateToState(template) {
    Logger.info('Action: addTemplateToState', template);
    await saveGlobalTemplate(template);
    triggerRerender();
}

export async function updateTemplateInState(id, data) {
    Logger.info('Action: updateTemplateInState', id);
    await updateGlobalTemplate(id, data);
    triggerRerender();
}

export async function deleteTemplate(id) {
    Logger.info('Action: deleteTemplate', id);
    await deleteGlobalTemplate(id);
    triggerRerender();
}