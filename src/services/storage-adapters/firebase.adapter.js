// ======================================================
// ARCHIVO: src/services/storage-adapters/firebase.adapter.js
// VERSIÓN: 3.1.0 (Arquitectura Híbrida)
// AUTOR: Clepces & IA Team
// PROPÓSITO: Comunicación directa con Firestore.
// NOTA: Este archivo expone métodos genéricos para la nueva arquitectura dinámica
//       y mantiene los métodos específicos para compatibilidad.
// ======================================================

import { db } from '../../firebase-config.js';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch
} from 'firebase/firestore';
import { Logger } from '../logger.service.js';

// ======================================================
// SECCIÓN 1: UTILIDADES INTERNAS (HELPERS)
// ======================================================
const getCollection = (path) => collection(db, path);
const getDocRef = (path) => doc(db, path);

// ======================================================
// SECCIÓN 2: FUNCIONES C.R.U.D. PURAS
// Estas funciones realizan el trabajo sucio. Son utilizadas
// tanto por los métodos específicos como por los genéricos.
// ======================================================

/**
 * Obtiene un documento individual por ID.
 */
export const get = async (collectionPath, id) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log(`[firebase] No encontrado: ${collectionPath}/${id}`);
      return null;
    }
  } catch (error) {
    console.error(`[firebase] Error get(${collectionPath}, ${id})`, error);
    throw error;
  }
};

/**
 * Obtiene todos los documentos de una colección (con filtros opcionales).
 * @param {string} collectionPath - Ruta de la colección
 * @param {Array} qParams - Array de filtros [['campo', '==', 'valor']]
 */
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
    console.error(`[firebase] Error getAll(${collectionPath})`, error);
    throw error;
  }
};

/**
 * Crea un nuevo documento con ID automático.
 * @returns {string} El ID del documento creado.
 */
export const create = async (collectionPath, data) => {
  try {
    const docRef = await addDoc(getCollection(collectionPath), data);
    return docRef.id;
  } catch (error) {
    console.error(`[firebase] Error create(${collectionPath})`, error);
    throw error;
  }
};

/**
 * Guarda o Sobreescribe un documento con un ID específico.
 */
export const set = async (collectionPath, id, data) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    await setDoc(docRef, data);
  } catch (error) {
    console.error(`[firebase] Error set(${collectionPath}, ${id})`, error);
    throw error;
  }
};

/**
 * Actualiza campos específicos de un documento existente.
 */
export const update = async (collectionPath, id, data) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`[firebase] Error update(${collectionPath}, ${id})`, error);
    throw error;
  }
};

/**
 * Elimina un documento permanentemente.
 */
export const remove = async (collectionPath, id) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`[firebase] Error remove(${collectionPath}, ${id})`, error);
    throw error;
  }
};

// --- Manejo de Batches (Lotes) ---
export const getBatch = () => writeBatch(db);
export const commitBatch = async (batch) => {
  try {
    await batch.commit();
  } catch (error) {
    console.error('[firebase] Error batch', error);
    throw error;
  }
};

// ======================================================
// SECCIÓN 3: EL OBJETO ADAPTADOR (PÚBLICO)
// Este objeto es el que utiliza 'storage.service.js'.
// ======================================================

export const firebaseAdapter = {

  // --- INICIALIZACIÓN ---
  async init() {
    console.info('[firebase] Adaptador inicializado y listo.');
  },

  // =================================================================
  // 3.1. MÉTODOS GENÉRICOS (NUEVA ARQUITECTURA)
  // ✅ CRÍTICO: Exponemos las funciones puras para que 
  // storage.service.js pueda usarlas dinámicamente.
  // =================================================================
  getAll: getAll,  // Permite: activeAdapter.getAll('roles')
  create: create,  // Permite: activeAdapter.create('categories', data)
  update: update,  // Permite: activeAdapter.update('units', id, data)
  remove: remove,  // Permite: activeAdapter.remove('logs', id)
  get: get,        // Permite: activeAdapter.get('users', id)

  // =================================================================
  // 3.2. MÉTODOS ESPECÍFICOS (LEGACY / COMPATIBILIDAD)
  // Se mantienen para no romper ProductsView, PosView, etc.
  // =================================================================

  // --- Productos ---
  async getAllProducts(state) {
    try {
      if (!state.session?.business?.id) return [];
      const businessId = state.session.business.id;
      if (businessId === 'admin_view') return [];

      // Reutiliza la función pura 'getAll'
      const products = await getAll(`businesses/${businessId}/products`);
      return products || [];
    } catch (error) {
      console.error('[firebase] Error obteniendo productos:', error);
      return [];
    }
  },

  async createProduct(state, productData) {
    try {
      if (!state.session?.business?.id) throw new Error("Sin ID de negocio.");
      const businessId = state.session.business.id;

      // Reutiliza la función pura 'create'
      const newProductId = await create(`businesses/${businessId}/products`, productData);
      return { ...productData, id: newProductId };
    } catch (error) {
      console.error('[firebase] Error creando producto:', error);
      throw error;
    }
  },

  async updateProduct(state, productId, data) {
    try {
      const businessId = state.session?.business?.id;
      if (!businessId) throw new Error("Sin ID de negocio.");
      await update(`businesses/${businessId}/products`, productId, data);
    } catch (error) {
      console.error('[firebase] Error actualizando producto:', error);
      throw error;
    }
  },

  async deleteProduct(state, productId) {
    try {
      const businessId = state.session?.business?.id;
      if (!businessId) throw new Error("Sin ID de negocio.");
      await remove(`businesses/${businessId}/products`, productId);
    } catch (error) {
      console.error('[firebase] Error eliminando producto:', error);
      throw error;
    }
  },

  // --- Configuración y Usuarios ---
  async saveSettings(state) {
    try {
      const businessId = state.session?.business?.id;
      if (!businessId || businessId === 'admin_view') return;
      await set(`businesses/${businessId}/settings`, 'app', state.settings);
    } catch (error) {
      console.error('[firebase] Error guardando configuración:', error);
      throw error;
    }
  },

  async getUserByUsername(username) {
    try {
      const users = await getAll('users', [['username', '==', username]]);
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('[firebase] Error obteniendo usuario:', error);
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
      throw error;
    }
  },

  // --- Negocios (Super Admin) ---
  async getAllBusinesses() {
    try {
      const businesses = await getAll('businesses');
      return businesses || [];
    } catch (error) {
      console.error('[firebase] Error obteniendo negocios:', error);
      return [];
    }
  },

  async getBusinessDetails(businessId) {
    try {
      const business = await get(`businesses/${businessId}`);
      return business || null;
    } catch (error) {
      console.error('[firebase] Error detalles negocio:', error);
      return null;
    }
  }
};