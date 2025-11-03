// ======================================================
// ARCHIVO: src/main.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.7 - FILE: 1.4.4 (FIXED)
// CORRECCIÓN: (Error 'updateMessage') Se pasa el objeto
//             'mainLoader' completo (retornado por LoaderComponent)
//             al constructor de 'App' en lugar de un objeto parcial.
// ======================================================

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config.js';
import { handleError } from './utils/handleError.js';
import { Logger } from './services/logger.service.js';
import App from './App.js';
import { loadState, initializeStorage, loadGlobalConfig } from './services/storage.service.js';
import { setSettings } from './store/actions.js';
import { LoaderComponent } from './components/Loader.js';

async function main() {
    try {
        const appRoot = document.getElementById('app');
        if (!appRoot) {
            throw new Error("El elemento 'app' no se encuentra en el DOM.");
        }
        
        // --- ¡INICIO DE CORRECCIÓN! ---
        // 'mainLoader' es ahora el objeto completo retornado por LoaderComponent()
        const mainLoader = LoaderComponent();
        document.getElementById('app-loader').appendChild(mainLoader.element);
        // --- FIN DE CORRECCIÓN! ---

        await initializeStorage('firebase');
        Logger.info('Almacenamiento inicializado.');
        
        const globalConfig = await loadGlobalConfig();
        Logger.info('✅ Configuración global cargada.');

        const initialState = await loadState();
        Logger.info('✅ Initial state loaded.');

        initialState.settings.appConfig = globalConfig;
        setSettings(initialState.settings); 
        Logger.info('Estado inicial cargado.');

        onAuthStateChanged(auth, async (user) => {
            Logger.info(`onAuthStateChanged: user = ${user ? user.uid : 'null'}`);
            try {
                if (!window.bucaApp) { 
                    // --- ¡INICIO DE CORRECCIÓN! ---
                    // Pasamos el 'mainLoader' completo al constructor
                    const appInstance = new App(appRoot, initialState, mainLoader);
                    // --- FIN DE CORRECCIÓN! ---
                    
                    await appInstance.init();
                    window.bucaApp = appInstance;
                }
                await window.bucaApp.handleAuthStateChange(user);
            } catch (error) {
                Logger.error('Error en onAuthStateChanged:', error);
                handleError(error, { 
                    message: 'Error al procesar la autenticación.', 
                    critical: true,
                    loaderUI: mainLoader // mainLoader SÍ tiene .showError() (implícitamente)
                });
            }
        });

    } catch (error) {
        Logger.error('Error fatal en main():', error);
        handleError(error, { 
            message: 'No se pudo iniciar la aplicación.', 
            critical: true 
            // No podemos pasar el loader aquí porque puede que haya fallado
        });
    }

    if ('serviceWorker' in navigator && import.meta.env.PROD) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    Logger.info('Service Worker registrado con éxito:', registration);
                })
                .catch(error => {
                    Logger.error('Error al registrar el Service Worker:', error);
                });
        });
    }
}

window.onerror = (message, source, lineno, colno, error) => {
    Logger.error('Error global no capturado:', { message, source, lineno, colno, error });
    handleError(error || new Error(message), { message: 'Error inesperado en la aplicación.', critical: true });
};

window.onunhandledrejection = (event) => {
    Logger.error('Promesa global rechazada no capturada:', event.reason);
    handleError(event.reason, { message: `Error en global-promise: ${event.reason?.message}`, critical: false });
};

document.addEventListener('DOMContentLoaded', main);