// ======================================================
// ARCHIVO: src/components/ProductTable.js
// ======================================================
import { EmptyState } from './EmptyState.js'; // <-- Importamos el nuevo componente

/**
 * Renderiza la tabla que muestra la lista de productos.
 * @param {Array<object>} products - La lista de productos del estado.
 * @param {object} settings - La configuración de la app para obtener el símbolo de la moneda.
 * @returns {string} El string de HTML para la tabla.
 */
export function ProductTable(products, settings) {
    const simboloPrincipal = settings.currencies.principal.symbol;

    // Si no hay productos, mostramos un mensaje amigable.
    if (!products || products.length === 0) {
        return EmptyState({
            icon: 'fa-box-open',
            message: 'Aún no hay productos registrados'
        });
    }

    // Si hay productos, construimos la tabla.
    return `
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio Mayor (${simboloPrincipal})</th>
                    <th>Precio Unitario (${simboloPrincipal})</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr data-product-id="${product.id}"> 
                        <td data-label="Producto">${product.product_info.product_name}</td>
                        <td data-label="Categoría">${product.product_info.product_category}</td>
                        <td data-label="Precio Mayor">${simboloPrincipal}${product.product_price.venta_paquete.toFixed(2)}</td>
                        <td data-label="Precio Unitario">${simboloPrincipal}${product.product_price.venta_unidad.toFixed(2)}</td>
                        <td data-label="Acciones" class="actions">
                            <div class="list-actions">
                                <button class="btn-icon" data-action="abastecer" title="Abastecer Inventario"><i class="fas fa-plus-circle"></i></button>
                                <button class="btn-icon" data-action="editar" title="Editar Producto"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon danger" data-action="eliminar" title="Eliminar Producto"><i class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}