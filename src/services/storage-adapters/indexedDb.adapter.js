// import { openDB } from 'https://unpkg.com/idb@7.1.1/build/esm.js';
import { openDB } from 'idb';
import { Logger } from '../logger.service.js';

const DB_NAME = 'ManagerDeTiendaDB';
const DB_VERSION = 2;
const PRODUCTS_STORE = 'products';
const SETTINGS_STORE = 'settings';
const USERS_STORE = 'users';

let db;

async function init() {
    if (db) return;
    db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion) {
            if (oldVersion < 1) {
                db.createObjectStore(PRODUCTS_STORE, { keyPath: 'product_info.id' });
                db.createObjectStore(SETTINGS_STORE, { keyPath: 'id' });
            }
            if (oldVersion < 2) {
                const userStore = db.createObjectStore(USERS_STORE, { keyPath: 'id', autoIncrement: true });
                userStore.createIndex('by_username', 'username', { unique: true });
            }
        },
    });
    Logger.info('Adaptador IndexedDB inicializado.');
}

export const indexedDbAdapter = {
    init,
    getAllProducts: async () => db.getAll(PRODUCTS_STORE),
    saveProduct: async (product) => db.put(PRODUCTS_STORE, product),
    deleteProduct: async (productId) => db.delete(PRODUCTS_STORE, productId),
    getSettings: async () => db.get(SETTINGS_STORE, 'app_settings'),
    saveSettings: async (settings) => db.put(SETTINGS_STORE, { id: 'app_settings', ...settings }),
    getUserByUsername: async (username) => db.getFromIndex(USERS_STORE, 'by_username', username),
    saveUser: async (user) => db.put(USERS_STORE, user),
    getAllUsers: async () => db.getAll(USERS_STORE),
    getSession: async () => db.get(SETTINGS_STORE, 'app_session'),
    saveSession: async (session) => db.put(SETTINGS_STORE, { id: 'app_session', ...session }),
};