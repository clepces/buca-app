// ==========================================================================
// 1. MANEJADOR GLOBAL DE ERRORES CRÍTICOS
// ==========================================================================
// Se mantiene igual, es perfecto para errores de ejecución.
export const handleError = (message, source = 'N/A', lineno = 'N/A') => { 
    document.querySelector('.app-loader')?.remove(); 
    document.body.innerHTML = ''; 
    const errorOverlay = document.createElement('div');
    errorOverlay.className = 'critical-error-overlay';
    errorOverlay.innerHTML = `
        <i class="fas fa-bomb critical-error-icon"></i>
        <h2 class="critical-error-title">¡Ups! Algo salió muy mal</h2>
        <p class="critical-error-message">
            La aplicación ha encontrado un error crítico y no puede continuar. 
            Esto puede deberse a un problema de red o un error en el código.
        </p><div class="critical-error-details">
        <strong>Error:</strong> ${message}<br>
        <strong>Ubicación:</strong> ${source.split('/').pop()} (Línea: ${lineno})
    </div>`;
    document.body.appendChild(errorOverlay);
};
