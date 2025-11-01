// ======================================================
// ARCHIVO: src/store/actions.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.2 - FILE: 1.0.5
// CORRECCIÓN: (Anotación J-2) Acciones unificadas para
//             escribir solo en 'state.session'.
// ======================================================

import { state, getInitialState } from './state';
import { loadUserPermissions } from '../services/permissions.service.js';
import { 
    saveNewProduct, 
    updateProductById, 
    deleteProductById 
} from '../services/storage.service.js';
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

/**
 * --- ¡ACCIÓN MODIFICADA! ---
 * Establece la sesión del usuario en 'state.session'.
 * @param {object} sessionData - { uid, email, name, businessId, departmentId, role }
 */
export function setUser(sessionData) {
  if (!sessionData) {
    console.error('setUser fue llamado sin sessionData. Limpiando sesión.');
    clearUser();
    return;
  }
  
  state.isAuthenticated = true; // <-- Mantenido por compatibilidad
  state.isLoading = false;
  
  // --- ¡INICIO CORRECCIÓN (J-2)! ---
  // Unificamos el estado en 'state.session'
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
  
  // Se eliminan las asignaciones a state.user, state.businessId, etc.
  // --- FIN CORRECCIÓN ---
  
  loadUserPermissions([sessionData.role]);
}

/**
 * --- ¡ACCIÓN MODIFICADA! ---
 * Limpia la sesión completa del usuario y resetea el estado.
 */
export function clearUser() {
  const initialState = getInitialState();
  
  state.isAuthenticated = initialState.isAuthenticated;
  state.isLoading = initialState.isLoading;

  // --- ¡INICIO CORRECCIÓN (J-2)! ---
  // Reseteamos 'state.session'
  state.session = initialState.session;
  // --- FIN CORRECCIÓN ---

  // El resto se mantiene igual
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