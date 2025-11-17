// ======================================================
// ARCHIVO: src/services/admin.service.js (VUELTA A FETCH MANUAL)
// PROPÓSITO: Llama a la Cloud Function como un endpoint HTTP.
// ======================================================

import { Logger } from './logger.service.js';
import { auth } from '../firebase-config.js'; // <-- ¡IMPORTANTE!

// URL de la Cloud Function
const CREATE_BUSINESS_URL = 'https://us-central1-buca-scdbs.cloudfunctions.net/createBusinessAndOwner';

/**
 * Llama a la Cloud Function para crear un nuevo negocio y su propietario.
 * @param {object} businessData - { name, planId }
 * @param {object} ownerData - { name, email, password }
 */
export async function createNewBusiness(businessData, ownerData) {
    Logger.info('Llamando a Cloud Function (manual fetch): createBusinessAndOwner...', { businessData, ownerData });

    try {
        // 1. Obtener el token MÁS RECIENTE del usuario actual
        if (!auth.currentUser) {
            throw new Error("No hay usuario autenticado.");
        }
        // true = forzar refresco (para estar 100% seguros)
        const token = await auth.currentUser.getIdToken(true); 

        // 2. Construir la solicitud 'fetch'
        const response = await fetch(CREATE_BUSINESS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // <-- Adjuntamos el token manualmente
            },
            // IMPORTANTE: El 'fetch' debe enviar el objeto 'data' 
            // que la función 'onCall' envolvía automáticamente
            body: JSON.stringify({
                data: { businessData, ownerData } 
            })
        });

        // 3. Procesar la respuesta
        const result = await response.json();

        // 4. Manejar la respuesta
        // Las funciones 'onRequest' devuelven el error en 'result.error'
        // y el éxito en 'result.data' (para simular el 'onCall')
        if (!response.ok || result.error) {
            throw new Error(result.error?.message || 'Error en la respuesta del servidor.');
        }

        if (result.data && result.data.success) {
            Logger.info('Cloud Function (manual fetch) ejecutada con éxito:', result.data);
            return result.data;
        } else {
            throw new Error('La respuesta del servidor no fue exitosa.');
        }

    } catch (error) {
        Logger.error('Error al llamar la Cloud Function (manual fetch):', error);
        throw new Error(error.message);
    }
}