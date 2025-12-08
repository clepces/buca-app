import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ROLES } from './roles.config.js';
import config from '../config.js';
import { Logger } from './logger.service.js';

const API_URL = config.api.createBusinessUser;

/**
 * Envía la petición para crear un nuevo empleado (Cajero/Operador)
 * @param {Object} employeeData - { name, email, password, role }
 * @param {string} businessId - ID del negocio (Requerido)
 */
export async function createEmployee(employeeData, businessId) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) throw new Error('No hay sesión activa');
    if (!businessId) throw new Error('Business ID is required for creation');

    // 1. Obtener el token del Propietario actual
    // Forzamos el refresco para asegurar claims recientes
    const token = await currentUser.getIdToken(true);

    try {
        Logger.info('[createEmployee] Sending request to:', API_URL);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Autenticación segura
            },
            body: JSON.stringify({
                data: {
                    userData: {
                        ...employeeData,
                        jobTitle: employeeData.role, // Por ahora el rol es el cargo
                        departmentIds: [], // Futuro
                        securitySettings: {
                            sessionMode: 'multiple'
                        },
                        session: {
                            lastLogin: null,
                            activeDeviceId: null,
                            lastIpAddress: null
                        }
                    },
                    businessId: businessId // Explicitly send businessId
                }
            })
        });

        const result = await response.json();

        if (!response.ok) {
            Logger.error('[createEmployee] Error response:', result);
            // Extraemos el mensaje de error amigable si existe
            throw new Error(result.error?.message || 'Error al crear empleado');
        }

        Logger.info('[createEmployee] Success:', result);
        return result.data;
    } catch (error) {
        Logger.error("Employee Service Error:", error);
        throw error;
    }
}

/**
 * Obtiene la lista de empleados del negocio actual
 * @param {string} businessId
 * @returns {Promise<Array>} Lista de empleados
 */
export async function getEmployees(businessId) {
    if (!businessId) throw new Error('Business ID is required');

    const db = getFirestore();
    try {
        const usersRef = collection(db, 'businesses', businessId, 'users');
        const querySnapshot = await getDocs(usersRef);

        const employees = [];
        querySnapshot.forEach((doc) => {
            employees.push({ id: doc.id, ...doc.data() });
        });

        return employees;
    } catch (error) {
        Logger.error('[getEmployees] Error fetching employees:', error);
        throw error;
    }
}

/**
 * Actualiza los datos de un empleado (Firestore Only por ahora)
 * @param {string} employeeId 
 * @param {object} data - Datos a actualizar
 * @param {string} businessId 
 */
export async function updateEmployee(employeeId, data, businessId) {
    if (!businessId || !employeeId) throw new Error('ID requerido');

    const db = getFirestore();
    try {
        const userRef = doc(db, 'businesses', businessId, 'users', employeeId);
        await updateDoc(userRef, data);
        return true;
    } catch (error) {
        Logger.error('[updateEmployee] Error:', error);
        throw error;
    }
}

/**
 * Cambia el estado activo/inactivo de un empleado (Soft Delete)
 * @param {string} employeeId 
 * @param {boolean} isActive 
 * @param {string} businessId 
 */
export async function toggleEmployeeStatus(employeeId, isActive, businessId) {
    if (!businessId || !employeeId) throw new Error('ID requerido');

    return updateEmployee(employeeId, { isActive }, businessId);
}

/**
 * Elimina un empleado de forma permanente (Hard Delete)
 * @param {string} employeeId 
 * @param {string} businessId 
 */
export async function deleteEmployee(employeeId, businessId) {
    if (!businessId || !employeeId) throw new Error('ID requerido');

    const db = getFirestore();
    try {
        // En una app real, también deberíamos borrar el usuario de Auth, 
        // pero eso requiere Cloud Functions con Admin SDK.
        // Aquí borramos el registro de Firestore para que no aparezca en la lista.

        // TODO: Llamar a Cloud Function si necesitamos borrar Auth User también.

        await deleteDoc(doc(db, 'businesses', businessId, 'users', employeeId));
        return true;
    } catch (error) {
        Logger.error('[deleteEmployee] Error:', error);
        throw error;
    }
}