// ======================================================
// ARCHIVO: src/components/Loader.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.6 - FILE: 1.4.0
// CORRECCIÓN: (TypeError) Se añade la función 'hide()' que
//             faltaba y que 'App.js' necesita para funcionar.
// ======================================================

export function LoaderComponent() {
    const loaderElement = document.createElement('div');
    loaderElement.className = 'app-loader';
    
    loaderElement.innerHTML = `
        <div class="loader-content">
            <div class="buca-logo-animation">
                <svg viewBox="0 0 640 640" class="logo-svg">
                    <use href="/assets/icons/logo-buca.svg#fire-path" class="logo-fire"/>
                </svg>
                <div class="logo-text">
                    <span class="char" style="--i:1;">B</span>
                    <span class="char" style="--i:2;">.</span>
                    <span class="char" style="--i:3;">U</span>
                    <span class="char" style="--i:4;">.</span>
                    <span class="char" style="--i:5;">C</span>
                    <span class="char" style="--i:6;">.</span>
                    <span class="char" style="--i:7;">A</span>
                </div>
            </div>
            <p id="loader-message" class="loader-message-text">Cargando...</p>
        </div>
    `;

    return {
        element: loaderElement,
        updateMessage: function(message) {
            const textElement = this.element.querySelector('#loader-message');
            if (textElement) {
                textElement.textContent = message;
            }
        },
        showError: function(message) {
            this.updateMessage(message);
            const logoWrapper = this.element.querySelector('.buca-logo-animation');
            if (logoWrapper) {
                logoWrapper.innerHTML = '<i class="fas fa-exclamation-triangle" style="font-size: 8rem; color: var(--error-color);"></i>';
            }
        },
        // --- INICIO DE LA CORRECCIÓN ---
        // Se añade la función 'hide' que faltaba.
        hide: function() {
            if (loaderElement) {
                loaderElement.style.transition = 'opacity 0.3s ease-out';
                loaderElement.style.opacity = '0';
                setTimeout(() => {
                    loaderElement.remove();
                }, 300);
            }
        }
        // --- FIN DE LA CORRECCIÓN ---
    };
}