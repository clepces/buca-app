import { Logger } from './logger.service.js';

export function validarCamposTexto(...fields) {
    return fields.every(field => field && field.trim() !== '');
}

export function validarCamposNumericos(costo, ganancia, unidades) {
    if (isNaN(costo) || isNaN(ganancia) || isNaN(unidades)) {
        return { esValido: false, mensaje: "Costo, ganancia y unidades deben ser números." };
    }
    if (costo <= 0 || unidades <= 0) {
        return { esValido: false, mensaje: "Costo y unidades deben ser mayores a cero." };
    }
    if (ganancia < 0) {
        return { esValido: false, mensaje: "El porcentaje de ganancia no puede ser negativo." };
    }
    return { esValido: true, mensaje: "" };
}

export function productoExiste(nombre, marca, productos, idExcluir = null) {
    return productos.some(p =>
        p.name.toLowerCase() === nombre.toLowerCase() &&
        p.brand.toLowerCase() === marca.toLowerCase() &&
        p.id !== idExcluir
    );
}

export function validarTasaBCV(rate) {
    return !isNaN(rate) && rate > 0;
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