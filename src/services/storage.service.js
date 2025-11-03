// ======================================================
// ARCHIVO: src/services/storage.service.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: Añadida la función 'saveNewProduct'.
// ======================================================

import { db } from '../firebase-config.js';
import { collection, doc, getDoc } from 'firebase/firestore';
import { getInitialState } from '../store/state.js';
import { indexedDbAdapter } from './storage-adapters/indexedDb.adapter.js';
import { firebaseAdapter } from './storage-adapters/firebase.adapter.js';
import { localStorageAdapter } from './storage-adapters/localStorage.adapter.js';
import { Logger } from './logger.service.js';

const adapters = {
    indexedDB: indexedDbAdapter,
    firebase: firebaseAdapter,
    localStorage: localStorageAdapter
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

export async function loadState() {

    if (!activeAdapter) throw new Error("Storage service not initialized.");
    const state = getInitialState();
    Logger.info('✅ Initial state loaded.');
    return state;
}

export async function loadGlobalConfig() {

    try {
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
                Logger.warn(`Documento de config no encontrado: 'app_config/${docName}'`);
                return { [docName]: null };
            }
            return { [docName]: docSnap.data() };
        });

        const configArray = await Promise.all(configPromises);
        const globalConfig = configArray.reduce((acc, current) => ({ ...acc, ...current }), {});

        Logger.info('✅ Configuración global cargada.');
        return globalConfig;

    } catch (error) {
        Logger.error('Error Crítico al cargar la configuración global:', error);
        throw new Error(`CONFIG_LOAD_FAILED: ${error.message}`);
    }
}

export async function loadBusinessData(state) {

    if (!activeAdapter || !state.session.business) throw new Error("User is not associated with a business.");
    
    Logger.info(`Loading data for business: ${state.session.business.id}`);
    const products = await activeAdapter.getAllProducts(state);
    
    return { products: products || [] };
}

export async function saveState(state) {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
     await activeAdapter.saveSettings(state);
}

// --- ¡NUEVA FUNCIÓN AÑADIDA! ---
export async function saveNewProduct(state, productData) {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    if (typeof activeAdapter.createProduct !== 'function') {
         Logger.warn(`El adaptador ${activeAdapter} no implementa createProduct.`);
         return productData; // Devuelve los datos sin ID
    }
    return await activeAdapter.createProduct(state, productData);
}
// --- FIN DE LA NUEVA FUNCIÓN ---

export const getUserByUsername = (username) => activeAdapter.getUserByUsername(username);
export const saveUser = (user) => activeAdapter.saveUser(user);

export const deleteProductById = (state, productId) => {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
    return activeAdapter.deleteProduct(state, productId);
};

export const updateProductById = (state, productId, data) => {
     if (!activeAdapter) throw new Error("Storage service not initialized.");
    return activeAdapter.updateProduct(state, productId, data);
};