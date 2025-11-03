// ======================================================
// ARCHIVO: src/main.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.6 - FILE: 1.4.2 (DEBUG)
// CORRECCIÓN: Añadidos logs de depuración para rastrear el
//             error 'handleAuthStateChange is not a function'.
// ======================================================

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config.js';
import { handleError } from './utils/handleError.js';
import { Logger } from './services/logger.service.js';

// --- ¡INICIO DE DEPURACIÓN! ---
import App from './App.js';
console.log('[DEBUG_BUCA] 1. Importación de App.js:', App);
// --- FIN DE DEPURACIÓN ---

import { loadState, initializeStorage, loadGlobalConfig } from './services/storage.service.js';
import { setSettings } from './store/actions.js';
import { LoaderComponent } from './components/Loader.js';

async function main() {
    try {
        const appRoot = document.getElementById('app');
        if (!appRoot) {
            throw new Error("El elemento 'app' no se encuentra en el DOM.");
        }
        
        const loader = LoaderComponent();
        document.getElementById('app-loader').appendChild(loader.element);
        const mainLoader = {
            hide: loader.hide
        };

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
                if (!window.app) {
                    
                    // --- ¡INICIO DE DEPURACIÓN! ---
                    console.log('[DEBUG_BUCA] 2. window.app no existe. Creando nueva instancia de App...');
                    const appInstance = new App(appRoot, initialState, mainLoader);
                    
                    console.log('[DEBUG_BUCA] 3. Instancia de App creada:', appInstance);
                    console.log('[DEBUG_BUCA] 4. ¿appInstance.init existe?', typeof appInstance.init);
                    console.log('[DEBUG_BUCA] 5. ¿appInstance.handleAuthStateChange existe?', typeof appInstance.handleAuthStateChange);
                    // --- FIN DE DEPURACIÓN ---

                    await appInstance.init();
                    window.app = appInstance;
                    
                    // --- ¡INICIO DE DEPURACIÓN! ---
                    console.log('[DEBUG_BUCA] 6. window.app ha sido asignado:', window.app);
                    // --- FIN DE DEPURACIÓN ---
                }

                // --- ¡INICIO DE DEPURACIÓN! ---
                console.log('[DEBUG_BUCA] 7. A punto de llamar a window.app.handleAuthStateChange...');
                console.log('[DEBUG_BUCA] 8. Objeto window.app actual:', window.app);
                console.log('[DEBUG_BUCA] 9. ¿window.app.handleAuthStateChange existe?', typeof window.app.handleAuthStateChange);
                // --- FIN DE DEPURACIÓN ---

                await window.app.handleAuthStateChange(user); // Esta es la línea 55 (aprox.) que falla

            } catch (error) {
                Logger.error('Error en onAuthStateChanged:', error);
                
                // --- ¡INICIO DE DEPURACIÓN! ---
                console.error('[DEBUG_BUCA] 10. ERROR CAPTURADO DENTRO DE onAuthStateChanged:', error);
                // --- FIN DE DEPURACIÓN ---

                handleError(error, { 
                    message: 'Error al procesar la autenticación.', 
                    critical: true,
                    loaderUI: mainLoader
                });
            }
        });

    } catch (error) {
        Logger.error('Error fatal en main():', error);
        handleError(error, { 
            message: 'No se pudo iniciar la aplicación.', 
            critical: true 
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