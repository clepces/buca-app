// ======================================================
// ARCHIVO: src/components/PaginationControls.js
// VERSIÓN CORREGIDA: Oculta botones si totalPages <= 1
// ======================================================
/**
 * Renderiza los controles de paginación para una tabla.
 * @param {object} props
 * @param {number} props.currentPage - La página actual.
 * @param {number} props.totalPages - El número total de páginas.
 * @param {number} props.totalItems - El número total de ítems.
 * @param {number} props.itemsPerPage - Ítems por página seleccionados.
 * @param {Array<number>} [props.itemsPerPageOptions=[10, 25, 50]] - Opciones para el dropdown.
 * @returns {string} El string de HTML para la paginación.
 */
export function PaginationControls({ 
    currentPage, 
    totalPages, 
    totalItems, 
    itemsPerPage, 
    itemsPerPageOptions = [10, 25, 50] 
}) {

    // Calcular el rango de ítems mostrados
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
    const showingText = totalItems > 0 ? `Mostrando ${startIndex}-${endIndex} de ${totalItems}` : 'No hay entradas';

    // --- Helper para renderizar los botones de página ---
    function renderPageNumbers() {
        let pagesHTML = '';
        // Lógica simple para mostrar 3 páginas (como en la imagen)
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPages, currentPage + 1);

        if (currentPage === 1 && totalPages > 2) {
            end = 3;
        }
        if (currentPage === totalPages && totalPages > 2) {
            start = totalPages - 2;
        }

        for (let i = start; i <= end; i++) {
            pagesHTML += `
                <button class="btn-page ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }
        return pagesHTML;
    }

    // --- INICIO DE NUEVA LÓGICA ---
    // Renderiza los botones de control solo si hay más de una página
    const paginationControlsHTML = totalPages > 1 ? `
        <button class="btn-icon" id="btn-prev-page" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="bi bi-chevron-left"></i>
        </button>
        <span class="pagination-pages">
            ${renderPageNumbers()}
        </span>
        <button class="btn-icon" id="btn-next-page" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="bi bi-chevron-right"></i>
        </button>
    ` : ''; // Si no, devuelve un string vacío
    // --- FIN DE NUEVA LÓGICA ---

    return `
        <div class="pagination-info">
            <span>Row Per Page:</span>
            <select id="items-per-page" class="form-control" style="width: 70px;">
                ${itemsPerPageOptions.map(option => `
                    <option value="${option}" ${option === itemsPerPage ? 'selected' : ''}>
                        ${option}
                    </option>
                `).join('')}
            </select>
            <span>${showingText}</span>
        </div>
        <div class="pagination-controls">
            ${paginationControlsHTML} 
        </div>
    `;
}