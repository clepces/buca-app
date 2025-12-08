import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, deleteDoc, query, where } from 'firebase/firestore';
import { Logger } from './logger.service.js';

// --- ADAPTADORES DE DATOS ---

// 1. De Firestore (Anidado) -> App (Plano)
const mapFirestoreToApp = (docSnapshot) => {
    const data = docSnapshot.data();
    return {
        id: docSnapshot.id,
        // Nombre: Prioridad a Razón Social, sino Nombre+Apellido
        name: data.legalName || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Sin Nombre',

        identification: data.taxId || '', // CI o RIF

        // Aplanamos 'contact'
        email: data.contact?.email || '',
        phone: data.contact?.phone || '',
        address: data.contact?.address?.fullAddress || '',

        // Mapeo de valores
        type: data.type === 'business' ? 'Empresa' : 'Particular',
        isActive: data.isActive !== false, // Default true

        createdAt: data.createdAt,
        totalPurchases: data.purchaseStats?.totalSpent || 0
    };
};

// 2. De App (Plano) -> Firestore (Anidado)
const mapAppToFirestore = (flatData) => {
    const isBusiness = flatData.type === 'Empresa';

    // Separar nombre si es persona natural (lógica simple)
    const nameParts = flatData.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    return {
        // Datos Legales
        legalName: flatData.name,
        firstName: isBusiness ? '' : firstName,
        lastName: isBusiness ? '' : lastName,
        taxId: flatData.identification,
        type: isBusiness ? 'business' : 'individual',

        // Datos de Contacto (Estructura Anidada)
        contact: {
            email: flatData.email || '',
            phone: flatData.phone || '',
            address: {
                fullAddress: flatData.address || '',
                city: '',
                state: '',
                country: 'Venezuela'
            },
            primaryContactPerson: ''
        },

        isActive: true,
        updatedAt: new Date().toISOString()
    };
};

// --- SERVICIOS ---

/**
 * Crea un nuevo cliente.
 */
export async function createClient(businessId, clientData) {
    if (!businessId) throw new Error('ID de Negocio requerido');

    const db = getFirestore();
    try {
        const clientsRef = collection(db, 'businesses', businessId, 'customers');

        // 1. Preparar Payload Inicial
        const payload = {
            ...mapAppToFirestore(clientData),
            createdAt: new Date().toISOString(),
            purchaseStats: { // Stats iniciales
                lastPurchaseDate: null,
                purchaseCount: 0,
                totalSpent: 0
            },
            balance: 0,
            tags: []
        };

        // 2. Guardar
        const docRef = await addDoc(clientsRef, payload);
        Logger.info(`[createClient] Cliente creado: ${docRef.id}`);

        return docRef.id;
    } catch (error) {
        Logger.error('[createClient] Error:', error);
        throw error;
    }
}

/**
 * Obtiene todos los clientes.
 */
export async function getClients(businessId) {
    if (!businessId) throw new Error('ID de Negocio requerido');

    const db = getFirestore();
    try {
        const clientsRef = collection(db, 'businesses', businessId, 'customers');
        const querySnapshot = await getDocs(clientsRef);

        return querySnapshot.docs.map(doc => mapFirestoreToApp(doc));
    } catch (error) {
        Logger.error('[getClients] Error:', error);
        throw error;
    }
}

/**
 * Actualiza un cliente.
 */
export async function updateClient(businessId, clientId, clientData) {
    if (!businessId || !clientId) throw new Error('IDs requeridos');

    const db = getFirestore();
    try {
        const clientRef = doc(db, 'businesses', businessId, 'customers', clientId);

        // 1. Usar notación de punto para NO borrar campos anidados que no tocamos
        // (Aunque en este caso el form envía todo el bloque de contacto, es más seguro así)
        const isBusiness = clientData.type === 'Empresa';

        const updatePayload = {
            legalName: clientData.name,
            taxId: clientData.identification,
            type: isBusiness ? 'business' : 'individual',

            // Campos anidados directos
            'contact.email': clientData.email || '',
            'contact.phone': clientData.phone || '',
            'contact.address.fullAddress': clientData.address || '',

            updatedAt: new Date().toISOString()
        };

        await updateDoc(clientRef, updatePayload);
        Logger.info(`[updateClient] Cliente actualizado: ${clientId}`);
        return true;
    } catch (error) {
        Logger.error('[updateClient] Error:', error);
        throw error;
    }
}

/**
 * Elimina (Soft Delete) un cliente.
 */
export async function deleteClient(businessId, clientId) {
    if (!businessId || !clientId) throw new Error('IDs requeridos');

    const db = getFirestore();
    try {
        const clientRef = doc(db, 'businesses', businessId, 'customers', clientId);
        // Soft delete: solo marcamos inactivo
        await updateDoc(clientRef, { isActive: false });
        return true;
    } catch (error) {
        Logger.error('[deleteClient] Error:', error);
        throw error;
    }
}