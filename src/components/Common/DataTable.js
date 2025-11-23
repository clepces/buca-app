// ======================================================
// ARCHIVO: src/components/Common/DataTable.js
// PROPÓSITO: Tabla genérica reutilizable.
// ======================================================
import { EmptyState } from './EmptyState.js';

export function DataTable({ columns, data, onRenderRow }) {
    
    if (!data || data.length === 0) {
        return EmptyState({
            icon: 'bi-table',
            message: 'No hay datos para mostrar.'
        });
    }

    // Renderizar cabeceras
    const headers = columns.map(col => `<th>${col.header}</th>`).join('');

    // Renderizar filas
    const rows = data.map(item => {
        // Si se pasa una función personalizada para renderizar la fila completa
        if (onRenderRow) return onRenderRow(item);

        // Renderizado automático basado en columnas
        const cells = columns.map(col => {
            let content = 'N/A';
            
            // Si hay una función de renderizado específica para la celda
            if (col.render) {
                content = col.render(item);
            } else if (col.key) {
                // Acceso seguro a propiedades anidadas (ej. 'pricing.cost')
                content = col.key.split('.').reduce((obj, key) => obj?.[key], item) || '';
            }

            return `<td data-label="${col.header}">${content}</td>`;
        }).join('');

        return `<tr>${cells}</tr>`;
    }).join('');

    return `
        <div class="table-container-wrapper">
            <table>
                <thead>
                    <tr>${headers}</tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;
}