// ======================================================
// ARCHIVO: src/services/storage-adapters/firebase.adapter.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: Añadida la función 'createProduct' al adaptador.
// ======================================================

import { db } from '../../firebase-config.js';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, where, writeBatch } from 'firebase/firestore';
import { Logger } from '../logger.service.js';

// --- Funciones C.R.U.D. Genéricas (Sin cambios) ---
const getCollection = (path) => collection(db, path);
const getDocRef = (path) => doc(db, path);

export const get = async (collectionPath, id) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log(`[firebase] No se encontró el documento: ${collectionPath}/${id}`);
      // Logger.warn(`[firebase] No se encontró el documento: ${collectionPath}/${id}`);
      return null;
    }
  } catch (error) {
    console.error(`[firebase] Error en get(${collectionPath}, ${id})`, error);
    // Logger.error(`[firebase] Error en get(${collectionPath}, ${id})`, error);
    throw error;
  }
};
export const getAll = async (collectionPath, qParams) => {
  try {
    let q = query(getCollection(collectionPath));
    if (qParams && qParams.length > 0) {
      qParams.forEach(param => {
        if (Array.isArray(param) && param.length === 3) {
          q = query(q, where(param[0], param[1], param[2]));
        }
      });
    }
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  } catch (error) {
    console.error(`[firebase] Error en getAll(${collectionPath})`, error);
    // Logger.error(`[firebase] Error en getAll(${collectionPath})`, error);
    throw error;
  }
};
export const create = async (collectionPath, data) => {
  try {
    const docRef = await addDoc(getCollection(collectionPath), data);
    return docRef.id;
  } catch (error) {
    console.error(`[firebase] Error en create(${collectionPath})`, error, data);
    // Logger.error(`[firebase] Error en create(${collectionPath})`, error, data);
    throw error;
  }
};
export const set = async (collectionPath, id, data) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    await setDoc(docRef, data);
  } catch (error) {
    console.error(`[firebase] Error en set(${collectionPath}, ${id})`, error, data);
    // Logger.error(`[firebase] Error en set(${collectionPath}, ${id})`, error, data);
    throw error;
  }
};
export const update = async (collectionPath, id, data) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`[firebase] Error en update(${collectionPath}, ${id})`, error, data);
    // Logger.error(`[firebase] Error en update(${collectionPath}, ${id})`, error, data);
    throw error;
  }
};
export const remove = async (collectionPath, id) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`[firebase] Error en remove(${collectionPath}, ${id})`, error);
    // Logger.error(`[firebase] Error en remove(${collectionPath}, ${id})`, error);
    throw error;
  }
};
export const getBatch = () => writeBatch(db);

export const commitBatch = async (batch) => {
  try {
    await batch.commit();
  } catch (error) {
    console.error('[firebase] Error al ejecutar el batch', error);
    // Logger.error('[firebase] Error al ejecutar el batch', error);
    throw error;
  }
};

// --- Objeto Adaptador (ACTUALIZADO) ---
export const firebaseAdapter = {
  async init() {
    console.info('[firebase] Adaptador inicializado');
    // Logger.info('[firebase] Adaptador inicializado');
  },

  async getAllProducts(state) {
    try {
      if (!state.session?.business?.id) return [];
      const businessId = state.session.business.id;
      if (businessId === 'admin_view') return [];
      const products = await getAll(`businesses/${businessId}/products`);
      return products || [];
    } catch (error) {
      console.error('[firebase] Error obteniendo productos:', error);
      // Logger.error('[firebase] Error obteniendo productos:', error);
      return [];
    }
  },

  // --- ¡NUEVA FUNCIÓN AÑADIDA! ---
  async createProduct(state, productData) {
    try {
      if (!state.session?.business?.id) {
        throw new Error("No hay ID de negocio en la sesión para crear el producto.");
      }
      const businessId = state.session.business.id;
      // 'create' (addDoc) generará un ID automático para el producto
      const newProductId = await create(`businesses/${businessId}/products`, productData);
      return { ...productData, id: newProductId }; // Devuelve el producto con su nuevo ID
    } catch (error) {
      console.error('[firebase] Error creando producto:', error);
      // Logger.error('[firebase] Error creando producto:', error);
      throw error;
    }
  },
  // --- FIN DE LA NUEVA FUNCIÓN ---

  async saveSettings(state) {
    try {
      if (!state.session?.business?.id) return;
      const businessId = state.session.business.id;
      if (businessId === 'admin_view') return;
      await set(`businesses/${businessId}/settings`, 'app', state.settings);
    } catch (error) {
      console.error('[firebase] Error guardando configuración:', error);
      // Logger.error('[firebase] Error guardando configuración:', error);
      throw error;
    }
  },

  async getUserByUsername(username) {
    try {
      const users = await getAll('users', [['username', '==', username]]);
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('[firebase] Error obteniendo usuario:', error);
      // Logger.error('[firebase] Error obteniendo usuario:', error);
      return null;
    }
  },

  async saveUser(user) {
    try {
      if (user.id) {
        await set('users', user.id, user);
      } else {
        const id = await create('users', user);
        return { ...user, id };
      }
    } catch (error) {
      console.error('[firebase] Error guardando usuario:', error);
      // Logger.error('[firebase] Error guardando usuario:', error);
      throw error;
    }
  },

  async deleteProduct(state, productId) {
    try {
      if (!state.session?.business?.id) {
        throw new Error("No hay ID de negocio en la sesión para eliminar el producto.");
      }
      const businessId = state.session.business.id;
      await remove(`businesses/${businessId}/products`, productId);
    } catch (error) {
      console.error('[firebase] Error eliminando producto:', error);
      // Logger.error('[firebase] Error eliminando producto:', error);
      throw error;
    }
  },

  async updateProduct(state, productId, data) {
    try {
      if (!state.session?.business?.id) {
        throw new Error("No hay ID de negocio en la sesión para actualizar el producto.");
      }
      const businessId = state.session.business.id;
      await update(`businesses/${businessId}/products`, productId, data);
    } catch (error) {
      console.error('[firebase] Error actualizando producto:', error);
      // Logger.error('[firebase] Error actualizando producto:', error);
      throw error;
    }
  },

  async getAllBusinesses() {
    try {
      // Esta es una función de Super Admin,
      // por lo que consultamos la raíz de 'businesses'
      const businesses = await getAll('businesses');
      return businesses || [];
    } catch (error) {
      console.error('[firebase] Error obteniendo todos los negocios:', error);
      // Logger.error('[firebase] Error obteniendo todos los negocios:', error);
      return [];
    }
  },

  async getBusinessDetails(businessId) {
    try {
      const business = await get(`businesses/${businessId}`);
      return business || null;
    } catch (error) {
      console.error('[firebase] Error obteniendo detalles del negocio:', error);
      // Logger.error('[firebase] Error obteniendo detalles del negocio:', error);
      return null;
    }
  }
};
