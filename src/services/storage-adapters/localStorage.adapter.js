import { Logger } from '../logger.service.js';

const DB_KEY = 'buc_local_storage_db_app_v3';

function getDb() {
    return JSON.parse(localStorage.getItem(DB_KEY) || '{}');
}

function saveDb(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export const localStorageAdapter = {
    init: async () => {
        Logger.info('Adaptador LocalStorage inicializado.');
    },
    getAllProducts: async () => getDb().products || [],
    saveProduct: async (product) => {
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
    deleteProduct: async (productId) => {
        const db = getDb();
        if (!db.products) return;
        db.products = db.products.filter(p => p.product_info.id !== productId);
        saveDb(db);
    },
    getSettings: async () => getDb().settings || null,
    saveSettings: async (settings) => {
        const db = getDb();
        db.settings = settings;
        saveDb(db);
    },
    getUserByUsername: async (username) => {
        const db = getDb();
        if (!db.users) return null;
        return db.users.find(u => u.username === username);
    },
    saveUser: async (user) => {
        const db = getDb();
        if (!db.users) db.users = [];
        const index = db.users.findIndex(u => u.id === user.id);
        if (index > -1) {
            db.users[index] = user;
        } else {
            user.id = Date.now();
            db.users.push(user);
        }
        saveDb(db);
        return user;
    },
    getAllUsers: async () => getDb().users || [],
    getSession: async () => getDb().session || null,
    saveSession: async (session) => {
        const db = getDb();
        db.session = session;
        saveDb(db);
    },
};