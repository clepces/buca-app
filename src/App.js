// ARCHIVO CORREGIDO Y FINAL: src/App.js

import { registerRerender } from './store/actions.js';
import { logout, tracedLoadUserData } from './services/auth.service.js';
import { loadBusinessData } from './services/storage.service.js';
import { initRouter } from './router/index.js';
import { Logger } from './services/logger.service.js';
import { LoginView } from './views/LoginView.js';
import { Header } from './components/Header.js';
import { MainNav } from './components/MainNav.js';
import { Footer } from './components/Footer.js';
import { LoaderComponent } from './components/Loader.js';
import { delay } from './utils/retardo.js';
import { can } from './services/permissions.service.js';
import { PERMISSIONS } from './services/roles.config.js';
import { routes } from './router/routes.js';

export default class App {

    constructor(rootElement, initialState, mainLoader) {
        this.root = rootElement;
        this.state = initialState;
        this.mainLoader = mainLoader; // Guardamos la referencia al loader inicial
        this.currentViewCleanup = () => { };
        this.boundHandleGlobalActions = this.handleGlobalActions.bind(this);
        this.isLoggingOut = false;
        this.hasGlobalListener = false; // Track si el listener global está activo
        Logger.info('App: Instancia creada.');
        registerRerender(this.render.bind(this));
    }

    async handleAuthStateChange(user) {
        if (user) {
            await delay(1500); // Espera a que termine la animación del botón "Bienvenido"
            this.mainLoader.updateMessage('Verificando credenciales...');
            if (!this.root.contains(this.mainLoader.element)) { this.root.innerHTML = ''; this.root.appendChild(this.mainLoader.element); }
            const sessionData = await tracedLoadUserData(user);
            if (sessionData) {
                this.state.session.isLoggedIn = true;
                this.state.session.user = sessionData.user;
                this.state.session.business = sessionData.business;
                if (sessionData.business.id === 'admin_view') {
                    // --- FLUJO PARA EL SUPER ADMIN ---
                    this.mainLoader.updateMessage('Bienvenido, Administrador');
                    this.state.products = []; // El admin no tiene productos.
                } else {
                    // --- FLUJO PARA CLIENTES NORMALES ---
                    this.mainLoader.updateMessage('Cargando datos del negocio...');
                    try {
                        const businessData = await loadBusinessData(this.state);
                        this.state.products = businessData.products || [];
                    } catch (error) {
                        Logger.error('Error cargando datos del negocio:', error);
                        this.state.products = [];
                        // Continuar con la aplicación aunque falle la carga de productos
                    }
                }
                await delay(1500);
                this.bootAuthenticatedApp();
            }
        } else {
            if (this.isLoggingOut) {
                const loaderContainer = this.root.querySelector('.app-loader');
                if (loaderContainer) {
                    const loaderUI = {
                        updateMessage: (msg) => {
                            loaderContainer.querySelector('#loader-message').textContent = msg;
                        }
                    };
                    loaderUI.updateMessage('¡Hasta pronto!');
                    await delay(2500);
                }
                this.isLoggingOut = false;
            }
            this.showLogin();
        }
    }

    async handleLogoutSequence() {
        if (this.isLoggingOut) return;
        Logger.info('Iniciando secuencia de cierre de sesión...');
        this.isLoggingOut = true;
        const appLayout = this.root.querySelector('#app-layout');
        if (appLayout) {
            appLayout.classList.add('is-logging-out');
            await delay(500);
        }

        const loader = LoaderComponent();
        this.root.innerHTML = '';
        this.root.appendChild(loader.element);
        loader.updateMessage('Cerrando sesión de forma segura...');
        await delay(2500);
        await logout(); // Esto disparará el handleAuthStateChange
    }

    handleGlobalActions(e) {
        const actionElement = e.target.closest('[data-action]');
        if (!actionElement) return;

        const action = actionElement.dataset.action;
        if (action === 'logout') {
            this.handleLogoutSequence();
        } else {
            const dropdown = document.getElementById('actions-menu-dropdown');
            if (action !== 'toggle-actions-menu' && dropdown?.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
            switch (action) {
                case 'open-config': Logger.info('Abrir configuración...'); break;
                case 'toggle-actions-menu': dropdown?.classList.toggle('show'); break;
                case 'toggle-theme': this.toggleTheme(); break;
            }
        }
    }

    renderLayout() {
        const currentPath = window.location.hash || '#/';
        this.root.innerHTML = `
            <div id="app-layout">
                ${Header(this.state)}
                <main class="main-content">
                    ${MainNav(currentPath, this.state)}
                    <div class="container view-container" id="view-container"></div>
                </main>
                ${Footer(this.state)}
            </div>
        `;
    }

    render() {
        const currentPath = window.location.hash || '#/';
        this.renderLayout();
        this.handleNavigation(currentPath);
    }

    bootAuthenticatedApp() {
        Logger.info('App: arrancando aplicación autenticada.');
        if (!this.hasGlobalListener) {
            document.body.addEventListener('click', this.boundHandleGlobalActions, true);
            this.hasGlobalListener = true;
        }

        // --- LÓGICA DE REDIRECCIÓN MEJORADA ---
        // Buscamos la primera ruta en nuestra nueva configuración a la que el usuario tiene acceso.
        const defaultRoute = routes.find(route => can(route.permission));
        
        if (defaultRoute && window.location.hash !== defaultRoute.path) {
            Logger.info(`Redirigiendo al usuario a su vista por defecto: ${defaultRoute.path}`);
            window.location.hash = defaultRoute.path;
        }

        this.renderLayout();
        initRouter(this.handleNavigation.bind(this));
    }

    async handleNavigation(path) {
        const viewContainer = document.getElementById('view-container');
        if (!viewContainer) return;
        if (typeof this.currentViewCleanup === 'function') this.currentViewCleanup();
        
        // --- ¡AQUÍ ESTÁ EL GUARDIA DE SEGURIDAD! ---
        const route = routes.find(r => r.path === path) || routes.find(r => r.path === '#/');

        if (!can(route.permission)) {
            Logger.warn(`Acceso denegado a la ruta: ${path}. Redirigiendo al panel.`);
            window.location.hash = '#/'; // Lo enviamos a la página de inicio segura
            return;
        }
        // --- FIN DEL GUARDIA ---

        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('href') === path);
        });
        viewContainer.classList.add('fade-out');
        await delay(150);

        // Cargamos el componente de forma segura
        const ViewComponent = await route.component();
        this.currentViewCleanup = ViewComponent(viewContainer, this.state);
        
        viewContainer.classList.remove('fade-out');
    }

    showLogin() {
        if (typeof this.currentViewCleanup === 'function') this.currentViewCleanup();
        // Solo remover listener si existe
        if (this.hasGlobalListener) {
            document.body.removeEventListener('click', this.boundHandleGlobalActions, true);
            this.hasGlobalListener = false;
        }
        this.root.innerHTML = '';
        LoginView(this.root, this.state);
    }

    toggleTheme() {
        const newTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-bs-theme', newTheme);
    }
}