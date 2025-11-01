// ======================================================
// ARCHIVO: src/store/actions.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: Conectadas las acciones CRUD al 'storage.service'.
// ======================================================

import { state, getInitialState } from './state';
import { loadUserPermissions } from '../services/permissions.service.js';
// --- ¡IMPORTACIONES AÑADIDAS! ---
import { 
    saveNewProduct, 
    updateProductById, 
    deleteProductById 
} from '../services/storage.service.js';
import { Logger } from '../services/logger.service.js';
// --- FIN DE IMPORTACIONES ---

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
  
  state.isAuthenticated = true;
  state.isLoading = false;
  
  state.user = {
    uid: sessionData.uid,
    email: sessionData.email,
    name: sessionData.name,
  };
  state.businessId = sessionData.businessId;
  state.departmentId = sessionData.departmentId;
  state.role = sessionData.role;
  
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
  state.user = initialState.user;
  state.businessId = initialState.businessId;
  state.departmentId = initialState.departmentId;
  state.role = initialState.role;
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

// (addProduct y updateProduct son obsoletas, las eliminamos para limpiar)

/**
 * Añade un producto al estado Y a la base de datos.
 * @param {object} appState - El estado de la aplicación.
 * @param {object} product - El nuevo producto (sin ID).
 */
export async function addProductToState(appState, product) {
  Logger.trace('Action: addProductToState', product);
  // --- ¡INICIO DE CORRECCIÓN! ---
  // 1. Guardar en la base de datos (y obtener el ID)
  const productWithId = await saveNewProduct(appState, product);
  
  // 2. Añadir al estado local (con el ID de la DB)
  appState.products.push(productWithId);
  // --- FIN DE CORRECCIÓN! ---
  
  triggerRerender();
}

/**
 * Actualiza un producto existente en el estado Y en la base de datos.
 * @param {object} appState - El estado de la aplicación.
 * @param {string} productId - El ID del producto a actualizar.
 * @param {object} updatedData - Los datos actualizados.
 */
export async function updateProductInState(appState, productId, updatedData) {
   Logger.trace('Action: updateProductInState', productId, updatedData);
  // --- ¡INICIO DE CORRECCIÓN! ---
  // 1. Actualizar en la base de datos
  await updateProductById(appState, productId, updatedData);
  
  // 2. Actualizar en el estado local
  const index = appState.products.findIndex(p => p.id === productId);
  if (index !== -1) {
    appState.products[index] = { ...appState.products[index], ...updatedData };
  }
  // --- FIN DE CORRECCIÓN! ---
  
  triggerRerender();
}

/**
 * Elimina un producto del estado Y de la base de datos.
 * @param {string} productId - El ID del producto a eliminar.
 */
export async function deleteProduct(appState, productId) {
  Logger.trace('Action: deleteProduct', productId);
  // --- ¡INICIO DE CORRECCIÓN! ---
  // 1. Eliminar de la base de datos
  await deleteProductById(appState, productId);
  
  // 2. Eliminar del estado local
  appState.products = appState.products.filter(p => p.id !== productId);
  // --- FIN DE CORRECCIÓN! ---
  
  triggerRerender();
}