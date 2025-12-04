// src/components/Auth/Login.js
export function LoginComponent(state) {
    const element = document.createElement('div');
    element.className = 'login-container';
    const storeName = state.settings.store.store_name || 'B.U.C.A';
    const storeDescription = state.settings.store.store_description || 'Inicia sesión para continuar';

    element.innerHTML = `
        <div class="login-card">
            <div class="login-header">
                <!-- 🔥 USO DEL NUEVO LOGO SVG -->
                <div class="login-brand-icon">
                    <svg viewBox="0 0 640 640" class="logo-svg-login">
                        <use href="/assets/icons/logo-buca.svg#fire-path" class="logo-fire"/>
                    </svg>
                </div>
                <h2 id="login-store-name">${storeName}</h2>
                <p id="login-store-description">${storeDescription}</p>
            </div>
            <form id="login-form" class="login-form">
                <div class="form-group">
                    <label for="login-email">Correo Electrónico</label>
                    <div class="input-wrapper">
                        <i class="fas fa-envelope input-icon"></i>
                        <input type="email" id="login-email" name="email" 
                               placeholder="tu@email.com" 
                               autocomplete="email"
                               required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="login-password">Contraseña</label>
                    <div class="input-wrapper">
                        <i class="fas fa-key input-icon"></i>
                        <input type="password" id="login-password" name="password" 
                               placeholder="••••••••••" 
                               autocomplete="current-password"
                               required>
                    </div>
                </div>
                <button type="submit" id="btn-login-submit" class="btn-login">
                    <i class="fas fa-sign-in-alt"></i>
                    <span>Acceder</span>
                </button>
            </form>
        </div>
    `;

    // Lógica de login (sin cambios, solo mejora en feedback)
    const form = element.querySelector('#login-form');
    const submitButton = element.querySelector('#btn-login-submit');
    const buttonIcon = submitButton.querySelector('i');
    const buttonText = submitButton.querySelector('span');

    async function setButtonState(text, iconClass, variantClass) {
        buttonText.classList.add('fade-out');
        await delay(150);
        buttonText.textContent = text;
        buttonIcon.className = iconClass;
        submitButton.className = `btn-login ${variantClass}`;
        buttonText.classList.remove('fade-out');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitButton.disabled = true;
        await setButtonState('Verificando...', 'fas fa-spinner animate-spin', 'loading');

        const email = element.querySelector('#login-email').value;
        const password = element.querySelector('#login-password').value;
        const result = await login(email, password);

        if (result.success) {
            await setButtonState('¡Acceso Válido!', 'fas fa-check-circle', 'success');
            await delay(800);
            await setButtonState('Cargando Dashboard...', 'fas fa-door-open', 'welcome');
        } else {
            await setButtonState('Credenciales Inválidas', 'fas fa-exclamation-triangle', 'error');
            await delay(2500);
            submitButton.disabled = false;
            await setButtonState('Acceder', 'fas fa-sign-in-alt', '');
        }
    });

    return element;
}