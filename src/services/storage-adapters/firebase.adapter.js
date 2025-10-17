// ARCHIVO CORREGIDO Y FINAL: src/services/storage-adapters/firebase.adapter.js

import { db } from '../../firebase-config.js';
import { collection, getDocs, doc, getDoc, setDoc, addDoc, deleteDoc } from "firebase/firestore";
import { Logger } from '../logger.service.js';

function getBusinessPath(state) {
    const businessId = state.session.business?.id;
    if (!businessId) {
        throw new Error("Error crítico: No se ha identificado el negocio del usuario.");
    }
    return `businesses/${businessId}`;
}

export const firebaseAdapter = {
    init: async () => {
        Logger.info('✅ Adaptador de Firebase inicializado.');
    },

    getSettings: async (state) => {
        try {
            const businessPath = getBusinessPath(state);
            const docRef = doc(db, businessPath);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? { ...state.settings, store: docSnap.data().info } : state.settings;
        } catch (error) {
            Logger.error("Error al obtener la configuración desde Firestore:", error);
            throw error;
        }
    },

    getAllProducts: async (state) => {
        try {
            const businessPath = getBusinessPath(state);
            const productsCol = collection(db, `${businessPath}/products`);
            const productSnapshot = await getDocs(productsCol);
            return productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            Logger.error("Error al obtener productos:", error);
            throw error;
        }
    },

    saveProduct: async (state, product) => {
        try {
            const businessPath = getBusinessPath(state);
            await addDoc(collection(db, `${businessPath}/products`), product);
        } catch (error) {
            Logger.error("Error al guardar el producto en Firestore:", error);
            throw error;
        }
    },

    deleteProduct: async (state, productId) => {
        try {
            const businessPath = getBusinessPath(state);
            await deleteDoc(doc(db, `${businessPath}/products`, productId));
        } catch (error) {
            Logger.error("Error al eliminar el producto en Firestore:", error);
            throw error;
        }
    },

    updateProduct: async (state, productId, productData) => {
        try {
            const businessPath = getBusinessPath(state);
            await setDoc(doc(db, `${businessPath}/products`, productId), productData, { merge: true });
        } catch (error) {
            Logger.error("Error al actualizar el producto en Firestore:", error);
            throw error;
        }
    },
};