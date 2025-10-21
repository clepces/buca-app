// src/components/Login.js

import { login } from '../services/auth.service.js';
import { showToast } from '../services/toast.service.js';
import { delay } from '../utils/retardo.js';

// Se elimina el parámetro 'onLoginSuccess' que ya no se usa.
export function LoginComponent(state) {
    const element = document.createElement('div');
    element.className = 'login-container';
    const storeName = state.settings.store.store_name || 'B.U.C.A';
    const storeDescription = state.settings.store.store_description || 'Inicia sesión para continuar';

    element.innerHTML = `
        <div class="login-card">
            <div class="login-header">
                <div class="login-brand-icon"><i class="fas fa-fire"></i></div>
                <h2 id="login-store-name">${storeName}</h2><p>${storeDescription}</p>
            </div>
            <form id="login-form" class="login-form">
                <div class="form-group">
                    <label for="login-username">Usuario</label>
                    <div class="input-wrapper">
                        <i class="fas fa-user input-icon"></i>
                        <input type="text" id="login-username" name="username" placeholder="Tu usuario" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="login-password">Contraseña</label>
                    <div class="input-wrapper">
                        <i class="fas fa-key input-icon"></i>
                        <input type="password" id="login-password" name="password" placeholder="••••••••••" required>
                    </div>
                </div>
                <button type="submit" id="btn-login-submit" class="btn-login">
                    <i class="fas fa-sign-in-alt"></i><span>Acceder</span>
                </button>
            </form>
        </div>
    `;

    const form = element.querySelector('#login-form');
    const submitButton = element.querySelector('#btn-login-submit');
    const buttonIcon = submitButton.querySelector('i');
    const buttonText = submitButton.querySelector('span');

    async function setButtonText(text, iconClass = null, addClass = null) {
        buttonText.classList.add('fade-out');
        await delay(150);
        buttonText.textContent = text;
        if(iconClass) buttonIcon.className = iconClass;
        if(addClass) submitButton.className = `btn-login ${addClass}`;
        buttonText.classList.remove('fade-out');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Estado "Accediendo..."
        submitButton.disabled = true;
        submitButton.className = 'btn-login';
        await setButtonText('Accediendo...', 'fas fa-spinner animate-spin');

        const username = element.querySelector('#login-username').value;
        const password = element.querySelector('#login-password').value;
        const result = await login(username, password);

        if (result.success) {
            await setButtonText('Acceso Válido', 'fas fa-check-circle', 'success');
            await delay(1000);
            await setButtonText('¡Bienvenido!', 'fas fa-door-open', 'welcome');
        } else {
            await setButtonText(result.message, 'fas fa-exclamation-triangle', 'error');
            await delay(2500);
            submitButton.disabled = false;
            await setButtonText('Acceder', 'fas fa-sign-in-alt');
        }

    });

    return element;
}