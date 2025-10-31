// store/actions.js

import { state, getInitialState } from './state';
import { loadUserPermissions } from '../services/permissions.service.js';

// Sistema simple de re-renderizado
let rerenderCallback = null;

export function registerRerender(callback) {
  rerenderCallback = callback;
}

export function triggerRerender() {
  if (rerenderCallback) {
    rerenderCallback();
  }
}

/**
 * Establece el estado de carga global de la aplicación.
 * @param {boolean} isLoading - True si está cargando, false si no.
 */
export function setLoading(isLoading) {
  state.isLoading = isLoading;
}

/**
 * --- ¡ACCIÓN MODIFICADA! ---
 * Establece la sesión completa del usuario en el estado global.
 * @param {object} sessionData - El objeto completo de sesión proveniente de auth.service
 * { uid, email, name, businessId, departmentId, role }
 */
export function setUser(sessionData) {
  if (!sessionData) {
    console.error('setUser fue llamado sin sessionData. Limpiando sesión.');
    clearUser(); // Limpiar si los datos son inválidos
    return;
  }
  
  state.isAuthenticated = true;
  state.isLoading = false; // Asumimos que la carga terminó
  
  // Poblar los "cajones"
  state.user = {
    uid: sessionData.uid,
    email: sessionData.email,
    name: sessionData.name,
  };
  state.businessId = sessionData.businessId;
  state.departmentId = sessionData.departmentId;
  state.role = sessionData.role;
  
  // --- CORRECCIÓN CRÍTICA: Actualizar también state.session ---
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
  
  // Cargar permisos del usuario
  loadUserPermissions([sessionData.role]);
}

/**
 * --- ¡ACCIÓN MODIFICADA! ---
 * Limpia la sesión completa del usuario y resetea el estado.
 */
export function clearUser() {
  const initialState = getInitialState();
  
  state.isAuthenticated = initialState.isAuthenticated; // false
  state.isLoading = initialState.isLoading; // false
  
  // Limpiar los "cajones"
  state.user = initialState.user; // null
  state.businessId = initialState.businessId; // null
  state.departmentId = initialState.departmentId; // null
  state.role = initialState.role; // null

  // --- CORRECCIÓN CRÍTICA: Limpiar también state.session ---
  state.session = initialState.session; // { isLoggedIn: false, user: null, business: null }

  // NOTA: También reseteamos los datos que dependen del negocio
  state.products = initialState.products; // []
  state.clients = initialState.clients; // []
  state.sales = initialState.sales; // []
  
  // Mantenemos la configuración de la app (appConfig, exchangeRates)
  // ya que no dependen del usuario.
}

/**
 * Actualiza la configuración de la aplicación en el estado.
 * @param {object} settingsData - Objeto con appConfig, exchangeRates, etc.
 */
export function setSettings(settingsData) {
  state.settings = { ...state.settings, ...settingsData };
}

/**
 * Reemplaza la lista de productos en el estado.
 * @param {Array} products - El array de productos.
 */
export function setProducts(products) {
  state.products = products;
}

/**
 * Añade un producto al estado.
 * @param {object} product - El nuevo producto.
 */
export function addProduct(product) {
  state.products.push(product);
}

/**
 * Añade un producto al estado (versión para ProductForm).
 * @param {object} appState - El estado de la aplicación.
 * @param {object} product - El nuevo producto.
 */
export async function addProductToState(appState, product) {
  appState.products.push(product);
  triggerRerender();
}

/**
 * Actualiza un producto existente en el estado.
 * @param {object} updatedProduct - El producto con los datos actualizados.
 */
export function updateProduct(updatedProduct) {
  const index = state.products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    state.products[index] = updatedProduct;
  }
}

/**
 * Actualiza un producto existente en el estado (versión para ProductForm).
 * @param {object} appState - El estado de la aplicación.
 * @param {string} productId - El ID del producto a actualizar.
 * @param {object} updatedData - Los datos actualizados.
 */
export async function updateProductInState(appState, productId, updatedData) {
  const index = appState.products.findIndex(p => p.id === productId);
  if (index !== -1) {
    appState.products[index] = { ...appState.products[index], ...updatedData };
  }
  triggerRerender();
}

/**
 * Elimina un producto del estado por su ID.
 * @param {string} productId - El ID del producto a eliminar.
 */
export async function deleteProduct(appState, productId) { // Cambia la firma si es necesario
    appState.products = appState.products.filter(p => p.id !== productId);
    // Aquí iría la lógica para eliminar de Firebase/IndexedDB
    triggerRerender(); // Asegura que la UI se actualice
}

// ... (Aquí irían el resto de tus acciones: setClients, addClient, etc.) ...