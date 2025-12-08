import { Logger } from './logger.service.js';
import { validateTextFields, validateNumericFields, productExists, validateExchangeRate } from '../utils/validators.js';

export function validarCamposTexto(...fields) {
    return validateTextFields(...fields);
}

export function validarCamposNumericos(costo, ganancia, unidades) {
    const result = validateNumericFields(costo, ganancia, unidades);
    return {
        esValido: result.isValid,
        mensaje: result.message
    };
}

export function productoExiste(nombre, marca, productos, idExcluir = null) {
    return productExists(nombre, marca, productos, idExcluir);
}

export function validarTasaBCV(rate) {
    return validateExchangeRate(rate);
}

export async function sha256(string) {
    try {
        const utf8 = new TextEncoder().encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    } catch (error) {
        Logger.error("Error al hashear con Crypto API. Asegúrate de estar en un contexto seguro (https o localhost).", error);
        return null;
    }
}