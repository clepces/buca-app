// ======================================================
// ARCHIVO: src/components/Footer.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: Leer el nombre de la tienda desde 'appConfig'
//             (Anotación U-2)
// ======================================================

/**
 * Renderiza el pie de página de la aplicación.
 * @param {object} state - El estado de la aplicación para obtener datos dinámicos.
 * @returns {string} El string de HTML para el footer.
 */
export function Footer(state) {
    const year = new Date().getFullYear();
    
    // --- ¡INICIO DE CORRECCIÓN! ---
    const appConfig = state.settings.appConfig;
    const storeName = appConfig?.system?.metadata?.appNameSimplify || // "B.U.C.A"
                      state.settings.store.store_name || // Fallback
                      'Tu Tienda';
    // --- FIN DE CORRECCIÓN! ---

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