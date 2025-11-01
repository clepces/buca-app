// ======================================================
// ARCHIVO: src/components/ProductTable.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: Refactorizado para leer la nueva estructura de datos,
//             usar Bootstrap Icons y verificar permisos.
// ======================================================

import { EmptyState } from './EmptyState.js';
// --- ¡IMPORTACIONES AÑADIDAS! ---
import { can } from '../services/permissions.service.js';
import { PERMISSIONS } from '../services/roles.config.js';

/**
 * Renderiza la tabla que muestra la lista de productos.
 * @param {Array<object>} products - La lista de productos del estado.
 * @param {object} settings - La configuración de la app para obtener el símbolo de la moneda.
 * @returns {string} El string de HTML para la tabla.
 */
export function ProductTable(products, settings) {
    const simboloPrincipal = settings.currencies.principal.symbol;

    if (!products || products.length === 0) {
        return EmptyState({
            icon: 'bi-box-open', // <-- Icono actualizado
            message: 'Aún no hay productos registrados'
        });
    }

    // Permisos para los botones
    const canEdit = can(PERMISSIONS.EDIT_PRODUCT);
    const canDelete = can(PERMISSIONS.DELETE_PRODUCT);

    return `
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio Paquete (${simboloPrincipal})</th>
                    <th>Precio Unitario (${simboloPrincipal})</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => {
                    // --- ¡INICIO DE CORRECCIÓN! Usamos la NUEVA estructura ---
                    const productName = product.name || 'N/A';
                    const categoryDisplay = product.categoryId || 'N/A';
                    const packagePrice = product.pricing?.packageSellPrice?.toFixed(2) || '0.00';
                    const unitPrice = product.pricing?.unitSellPrice?.toFixed(2) || '0.00';
                    const productId = product.id;
                    // --- FIN DE CORRECCIÓN ---

                    return `
                    <tr data-product-id="${productId}">
                        <td data-label="Producto">${productName}</td>
                        <td data-label="Categoría">${categoryDisplay}</td>
                        <td data-label="Precio Paquete">${simboloPrincipal}${packagePrice}</td>
                        <td data-label="Precio Unitario">${simboloPrincipal}${unitPrice}</td>
                        <td data-label="Acciones" class="actions">
                            <div class="list-actions">
                                <button class="btn-icon btn-icon-sm" data-action="abastecer" title="Abastecer Inventario (Próx.)">
                                    <i class="bi bi-plus-circle-fill"></i>
                                </button>
                                ${canEdit ? `
                                <button class="btn-icon btn-icon-sm" data-action="editar" title="Editar Producto">
                                    <i class="bi bi-pencil-square"></i>
                                </button>` : ''}
                                ${canDelete ? `
                                <button class="btn-icon btn-icon-sm danger" data-action="eliminar" title="Eliminar Producto">
                                    <i class="bi bi-trash3-fill"></i>
                                </button>` : ''}
                            </div>
                        </td>
                    </tr>
                `}).join('')}
            </tbody>
        </table>
    `;
}