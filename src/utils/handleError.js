// ==========================================================================
// ARCHIVO: src/utils/handleError.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.6 - FILE: 1.3.9
// CORRECCIÓN: (Error Fatal) La función ahora maneja 'context' (source)
//             cuando es un objeto (como en promesas rechazadas)
//             en lugar de solo un string, evitando el crash de '.split()'.
// ==========================================================================

export const handleError = (error, context = 'N/A', lineno = 'N/A') => { 
    document.querySelector('.app-loader')?.remove(); 
    document.body.innerHTML = ''; 
    const errorOverlay = document.createElement('div');
    errorOverlay.className = 'critical-error-overlay';

    // --- INICIO DE LA CORRECCIÓN ---
    // 'error' puede ser un string o un objeto Error.
    const message = error?.message || error || 'Error desconocido';
    
    // 'context' (antes 'source') puede ser un string o un objeto.
    let location = 'Ubicación desconocida';
    if (typeof context === 'string') {
        // Si 'context' es un string (de window.onerror), lo usamos.
        location = `${context.split('/').pop()} (Línea: ${lineno})`;
    } else if (typeof context === 'object' && context !== null && context.message) {
        // Si 'context' es un objeto (de main.js), usamos su 'message'.
        location = `Contexto: ${context.message}`;
    } else if (typeof context === 'object' && context !== null) {
        // Fallback si el objeto no tiene 'message'.
        location = 'Contexto: Objeto de error (sin mensaje)';
    }
    // --- FIN DE LA CORRECCIÓN ---

    errorOverlay.innerHTML = `
        <i class="fas fa-bomb critical-error-icon"></i>
        <h2 class="critical-error-title">¡Ups! Algo salió muy mal</h2>
        <p class="critical-error-message">
            La aplicación ha encontrado un error crítico y no puede continuar. 
            Esto puede deberse a un problema de red o un error en el código.
        </p><div class="critical-error-details">
        <strong>Error:</strong> ${message}<br>
        <strong>Ubicación:</strong> ${location}
    </div>`;
    document.body.appendChild(errorOverlay);
};