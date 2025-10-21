// src/main.js
import { handleError } from './services/error.service.js';

// Captura cualquier error que no hayamos manejado
window.onerror = (message, source, lineno, colno, error) => {
    // Usamos nuestro handleError
    handleError(error || new Error(message), `global(${source}:${lineno}:${colno})`);
    return true; // Previene que el error se muestre en la consola por defecto
};
window.onunhandledrejection = (event) => {
    // Usamos nuestro handleError
    handleError(event.reason || new Error('Unhandled promise rejection'), 'global-promise');
    event.preventDefault(); // Previene mensajes de error adicionales en consola
};
// ------------------------------------

import App from './App.js';
import { LoaderComponent } from './components/Loader.js';
import { initializeStorage, loadState } from './services/storage.service.js';
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "firebase/auth";
import { Logger } from './services/logger.service.js'; // Usamos Logger para mensajes internos de main
import { delay } from './utils/retardo.js';
import { state } from './store/state.js'; // Importamos el estado global

const rootElement = document.querySelector('#app');

async function main() {
    const loader = LoaderComponent();
    rootElement.innerHTML = '';
    rootElement.appendChild(loader.element);
    let appInstance = null;

    try {
        loader.updateMessage('Inicializando almacenamiento...');
        // Inicializa el storage (ej. 'firebase' o 'indexedDB')
        // Puedes cambiar 'firebase' por state.settings?.storageProvider si lo cargas antes
        await initializeStorage('firebase');
        Logger.info('Almacenamiento inicializado.');

        loader.updateMessage('Cargando estado inicial...');
        // Carga el estado base (puede incluir configuraciones guardadas)
        const initialState = await loadState();

        // Sobrescribimos el estado global inicial con lo cargado
        Object.assign(state, initialState);
        Logger.info('Estado inicial cargado.');
        await delay(500); // Pequeña pausa visual

        // Listener de autenticación: se dispara al cargar y cada vez que cambia el estado de auth
        onAuthStateChanged(auth, async (user) => {
            Logger.info(`onAuthStateChanged: user = ${user ? user.uid : 'null'}`);
            // Si la instancia de App no existe, la creamos la primera vez
            if (!appInstance) {
                // Pasamos el estado global (que ya fue cargado/inicializado)
                appInstance = new App(rootElement, initialState, loader);
                window.app = appInstance; // Hacemos la app global (útil para depurar)
            }
            // Pasamos el control a la instancia de la App para manejar el estado de auth
            appInstance.handleAuthStateChange(user);
        });
    } catch (error) {
        Logger.error('Error Crítico durante el arranque de la aplicación:', error);
        // Si falla el arranque inicial, mostramos un error grave
        // Usamos nuestro handleError aquí también
        handleError(error, 'main.js:init');
        // Opcionalmente, mostrar un mensaje en la UI
        rootElement.innerHTML = `<div class="error-message">Error fatal al iniciar la aplicación.</div>`;
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