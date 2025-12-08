import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, deleteDoc, query, where } from 'firebase/firestore';
import { Logger } from './logger.service.js';

/**
 * Crea un nuevo cliente en la base de datos
 * @param {string} businessId 
 * @param {Object} clientData 
 */
export async function createClient(businessId, clientData) {
    if (!businessId) throw new Error('Business ID is required');

    const db = getFirestore();
    try {
        const clientsRef = collection(db, 'businesses', businessId, 'clients');

        // Añadir timestamps
        const now = new Date().toISOString();
        const dataToSave = {
            ...clientData,
            createdAt: now,
            updatedAt: now,
            isActive: true, // Por defecto activo
            totalPurchases: 0
        };

        const docRef = await addDoc(clientsRef, dataToSave);
        Logger.info(`[createClient] Cliente creado con ID: ${docRef.id}`);

        return { id: docRef.id, ...dataToSave };
    } catch (error) {
        Logger.error('[createClient] Error:', error);
        throw error;
    }
}

/**
 * Obtiene todos los clientes de un negocio
 * @param {string} businessId 
 */
export async function getClients(businessId) {
    if (!businessId) throw new Error('Business ID is required');

    const db = getFirestore();
    try {
        const clientsRef = collection(db, 'businesses', businessId, 'clients');
        // Opcional: filtrar por isActive si quisieramos ocultar los borrados lógicos
        // const q = query(clientsRef, where("isActive", "==", true));

        const querySnapshot = await getDocs(clientsRef);

        const clients = [];
        querySnapshot.forEach((doc) => {
            clients.push({ id: doc.id, ...doc.data() });
        });

        return clients;
    } catch (error) {
        Logger.error('[getClients] Error:', error);
        throw error;
    }
}

/**
 * Actualiza un cliente existente
 * @param {string} businessId 
 * @param {string} clientId 
 * @param {Object} clientData 
 */
export async function updateClient(businessId, clientId, clientData) {
    if (!businessId || !clientId) throw new Error('ID Requerido');

    const db = getFirestore();
    try {
        const clientRef = doc(db, 'businesses', businessId, 'clients', clientId);

        const dataToUpdate = {
            ...clientData,
            updatedAt: new Date().toISOString()
        };

        await updateDoc(clientRef, dataToUpdate);
        Logger.info(`[updateClient] Cliente actualizado: ${clientId}`);
        return true;
    } catch (error) {
        Logger.error('[updateClient] Error:', error);
        throw error;
    }
}

/**
 * Elimina (o desactiva) un cliente
 * @param {string} businessId 
 * @param {string} clientId 
 * @param {boolean} softDelete - Si es true, solo marca isActive = false
 */
export async function deleteClient(businessId, clientId, softDelete = true) {
    if (!businessId || !clientId) throw new Error('ID Requerido');

    const db = getFirestore();
    try {
        if (softDelete) {
            // Soft Delete
            await updateClient(businessId, clientId, { isActive: false });
        } else {
            // Hard Delete
            const clientRef = doc(db, 'businesses', businessId, 'clients', clientId);
            await deleteDoc(clientRef);
        }
        return true;
    } catch (error) {
        Logger.error('[deleteClient] Error:', error);
        throw error;
    }
}
