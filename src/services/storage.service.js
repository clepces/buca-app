// services/storage.service.js
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
    // Al inicio, no sabemos el negocio, solo cargamos el estado por defecto.
    // La carga de productos ocurre DESPUÉS del login.
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
        
        // Combina el array de objetos (ej. [{system: ...}, {plans: ...}]) en uno solo
        const globalConfig = configArray.reduce((acc, current) => ({ ...acc, ...current }), {});

        Logger.info('✅ Configuración global cargada.');
        return globalConfig;

    } catch (error) {
        Logger.error('Error Crítico al cargar la configuración global:', error);
        // Lanzamos el error para que main.js pueda manejarlo
        throw new Error(`CONFIG_LOAD_FAILED: ${error.message}`);
    }
}

export async function loadBusinessData(state) {
    if (!activeAdapter || !state.session.business) throw new Error("User is not associated with a business.");
    
    Logger.info(`Loading data for business: ${state.session.business.id}`);
    const products = await activeAdapter.getAllProducts(state);
    
    // Aquí podrías cargar clientes, ventas, etc., en el futuro
    
    return { products: products || [] };
}

export async function saveState(state) {
    if (!activeAdapter) throw new Error("Storage service not initialized.");
     await activeAdapter.saveSettings(state);
}

// --- El resto de funciones que delegan en el adaptador ---
// (Estas funciones parecen no usarse, pero las dejamos por si acaso)
export const getUserByUsername = (username) => activeAdapter.getUserByUsername(username);
export const saveUser = (user) => activeAdapter.saveUser(user);
export const deleteProductById = (state, productId) => activeAdapter.deleteProduct(state, productId);
export const updateProductById = (state, productId, data) => activeAdapter.updateProduct(state, productId, data);