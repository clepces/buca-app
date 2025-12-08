// ======================================================
// ARCHIVO: src/utils/productFormHelpers.js
// Propósito: Funciones puras de comparación y formato
// VERSIÓN PREMIUM - UI MEJORADA
// ======================================================

import { normalizeValue, formatNumber, formatCurrency } from './formatters.js';

/**
 * Normaliza un valor para comparación.
 */
const normalize = normalizeValue;

// ... keeping hasChanged ...

/**
 * Compara dos valores (nuevo y antiguo) de forma robusta.
 */
const hasChanged = (newVal, oldVal, fieldName) => {
    const newNorm = normalize(newVal);
    const oldNorm = normalize(oldVal);

    if (typeof newNorm === 'number' && typeof oldNorm === 'number') {
        return newNorm !== oldNorm;
    }

    const oldStr = String(oldNorm);
    const newStr = String(newNorm);
    return oldStr !== newStr;
};

/**
 * Formatea un valor de texto para mostrar en el resumen.
 */
export const fText = (val) => {
    const norm = normalize(val);
    if (norm === '') return 'N/A';
    if (norm === 0) return '0';
    return String(norm);
};

// --- Formateadores Específicos ---

export const fCurr = (val, simboloPrincipal = '$') => {
    return formatCurrency(val, simboloPrincipal);
};

export const fPerc = (val) => {
    const norm = normalize(val);
    return `${norm === '' ? 'N/A' : norm}%`;
};

export const fStock = (val) => {
    const norm = normalize(val);
    return `${norm === '' ? 'N/A' : norm} Unid.`;
};

export const fPeso = (val) => {
    const norm = normalize(val);
    return norm === '' || norm === null ? 'N/A' : `${norm} Kg`;
};

/**
 * 🎨 VERSIÓN PREMIUM - Genera el HTML para una fila del resumen con diseño mejorado
 * Incluye: badges de estado, iconos editables siempre visibles, animaciones
 */
export const diff = (label, newVal, oldVal, formatter = fText, formatterConfig) => {

    const formattedOld = formatter === fCurr ? formatter(oldVal, formatterConfig) : formatter(oldVal);
    const formattedNew = formatter === fCurr ? formatter(newVal, formatterConfig) : formatter(newVal);

    const changed = hasChanged(newVal, oldVal, label);

    if (changed) {
        // 🎨 Campo CAMBIADO - Con badge amarillo y animación
        return `
        <div class="diff-item-premium changed">
            <div class="diff-header-premium">
                <span class="diff-label-premium">${label}</span>
                <span class="diff-badge changed-badge">
                    <i class="bi bi-exclamation-circle-fill"></i>
                    Modificado
                </span>
            </div>
            <div class="diff-value-premium">
                <div class="diff-comparison">
                    <span class="diff-old-premium">${formattedOld}</span>
                    <i class="bi bi-arrow-right diff-arrow"></i>
                    <span class="diff-new-premium">${formattedNew}</span>
                </div>
                <button class="btn-edit-inline" 
                        data-action="inline-edit" 
                        data-field-label="${label}"
                        data-current-value="${normalize(newVal)}"
                        title="Editar ${label}">
                    <i class="bi bi-pencil-fill"></i>
                </button>
            </div>
        </div>`;
    } else {
        // 🎨 Campo SIN CAMBIOS - Con badge gris y hover sutil
        return `
        <div class="diff-item-premium unchanged">
            <div class="diff-header-premium">
                <span class="diff-label-premium">${label}</span>
                <span class="diff-badge unchanged-badge">
                    <i class="bi bi-check-circle-fill"></i>
                    Sin cambios
                </span>
            </div>
            <div class="diff-value-premium">
                <span class="diff-current-value">${formattedNew}</span>
                <button class="btn-edit-inline" 
                        data-action="inline-edit" 
                        data-field-label="${label}"
                        data-current-value="${normalize(newVal)}"
                        title="Editar ${label}">
                    <i class="bi bi-pencil-fill"></i>
                </button>
            </div>
        </div>`;
    }
};