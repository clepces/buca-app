// services/storage-adapters/firebase.adapter.js

import { db } from '../../firebase-config';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, startAfter, writeBatch } from 'firebase/firestore';

/**
 * Obtiene la ruta de la colección, manejando sub-colecciones.
 * @param {string} path - La ruta de la colección (ej. 'products' o 'businesses/id/products').
 * @returns {CollectionReference}
 */
const getCollection = (path) => {
  return collection(db, path);
};

/**
 * Obtiene la referencia a un documento, manejando sub-colecciones.
 * @param {string} path - La ruta al documento (ej. 'products/id' o 'businesses/id/products/id').
 * @returns {DocumentReference}
 */
const getDocRef = (path) => {
  return doc(db, path);
};

/**
 * Obtiene un documento por su ID desde una ruta de colección.
 * @param {string} collectionPath - Ruta a la colección.
 * @param {string} id - ID del documento.
 * @returns {Promise<object|null>} - Los datos del documento o null.
 */
export const get = async (collectionPath, id) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // --- ¡CAMBIO AQUÍ! ---
      console.log(`[firebase] No se encontró el documento: ${collectionPath}/${id}`);
      // --------------------
      return null;
    }
  } catch (error) {
    // --- ¡CAMBIO AQUÍ! ---
    console.error(`[firebase] Error en get(${collectionPath}, ${id})`, error);
    // --------------------
    throw error; // Relanza el error para que error.service lo maneje
  }
};

/**
 * Obtiene todos los documentos de una colección (opcionalmente con filtros).
 * @param {string} collectionPath - Ruta a la colección.
 * @param {Array} [qParams] - Array de parámetros de consulta (ej. ['status', '==', 'active']).
 * @returns {Promise<Array>} - Un array de documentos.
 */
export const getAll = async (collectionPath, qParams) => {
  try {
    let q = query(getCollection(collectionPath));
    
    // Aplicar filtros si existen
    if (qParams && qParams.length > 0) {
      qParams.forEach(param => {
        if (Array.isArray(param) && param.length === 3) {
          q = query(q, where(param[0], param[1], param[2]));
        }
        // TODO: Añadir soporte para orderBy, limit, etc.
      });
    }

    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;

  } catch (error) {
    // --- ¡CAMBIO AQUÍ! ---
    console.error(`[firebase] Error en getAll(${collectionPath})`, error);
    // --------------------
    throw error;
  }
};

/**
 * Crea un nuevo documento en una colección.
 * @param {string} collectionPath - Ruta a la colección.
 * @param {object} data - Los datos para el nuevo documento.
 * @returns {Promise<string>} - El ID del nuevo documento.
 */
export const create = async (collectionPath, data) => {
  try {
    const docRef = await addDoc(getCollection(collectionPath), data);
    return docRef.id;
  } catch (error) {
    // --- ¡CAMBIO AQUÍ! ---
    console.error(`[firebase] Error en create(${collectionPath})`, error, data);
    // --------------------
    throw error;
  }
};

/**
 * Crea o sobrescribe un documento con un ID específico.
 * @param {string} collectionPath - Ruta a la colección.
 * @param {string} id - El ID del documento a crear/sobrescribir.
 * @param {object} data - Los datos a guardar.
 * @returns {Promise<void>}
 */
export const set = async (collectionPath, id, data) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    await setDoc(docRef, data); // setDoc crea o sobrescribe
  } catch (error) {
    // --- ¡CAMBIO AQUÍ! ---
    console.error(`[firebase] Error en set(${collectionPath}, ${id})`, error, data);
    // --------------------
    throw error;
  }
};

/**
 * Actualiza un documento existente.
 * @param {string} collectionPath - Ruta a la colección.
 * @param {string} id - El ID del documento a actualizar.
 * @param {object} data - Los datos a actualizar (merge).
 * @returns {Promise<void>}
 */
export const update = async (collectionPath, id, data) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    await updateDoc(docRef, data); // updateDoc hace merge
  } catch (error) {
    // --- ¡CAMBIO AQUÍ! ---
    console.error(`[firebase] Error en update(${collectionPath}, ${id})`, error, data);
    // --------------------
    throw error;
  }
};

/**
 * Elimina un documento.
 * @param {string} collectionPath - Ruta a la colección.
 * @param {string} id - El ID del documento a eliminar.
 * @returns {Promise<void>}
 */
export const remove = async (collectionPath, id) => {
  try {
    const docRef = getDocRef(`${collectionPath}/${id}`);
    await deleteDoc(docRef);
  } catch (error) {
    // --- ¡CAMBIO AQUÍ! ---
    console.error(`[firebase] Error en remove(${collectionPath}, ${id})`, error);
    // --------------------
    throw error;
  }
};

/**
 * Obtiene una referencia a un nuevo lote de escritura (batch).
 * @returns {WriteBatch}
 */
export const getBatch = () => {
  return writeBatch(db);
};

/**
 * Ejecuta un lote de escritura.
 * @param {WriteBatch} batch - El lote a ejecutar.
 * @returns {Promise<void>}
 */
export const commitBatch = async (batch) => {
  try {
    await batch.commit();
  } catch (error) {
    // --- ¡CAMBIO AQUÍ! ---
    console.error('[firebase] Error al ejecutar el batch', error);
    // --------------------
    throw error;
  }
};

/**
 * Adaptador completo de Firebase para storage.service.js
 */
export const firebaseAdapter = {
  async init() {
    console.log('[firebase] Adaptador inicializado');
  },

  async getAllProducts(state) {
    try {
      if (!state.session?.business?.id) {
        return [];
      }
      
      const businessId = state.session.business.id;
      if (businessId === 'admin_view') {
        return []; // El admin no tiene productos
      }
      
      const products = await getAll(`businesses/${businessId}/products`);
      return products || [];
    } catch (error) {
      console.error('[firebase] Error obteniendo productos:', error);
      return [];
    }
  },

  async saveSettings(state) {
    try {
      if (!state.session?.business?.id) {
        return;
      }
      
      const businessId = state.session.business.id;
      if (businessId === 'admin_view') {
        return; // El admin no guarda configuraciones de negocio
      }
      
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

  async deleteProduct(productId) {
    try {
      await remove('products', productId);
    } catch (error) {
      console.error('[firebase] Error eliminando producto:', error);
      throw error;
    }
  },

  async updateProduct(productId, data) {
    try {
      await update('products', productId, data);
    } catch (error) {
      console.error('[firebase] Error actualizando producto:', error);
      throw error;
    }
  }
};