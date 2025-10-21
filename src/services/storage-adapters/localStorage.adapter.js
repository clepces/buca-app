// services/storage-adapters/localStorage.adapter.js

// --- ¡ERROR CORREGIDO! ---
// Se eliminó: import { Logger } from '../logger.service.js';
// -------------------------

const DB_KEY = 'buc_local_storage_db_app_v3';

function getDb() {
    return JSON.parse(localStorage.getItem(DB_KEY) || '{}');
}

function saveDb(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export const localStorageAdapter = {
    init: async () => {
        console.log('Adaptador LocalStorage inicializado.');
    },
    getAllProducts: async (state) => getDb().products || [],
    saveProduct: async (state, product) => {
        const db = getDb();
        if (!db.products) db.products = [];
        const index = db.products.findIndex(p => p.product_info.id === product.product_info.id);
        if (index > -1) {
            db.products[index] = product;
        } else {
            db.products.push(product);
        }
        saveDb(db);
        return product;
    },
    deleteProduct: async (state, productId) => {
        const db = getDb();
        if (!db.products) return;
        db.products = db.products.filter(p => p.product_info.id !== productId);
        saveDb(db);
    },
    updateProduct: async (state, productId, data) => {
        const db = getDb();
        if (!db.products) return;
        const index = db.products.findIndex(p => p.id === productId);
        if (index > -1) {
            db.products[index] = { ...db.products[index], ...data };
        }
        saveDb(db);
    },
    getSettings: async (state) => getDb().settings || null,
    saveSettings: async (state) => {
        const db = getDb();
        db.settings = state.settings;
        saveDb(db);
    },
};