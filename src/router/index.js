// ======================================================
// ARCHIVO: src/router/index.js
// ======================================================

let onNavigateCallback;

/**
 * Resuelve la ruta actual (del hash de la URL) y llama al callback.
 */
function resolveRoute() {
    const path = window.location.hash || '#/';
    if (onNavigateCallback) {
        onNavigateCallback(path);
    }
}

/**
 * Inicializa el router.
 * @param {function} onNavigate - La función a la que se llamará cuando la ruta cambie.
 */
export function initRouter(onNavigate) {
    onNavigateCallback = onNavigate;

    // Escucha los clics en los enlaces de navegación
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a[data-route]');
        if (link) {
            e.preventDefault(); // Prevenimos la recarga de la página
            const newPath = link.dataset.route;
            if (window.location.hash !== newPath) {
                window.location.hash = newPath;
            }
        }
    });

    // Escucha los cambios en el hash (ej. botones de atrás/adelante del navegador)
    window.addEventListener('hashchange', resolveRoute);

    // Resuelve la ruta inicial al cargar la página
    resolveRoute();
}