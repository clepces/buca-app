// ======================================================
// ARCHIVO: src/services/admin.service.js (ACTUALIZADO)
// PROPÓSITO: Llama a las Cloud Functions de Super Admin.
// ======================================================

import { Logger } from './logger.service.js';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Inicializamos la conexión a las Functions
const functions = getFunctions();
const createBusinessCallable = httpsCallable(functions, 'createBusinessAndOwner');

/**
 * Llama a la Cloud Function para crear un nuevo negocio y su propietario.
 * @param {object} businessData - { name, planId }
 * @param {object} ownerData - { name, email, password }
 */
export async function createNewBusiness(businessData, ownerData) {
    Logger.info('Llamando a Cloud Function: createBusinessAndOwner...', { businessData, ownerData });

    try {
        // Llamamos a la función "createBusinessAndOwner" que definimos en index.js
        const result = await createBusinessCallable({ businessData, ownerData });
        
        // La Cloud Function nos devuelve un objeto en 'result.data'
        if (result.data.success) {
            Logger.info('Cloud Function ejecutada con éxito:', result.data);
            return result.data;
        } else {
            // Esto no debería pasar si la función maneja bien sus errores
            throw new Error(result.data.message || 'Error desconocido en Cloud Function');
        }

    } catch (error) {
        Logger.error('Error al llamar la Cloud Function:', error);

        // 'error.message' contendrá los mensajes amigables que enviamos 
        // desde la Cloud Function (ej. "El email ya está en uso.")
        throw new Error(error.message);
    }
}