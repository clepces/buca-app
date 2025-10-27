// ARCHIVO CORREGIDO: src/components/Loader.js

export function LoaderComponent() {
    const loaderElement = document.createElement('div');
    loaderElement.className = 'app-loader';
    
    loaderElement.innerHTML = `
        <div class="loader-content">
            <div class="buca-logo-animation">
                <svg viewBox="0 0 640 640" class="logo-svg">
                    <use href="/icons/logo-buca.svg#fire-path" class="logo-fire"/>
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
            // ... (el resto de la función se mantiene igual)
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
        }
    };
}