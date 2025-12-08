import { Logger } from './logger.service.js';
import { auth, db } from '../firebase-config.js';
import { doc, updateDoc } from 'firebase/firestore';

import config from '../config.js';

const CREATE_BUSINESS_URL = config.api.createBusinessAndOwner;

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

export async function updateBusiness(companyId, updateData) {
    Logger.info(`[AdminService] Actualizando empresa ${companyId}...`, updateData);
    try {
        const companyRef = doc(db, 'businesses', companyId);
        await updateDoc(companyRef, updateData);
        return { success: true };
    } catch (error) {
        Logger.error('Error actualizando empresa:', error);
        throw error;
    }
}

export async function deleteBusiness(companyId) {
    Logger.info(`[AdminService] Soft-deleting empresa ${companyId}...`);

    try {
        const companyRef = doc(db, 'businesses', companyId);

        // En lugar de borrar, cambiamos el estado y añadimos metadatos
        await updateDoc(companyRef, {
            status: 'deleted',           // Estado "papelera"
            isActive: false,             // Desactivar acceso inmediatamente
            deletedAt: new Date().toISOString(), // Fecha de borrado
            deletedBy: auth.currentUser?.uid || 'system' // Quién lo borró
        });

        Logger.info(`[AdminService] Empresa ${companyId} movida a la papelera.`);
        return { success: true };

    } catch (error) {
        Logger.error('Error al archivar la empresa (Soft Delete):', error);
        throw error;
    }
}

export async function restoreBusiness(companyId) {
    Logger.info(`[AdminService] Restaurando empresa ${companyId}...`);
    try {
        const companyRef = doc(db, 'businesses', companyId);
        await updateDoc(companyRef, {
            status: 'active',            // Volvemos al estado activo
            isActive: true,              // Reactivamos el acceso
            deletedAt: null,             // Limpiamos fecha de borrado
            deletedBy: null
        });
        return { success: true };
    } catch (error) {
        Logger.error('Error al restaurar la empresa:', error);
        throw error;
    }
}