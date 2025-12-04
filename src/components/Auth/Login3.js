// ======================================================
// ARCHIVO: src/components/Auth/Login3.js
// VERSIÓN: 3.5 (Logo SVG Externo + Estructura corregida)
// ======================================================
import { login } from '../../services/auth.service.js';
import { delay } from '../../utils/retardo.js';

export function LoginComponent(state) {
    const element = document.createElement('div');
    element.className = 'login-container';

    const storeName = state.settings.store.store_name || 'B.U.C.A';
    const storeDescription = state.settings.store.store_description || 'Sistema de Gestión Empresarial';
    const appVersion = 'v3.0.0';

    element.innerHTML = `
        <div class="login-background">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
        </div>

        <div class="login-card">
            
            <div class="login-header">
                <div class="logo-container">
                    <div class="logo-circle">
                        <!-- Light Mode Logo (Dark Icon) -->
                        <img src="/assets/icons/logo-dark.svg" class="logo-img logo-light-mode" alt="Logo" />
                        <!-- Dark Mode Logo (Light Icon) -->
                        <img src="/assets/icons/logo-light.svg" class="logo-img logo-dark-mode" alt="Logo" />
                    </div>
                </div>
                <h1 class="brand-title login-text-contrast">${storeName}</h1>
                <p class="brand-subtitle login-text-contrast">${storeDescription}</p>
            </div>

            <form id="login-form" class="login-form" autocomplete="off">
                
                <div class="form-group">
                    <label for="login-email" class="login-text-contrast">Correo Electrónico</label>
                    <div class="input-wrapper-login">
                        <i class="bi bi-envelope input-icon"></i>
                        <input 
                            type="email" 
                            id="login-email" 
                            class="form-control-login"
                            placeholder="usuario@empresa.com"
                            autocomplete="email"
                            required
                        >
                    </div>
                </div>

                <div class="form-group">
                    <label for="login-password" class="login-text-contrast">Contraseña</label>
                    <div class="input-wrapper-login">
                        <i class="bi bi-lock input-icon"></i>
                        <input 
                            type="password" 
                            id="login-password" 
                            class="form-control-login"
                            placeholder="••••••••••"
                            autocomplete="current-password"
                            required
                        >
                        <button type="button" class="toggle-password-btn" tabindex="-1" title="Mostrar/Ocultar">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </div>

                <div class="form-options">
                    <label class="custom-checkbox">
                        <input type="checkbox" id="remember-me">
                        <span class="checkmark"></span>
                        <span class="label-text login-text-contrast">Recordarme</span>
                    </label>
                    <a href="#" class="link-forgot">Recuperar clave</a>
                </div>

                <button type="submit" id="btn-login-submit" class="btn-login-primary">
                    <span class="btn-text">Iniciar Sesión</span>
                    <div class="btn-loader d-none">
                        <div class="spinner-border-sm"></div>
                    </div>
                </button>

            </form>

            <div class="login-footer login-text-contrast">
                <span>${appVersion}</span>
                <span class="separator">•</span>
                <a href="#" class="login-text-contrast">Ayuda</a>
                <span class="separator">•</span>
                <a href="#" class="login-text-contrast">Privacidad</a>
            </div>
        </div>
    `;

    // --- LÓGICA DE INTERACCIÓN ---
    const form = element.querySelector('#login-form');
    const submitButton = element.querySelector('#btn-login-submit');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoader = submitButton.querySelector('.btn-loader');
    const toggleBtn = element.querySelector('.toggle-password-btn');
    const passInput = element.querySelector('#login-password');

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passInput.setAttribute('type', type);
        const icon = toggleBtn.querySelector('i');
        icon.className = type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
        passInput.focus();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitButton.disabled = true;
        btnText.style.display = 'none';
        btnLoader.classList.remove('d-none');

        const email = element.querySelector('#login-email').value;
        const password = element.querySelector('#login-password').value;

        try {
            await delay(1000);
            const result = await login(email, password);

            if (result.success) {
                submitButton.classList.add('success');
                btnLoader.innerHTML = '<i class="bi bi-check-lg fs-5"></i>';
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            submitButton.classList.add('error', 'animate-shake');
            btnLoader.innerHTML = '<i class="bi bi-x-lg fs-5"></i>';
            await delay(500);
            submitButton.classList.remove('animate-shake');
            await delay(1500);
            submitButton.disabled = false;
            submitButton.classList.remove('error');
            btnLoader.classList.add('d-none');
            btnLoader.innerHTML = '<div class="spinner-border-sm"></div>';
            btnText.style.display = 'block';
        }
    });

    return element;
}