// ======================================================
// ARCHIVO: src/utils/productFormHelpers.js
// Propósito: Funciones puras de comparación y formato
// extraídas de ProductForm.js para refactorización.
// (VERSIÓN CORREGIDA - SIN SYNTAX ERROR)
// ======================================================

/**
 * Normaliza un valor para comparación.
 * (null, undefined, "" se convierten en "")
 * (Los strings se limpian con trim())
 * (Los números se mantienen como números)
 */
const normalize = (val) => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'string') return val.trim();
    if (typeof val === 'number') return val; 
    return val;
};

/**
 * Compara dos valores (nuevo y antiguo) de forma robusta.
 * Maneja la diferencia entre números (0) y strings vacíos ("").
 * @returns {boolean} - True si los valores son diferentes.
 */
const hasChanged = (newVal, oldVal, fieldName) => {
    const newNorm = normalize(newVal);
    const oldNorm = normalize(oldVal);
    
    // Si ambos son números, comparar como números
    if (typeof newNorm === 'number' && typeof oldNorm === 'number') {
        const changed = newNorm !== oldNorm;
        // console.log(`  ${fieldName}:`, { old: oldNorm, new: newNorm, changed, types: 'both numbers' });
        return changed;
    }
    
    // Si no, comparar como strings
    const oldStr = String(oldNorm);
    const newStr = String(newNorm);
    const changed = oldStr !== newStr;
    
    /*
    console.log(`  ${fieldName}:`, { 
        old: oldNorm, 
        new: newNorm, 
        oldStr, 
        newStr, 
        changed,
        types: `old: ${typeof oldNorm}, new: ${typeof newNorm}`
    });
    */
    
    return changed;
};

/**
 * Formatea un valor de texto para mostrar en el resumen (ej. 'N/A').
 */
export const fText = (val) => {
    const norm = normalize(val);
    if (norm === '') return 'N/A';
    if (norm === 0) return '0'; // Importante para no mostrar 0 como 'N/A'
    return String(norm);
};

// --- Formateadores Específicos ---

const formatNumber = (num, decimals = 2) => new Intl.NumberFormat('es-VE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(num);

/**
 * Formatea un valor como Moneda (ej. $1,234.50).
 */
export const fCurr = (val, simboloPrincipal = '$') => {
    const norm = normalize(val);
    const num = typeof norm === 'number' ? norm : parseFloat(norm) || 0;
    return `${simboloPrincipal}${formatNumber(num)}`;
};

/**
 * Formatea un valor como Porcentaje (ej. 30%).
 */
export const fPerc = (val) => {
    const norm = normalize(val);
    return `${norm === '' ? 'N/A' : norm}%`;
};

/**
 * Formatea un valor como Stock (ej. 20 Unid.).
 */
export const fStock = (val) => {
    const norm = normalize(val);
    return `${norm === '' ? 'N/A' : norm} Unid.`;
};

/**
 * Formatea un valor como Peso (ej. 1 Kg).
 */
export const fPeso = (val) => {
    const norm = normalize(val);
    return norm === '' || norm === null ? 'N/A' : `${norm} Kg`;
};


/**
 * Genera el HTML para una fila del resumen de "diferencias".
 * @param {string} label - El título de la fila (ej. "Nombre").
 * @param {*} newVal - El nuevo valor del formulario.
 * @param {*} oldVal - El valor original del producto.
 * @param {function} formatter - La función de formato a usar (fText, fCurr, etc.).
 * @param {string} [formatterConfig] - Configuración extra para el formateador (ej. simboloPrincipal).
 * @returns {string} - El HTML de la fila (diff-item).
 */
export const diff = (label, newVal, oldVal, formatter = fText, formatterConfig) => {
    
    // Pasamos el símbolo de moneda si el formatter es fCurr
    const formattedOld = formatter === fCurr ? formatter(oldVal, formatterConfig) : formatter(oldVal);
    const formattedNew = formatter === fCurr ? formatter(newVal, formatterConfig) : formatter(newVal);
    
    if (hasChanged(newVal, oldVal, label)) {
        return `
        <div class="diff-item changed">
            <span class="diff-label">${label}:</span>
            <span class="diff-value">
                <span class="diff-old">${formattedOld}</span>
                <i class="bi bi-arrow-right-short"></i>
                <span class="diff-new">${formattedNew}</span>
            </span>
        </div>`;
    } else {
        return `
        <div class="diff-item unchanged">
            <span class="diff-label">${label}:</span>
            <span class="diff-value">${formattedNew}</span>
        </div>`;
    }
};