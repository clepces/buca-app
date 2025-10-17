/// ARCHIVO FINAL Y CORREGIDO: src/main.js
import { handleError } from './utils/handleError.js';

window.onerror = (message, source, lineno) => { handleError(message, source, lineno); return true; };
window.onunhandledrejection = (event) => { handleError(event.reason.message || 'Error', event.reason.stack || 'N/A'); event.preventDefault(); };

import App from './App.js';
import { LoaderComponent } from './components/Loader.js';
import { initializeStorage, loadState } from './services/storage.service.js';
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "firebase/auth";
import { Logger } from './services/logger.service.js';
import { delay } from './utils/retardo.js';

const rootElement = document.querySelector('#app');

async function main() {
    const loader = LoaderComponent();
    rootElement.innerHTML = '';
    rootElement.appendChild(loader.element);
    let appInstance = null;

    try {
        loader.updateMessage('Inicializando...');
        await initializeStorage('firebase');
        const initialState = await loadState();
        await delay(1000); // Usando nuestra utilidad de retardo
        onAuthStateChanged(auth, async (user) => {
            if (!appInstance) {
                appInstance = new App(rootElement, initialState, loader);
                window.app = appInstance;
            }
            appInstance.handleAuthStateChange(user);
        });
    } catch (error) {
        Logger.error('Error Crítico durante el arranque:', error);
        throw error; 
    }
}

main();

if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => Logger.info('Service Worker registrado:', registration.scope))
            .catch(error => Logger.error('Fallo en el registro del SW:', error));
    });
}