import { getAuth } from 'firebase/auth';
import { ROLES } from './roles.config.js'; // Importamos roles para validar

// ✅ URL COPIADA DE TU CONSOLA (¡Exacta!)
const API_URL = "https://us-central1-buca-scdbs.cloudfunctions.net/createBusinessUser";

/**
 * Envía la petición para crear un nuevo empleado (Cajero/Operador)
 * @param {Object} employeeData - { name, email, password, role }
 */
export async function createEmployee(employeeData) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) throw new Error('No hay sesión activa');

    // 1. Obtener el token del Propietario actual
    const token = await currentUser.getIdToken();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Autenticación segura
            },
            body: JSON.stringify({
                data: { userData: employeeData }
            })
        });

        const result = await response.json();

        if (!response.ok) {
            // Extraemos el mensaje de error amigable si existe
            throw new Error(result.error?.message || 'Error al crear empleado');
        }

        return result.data;
    } catch (error) {
        console.error("Employee Service Error:", error);
        throw error;
    }
}