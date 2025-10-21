// services/storage-adapters/indexedDb.adapter.js
import { openDB } from 'idb';

// --- ¡ERROR CORREGIDO! ---
// Se eliminó: import { Logger } from '../logger.service.js';
// Los adaptadores usarán console.log() para evitar dependencias circulares.
// -------------------------

const DB_NAME = 'bucaAppDB';
const DB_VERSION = 1;
let db = null;

async function openDBInternal() {
    if (db) {
        return db;
    }
    db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(dbInstance) {
            console.log('[indexedDb] Actualizando la base de datos...');
            if (!dbInstance.objectStoreNames.contains('products')) {
                dbInstance.createObjectStore('products', { keyPath: 'id' });
            }
            if (!dbInstance.objectStoreNames.contains('settings')) {
                dbInstance.createObjectStore('settings'); 
            }
            // ... otros stores
        },
    });
    console.log('[indexedDb] Base de datos abierta exitosamente');
    return db;
}

export const indexedDbAdapter = {
    init: async () => {
        try {
            await openDBInternal();
        } catch (error) {
            console.error('[indexedDb] Error fatal al abrir la base de datos', error);
        }
    },
    
    getAllProducts: async (state) => {
        try {
            const db = await openDBInternal();
            return await db.getAll('products');
        } catch (error) {
            console.error('[indexedDb] Error en getAllProducts', error);
            return [];
        }
    },

    saveProduct: async (state, product) => {
        try {
            const db = await openDBInternal();
            return await db.put('products', product);
        } catch (error) {
            console.error('[indexedDb] Error en saveProduct', error);
            throw error;
        }
    },
    
    deleteProduct: async (state, productId) => {
        try {
            const db = await openDBInternal();
            return await db.delete('products', productId);
        } catch (error) {
            console.error('[indexedDb] Error en deleteProduct', error);
            throw error;
        }
    },

    updateProduct: async (state, productId, data) => {
        try {
            const db = await openDBInternal();
            const tx = db.transaction('products', 'readwrite');
            const store = tx.objectStore('products');
            const product = await store.get(productId);
            if (product) {
                const updatedProduct = { ...product, ...data };
                await store.put(updatedProduct);
            }
            await tx.done;
        } catch (error) {
            console.error('[indexedDb] Error en updateProduct', error);
            throw error;
        }
    },

    getSettings: async (state) => {
        try {
            const db = await openDBInternal();
            return await db.get('settings', 'app_settings');
        } catch (error) {
            console.error('[indexedDb] Error en getSettings', error);
            return null;
        }
    },

    saveSettings: async (state) => {
        try {
            const db = await openDBInternal();
            return await db.put('settings', state.settings, 'app_settings');
        } catch (error) {
            console.error('[indexedDb] Error en saveSettings', error);
            throw error;
        }
    }
};