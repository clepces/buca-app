// ARCHIVO CORREGIDO: src/services/storage.service.js

import { getInitialState } from '../store/state.js';
import { indexedDbAdapter } from './storage-adapters/indexedDb.adapter.js';
import { firebaseAdapter } from './storage-adapters/firebase.adapter.js';
import { Logger } from './logger.service.js';

const adapters = {
    indexedDB: indexedDbAdapter,
    firebase: firebaseAdapter,
};

let activeAdapter;

export async function initializeStorage(providerName = 'firebase') {
    activeAdapter = adapters[providerName];
    if (!activeAdapter) {
        Logger.error(`Storage provider "${providerName}" is not valid. Using IndexedDB.`);
        activeAdapter = adapters.indexedDB;
    }
    await activeAdapter.init();
}

// CORRECCIÓN: 'loadState' now only loads the basic app shell.
export async function loadState() {
    if (!activeAdapter) throw new Error("Storage service not initialized.");

    const state = getInitialState();
    // On initial startup, we don't know the business yet,
    // so we just load the default state. Product loading happens AFTER login.
    Logger.info('✅ Initial state loaded.');
    return state;
}

// ¡NUEVA FUNCIÓN! This will be called AFTER a user logs in.
export async function loadBusinessData(state) {
    if (!activeAdapter || !state.session.business) throw new Error("User is not associated with a business.");
    
    Logger.info(`Loading data for business: ${state.session.business.id}`);
    const products = await activeAdapter.getAllProducts(state);
    
    // In the future, you could load customers, sales, etc. here
    
    return { products: products || [] };
}

export async function saveState(state) {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
     await activeAdapter.saveSettings(state.settings);
}

// --- Other functions remain the same ---
export const getUserByUsername = (username) => activeAdapter.getUserByUsername(username);
export const saveUser = (user) => activeAdapter.saveUser(user);
export const deleteProductById = (productId) => activeAdapter.deleteProduct(productId);
export const updateProductById = (productId, data) => activeAdapter.updateProduct(productId, data);