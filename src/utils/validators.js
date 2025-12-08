/**
 * Validates that all provided text fields are not empty or just whitespace.
 * @param {...string} fields - The fields to validate.
 * @returns {boolean} True if all fields are valid, false otherwise.
 */
export function validateTextFields(...fields) {
    return fields.every(field => field && field.trim() !== '');
}

/**
 * Validates numeric fields for product creation (cost, profit, units).
 * @param {number} cost - The cost.
 * @param {number} profit - The profit percentage.
 * @param {number} units - The units.
 * @returns {object} { isValid: boolean, message: string }
 */
export function validateNumericFields(cost, profit, units) {
    if (isNaN(cost) || isNaN(profit) || isNaN(units)) {
        return { isValid: false, message: "Costo, ganancia y unidades deben ser números." };
    }
    if (cost <= 0 || units <= 0) {
        return { isValid: false, message: "Costo y unidades deben ser mayores a cero." };
    }
    if (profit < 0) {
        return { isValid: false, message: "El porcentaje de ganancia no puede ser negativo." };
    }
    return { isValid: true, message: "" };
}

/**
 * Checks if a product with the same name and brand already exists.
 * @param {string} name - Product name.
 * @param {string} brand - Product brand.
 * @param {Array} products - List of existing products.
 * @param {number|null} excludeId - ID to exclude from check (for editing).
 * @returns {boolean} True if product exists, false otherwise.
 */
export function productExists(name, brand, products, excludeId = null) {
    return products.some(p =>
        p.name.toLowerCase() === name.toLowerCase() &&
        p.brand.toLowerCase() === brand.toLowerCase() &&
        p.id !== excludeId
    );
}

/**
 * Validates BCV rate.
 * @param {number} rate - The exchange rate.
 * @returns {boolean} True if valid.
 */
export function validateExchangeRate(rate) {
    return !isNaN(rate) && rate > 0;
}
