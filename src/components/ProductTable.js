// src/components/ProductTable.js
import { EmptyState } from './EmptyState.js';

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
            icon: 'fa-box-open',
            message: 'Aún no hay productos registrados'
        });
    }

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
                    // --- ¡CAMBIOS AQUÍ! Usamos la nueva estructura ---
                    const productName = product.name || 'N/A';
                    // Asumimos que categoryId debe mapearse a un nombre de categoría en otro lugar
                    // Por ahora, mostraremos el ID o 'N/A'
                    const categoryDisplay = product.categoryId || 'N/A';
                    const packagePrice = product.pricing?.packageSellPrice?.toFixed(2) || '0.00';
                    const unitPrice = product.pricing?.unitSellPrice?.toFixed(2) || '0.00';
                    const productId = product.id; // El ID ahora está en la raíz
                    // --------------------------------------------------

                    return `
                    <tr data-product-id="${productId}">
                        <td data-label="Producto">${productName}</td>
                        <td data-label="Categoría">${categoryDisplay}</td>
                        <td data-label="Precio Paquete">${simboloPrincipal}${packagePrice}</td>
                        <td data-label="Precio Unitario">${simboloPrincipal}${unitPrice}</td>
                        <td data-label="Acciones" class="actions">
                            <div class="list-actions">
                                <button class="btn-icon" data-action="abastecer" title="Abastecer Inventario"><i class="fas fa-plus-circle"></i></button>
                                <button class="btn-icon" data-action="editar" title="Editar Producto"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon danger" data-action="eliminar" title="Eliminar Producto"><i class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                `}).join('')}
            </tbody>
        </table>
    `;
}