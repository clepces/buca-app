// ======================================================
// ARCHIVO: src/router/index.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.0 - FILE: 1.0.2
// CORRECCIÓN: (Bug 'onNavigate') Simplificado para aceptar
//             solo un callback y no manejar clics,
//             que ahora son responsabilidad de App.js.
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

    // Escucha los cambios en el hash (ej. botones de atrás/adelante del navegador)
    window.addEventListener('hashchange', resolveRoute);

    // Resuelve la ruta inicial al cargar la página
    resolveRoute();
}