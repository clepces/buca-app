// src/main.js
import { handleError } from './services/error.service.js';
window.onerror = (message, source, lineno, colno, error) => { handleError(error || new Error(message), `global(${source}:${lineno}:${colno})`); return true;};
window.onunhandledrejection = (event) => { handleError(event.reason || new Error('Unhandled promise rejection'), 'global-promise'); event.preventDefault();};

import App from './App.js';
import { LoaderComponent } from './components/Loader.js';
import { loadGlobalConfig, initializeStorage, loadState } from './services/storage.service.js';
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "firebase/auth";
import { Logger } from './services/logger.service.js';
import { delay } from './utils/retardo.js';
import { state } from './store/state.js';

const rootElement = document.querySelector('#app');

async function main() {
    const loader = LoaderComponent();
    rootElement.innerHTML = '';
    rootElement.appendChild(loader.element);
    let appInstance = null;

    try {
        loader.updateMessage('Inicializando almacenamiento...');
        await initializeStorage('firebase');
        Logger.info('Almacenamiento inicializado.');

        loader.updateMessage('Cargando configuración global...');
        const globalConfig = await loadGlobalConfig();

        loader.updateMessage('Cargando estado inicial...');
        const initialState = await loadState();

        initialState.settings.appConfig = globalConfig; 

        if (globalConfig?.system?.metadata) {
            initialState.settings.store.store_name = globalConfig.system.metadata.appNameSimplify || 'B.U.C.A';
            initialState.settings.store.store_description = globalConfig.system.metadata.appName || 'Business Under Control Access';
        }

        Object.assign(state, initialState);
        Logger.info('Estado inicial cargado.');
        await delay(500);

        onAuthStateChanged(auth, async (user) => {
            Logger.info(`onAuthStateChanged: user = ${user ? user.uid : 'null'}`);
            if (!appInstance) {
                appInstance = new App(rootElement, initialState, loader);
                window.app = appInstance;
            }
            appInstance.handleAuthStateChange(user);
        });
    } catch (error) {
        Logger.error('Error Crítico durante el arranque de la aplicación:', error);
        handleError(error, 'main.js:init');
        loader.showError('Error fatal al iniciar la aplicación.');
    } finally {
        // El loader se quita dentro de App.js cuando la app está lista o muestra el login
    }
}

// Inicia la aplicación
main();

// Registro del Service Worker (solo en producción)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => Logger.info('Service Worker registrado con éxito:', registration.scope))
            .catch(error => Logger.error('Fallo en el registro del Service Worker:', error));
    });
}