// ======================================================
// ARCHIVO: src/components/Footer.js
// ======================================================

/**
 * Renderiza el pie de página de la aplicación.
 * @param {object} state - El estado de la aplicación para obtener datos dinámicos.
 * @returns {string} El string de HTML para el footer.
 */
export function Footer(state) {
    const year = new Date().getFullYear();
    const storeName = state.settings.store.store_name || 'Tu Tienda';

    return `
        <footer class="footer">
            <div class="footer-content">
                <span>&copy;${year}</span>
                <a href="#">${storeName}</a>
                <span>. Todos los derechos reservados.</span>
            </div>
        </footer>
    `;
}