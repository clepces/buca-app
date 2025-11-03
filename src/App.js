// ======================================================
// ARCHIVO: src/App.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.6 - FILE: 1.4.0
// CORRECCIÓN: (Anotación J-2) 'bootAuthenticatedApp' lee el rol
//             desde 'state.session' en lugar de 'state.role'.
// CORRECCIÓN: (SyntaxError) Se añade 'async' a
//             'handleLogoutSequence' para permitir 'await'.
// ======================================================

import { state } from './store/state.js';
import { registerRerender, setUser } from './store/actions.js';
import { logout, tracedLoadUserData } from './services/auth.service.js';
import { loadBusinessData } from './services/storage.service.js';
import { initRouter } from './router/index.js';
import { Logger } from './services/logger.service.js';
import { LoginView } from './views/LoginView.js';
import { Header } from './components/Header.js';
import { MainNav } from './components/MainNav.js';
import { Footer } from './components/Footer.js';
import { LoaderComponent } from './components/Loader.js';
import { Toast } from './components/Toast.js';
import { delay } from './utils/retardo.js';
import { can } from './services/permissions.service.js';
import { PERMISSIONS } from './services/roles.config.js';
import { routes } from './router/routes.js';
import { MODULES } from './services/modules.config.js';

export default class App {

    constructor(rootElement, initialState, mainLoader) {
        this.root = rootElement;
        this.state = initialState;
        this.mainLoader = mainLoader;
        this.currentViewCleanup = () => {};
        this.boundHandleGlobalActions = this.handleGlobalActions.bind(this);
        this.isLoggingOut = false;
        this.hasGlobalListener = false;
        Logger.info('App: Instancia creada.');
        registerRerender(this.render.bind(this));
    }

    async init() {
        Logger.info('App: Inicializando...');
        registerRerender(this.rerender.bind(this));
    }

    async handleAuthStateChange(user) {
        if (user) {
            if (!this.root.contains(this.mainLoader.element)) {
                await delay(500);
                this.mainLoader.updateMessage('Verificando sesión...');
                this.root.innerHTML = '';
                this.root.appendChild(this.mainLoader.element);
            } else {
                this.mainLoader.updateMessage('Verificando credenciales...');
            }
            const sessionData = await tracedLoadUserData(user);
            if (sessionData) {
                setUser({
                    uid: sessionData.user.uid,
                    email: sessionData.user.email,
                    name: sessionData.user.name,
                    businessId: sessionData.business.id === 'admin_view' ? null : sessionData.business.id,
                    departmentId: sessionData.business.departmentId,
                    role: sessionData.user.role
                });
                if (state.session.business.id === 'admin_view') {
                    this.mainLoader.updateMessage('Bienvenido, Administrador');
                    state.products = [];
                } else {
                    this.mainLoader.updateMessage('Cargando datos del negocio...');
                    try {
                        const businessData = await loadBusinessData(state); 
                        state.products = (businessData && businessData.products) ? businessData.products : [];
                    } catch (error) {
                        Logger.error('Error cargando datos:', error);
                        state.products = [];
                    }
                }
                await delay(1500);
                this.bootAuthenticatedApp(sessionData);
            } else {
                Logger.warn('No se pudo cargar sesión. Mostrando login.');
                await logout(); 
            }
        } else {
            if (this.isLoggingOut) {
                const loaderContainer = this.root.querySelector('.app-loader');
                if (loaderContainer) {
                    const loaderUI = {
                        updateMessage: (msg) => {
                            const el = loaderContainer.querySelector('#loader-message');
                            if (el) el.textContent = msg;
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

    async bootAuthenticatedApp(sessionData) {
        Logger.info('App: arrancando aplicación autenticada.');
        this.mainLoader.hide();
        this.root.innerHTML = this.renderLayout();
        
        const canViewDashboard = can(PERMISSIONS.VIEW_DASHBOARD);
        
        // --- INICIO DE LA CORRECCIÓN 1 (Lógica J-2) ---
        // Se lee el rol desde 'sessionData' o 'state.session.user.role'
        // en lugar del obsoleto 'this.state.role' para arreglar el bug 'undefined'.
        const userRole = sessionData?.role || this.state.session?.user?.role;
        Logger.trace(`[App] bootAuthenticatedApp: Rol del usuario es ${userRole}`);
        // --- FIN DE LA CORRECCIÓN 1 ---

        const defaultRoute = '#/';
        let redirectTo = defaultRoute;

        if (!canViewDashboard) {
            Logger.warn('Usuario no tiene permiso para Dashboard. Buscando ruta alternativa...');
            
            if (userRole === 'cajero' && can(PERMISSIONS.VIEW_POS_MODULE)) {
                redirectTo = '#/pos';
            } else if (userRole === 'user' && can(PERMISSIONS.VIEW_INVENTORY_MODULE)) {
                redirectTo = '#/inventory';
            } else {
                Logger.error('Usuario sin permisos para dashboard ni para rutas alternativas. Mostrando error.');
                this.root.querySelector('#view-container').innerHTML = `<p>Error: No tienes permisos para ver ninguna página.</p>`;
                return;
            }
        }

        const currentHash = window.location.hash || '#/';
        if (currentHash !== redirectTo && redirectTo !== defaultRoute) {
            Logger.info(`Redirigiendo a la ruta por defecto del rol: ${redirectTo}`);
            window.location.hash = redirectTo;
        } else {
            Logger.info(`Usuario tiene permiso para Dashboard. Ruta por defecto: ${defaultRoute}`);
            if (currentHash === redirectTo) {
                Logger.info(`Ya estamos en la ruta correcta (${currentHash}). Renderizando layout e iniciando router.`);
            }
        }
        
        await delay(50);
        
        Logger.trace('ιχ Llamando a initRouter después de posible redirección.');
        initRouter(this.root.querySelector('#view-container'), this.state, this.handleNavigation.bind(this));

        if (!this.hasGlobalListener) {
            document.body.addEventListener('click', this.boundHandleGlobalActions, true);
            this.hasGlobalListener = true;
            Logger.info('Listener de acciones globales añadido.');
        }
    }

    // --- INICIO DE LA CORRECCIÓN 2 (Sintaxis) ---
    // Se añade 'async' para poder usar 'await' dentro de la función.
    async handleLogoutSequence(toastMessage = '¡Hasta pronto!') {
    // --- FIN DE LA CORRECCIÓN 2 ---
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
        await delay(1500);
        try {
            await logout();
        }
        catch (error) {
            Logger.error('Error durante logout:', error);
            this.isLoggingOut = false;
            this.showLogin();
        }
    }

    handleGlobalActions(e) {
        const actionElement = e.target.closest('[data-action]');
        if (!actionElement) return;
        const action = actionElement.dataset.action;
        const dropdown = document.getElementById('actions-menu-dropdown');
        if (action !== 'toggle-actions-menu' && dropdown?.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
        if (action === 'logout') {
            this.handleLogoutSequence();
        } else {
            switch (action) {
                case 'open-config':
                    Logger.info('Abrir config...');
                    break;
                case 'toggle-actions-menu':
                    dropdown?.classList.toggle('show');
                    break;
                case 'toggle-theme':
                    this.toggleTheme();
                    break;
                default:
                    Logger.warn(`Acción desconocida: ${action}`);
            }
        }
    }

    renderLayout() {
        const currentPath = window.location.hash || '#/';
        const mainNavHTML = MainNav(currentPath, state, state.ui.navContext);
        
        this.root.innerHTML = `
            <div class="page-wrapper"  id="app-layout" >
                ${Header(this.state)}
                <main class="content">
                    ${mainNavHTML}
                    <div class="container view-container" id="view-container"></div>
                </main>
                ${Footer(this.state)}
                ${Toast()}
            </div>
        `;
        if (this.state.session.isLoggedIn && !this.hasGlobalListener) {
            document.body.addEventListener('click', this.boundHandleGlobalActions, true);
            this.hasGlobalListener = true;
        }
    }

    render() {
        if (this.state.session.isLoggedIn) {
            const currentPath = window.location.hash || '#/';
            this.renderLayout();
            this.handleNavigation(currentPath);
        } else {
            this.showLogin();
        }
    }

    async handleNavigation(path) {
        const viewContainer = document.getElementById('view-container');
        if (!viewContainer) {
             Logger.error("Contenedor de vista no encontrado (#view-container).");
             return;
        }

        if (typeof this.currentViewCleanup === 'function') {
            try { this.currentViewCleanup(); }
            catch (e) { Logger.error('Error en cleanup de vista:', e); }
            this.currentViewCleanup = () => {};
        }

        const route = routes.find(r => r.path === path);
        const defaultRoute = routes.find(r => r.path === '#/');

        if (!route) {
             Logger.warn(`Ruta no encontrada: ${path}. Redirigiendo a Dashboard.`);
             window.location.hash = '#/';
             return;
        }

        if (!can(route.permission)) {
            Logger.warn(`Acceso denigado a: ${path}. Redirigiendo a ruta por defecto.`);
            const accessibleRoute = routes.find(r => r.isMainModule && can(r.permission)) || defaultRoute;
            window.location.hash = accessibleRoute.path;
            return;
        }

        const newNavContext = route?.context || MODULES.CORE;
        if (state.ui.navContext !== newNavContext) {
             state.ui.navContext = newNavContext;
             this.renderLayout();
             await delay(10);
        } else {
            document.querySelectorAll('.nav-button, .contextual-nav-button').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('href') === path);
            });
        }
        const updatedViewContainer = document.getElementById('view-container');
        if (!updatedViewContainer) {
             Logger.error("Contenedor de vista desaparecido después de renderLayout().");
             return;
        }


        updatedViewContainer.classList.add('fade-out');
        await delay(150);

        try {
            const ViewComponent = await route.component();
            this.currentViewCleanup = ViewComponent(updatedViewContainer, this.state);
        } catch (loadError) {
            Logger.error(`Error cargando componente para la vista ${path}:`, loadError);
            updatedViewContainer.innerHTML = `<p>Error al cargar la vista ${path}.</o>`;
            this.currentViewCleanup = () => {};
        } finally {
            updatedViewContainer.classList.remove('fade-out');
        }
    }

    showLogin() {
        Logger.info('Mostrando pantalla de login...');
        if (typeof this.currentViewCleanup === 'function') {
            try {
                this.currentViewCleanup();
            } catch (e) {
                Logger.error('Error cleanup (login):', e);
            }
            this.currentViewCleanup = () => {};
        }
        if (this.hasGlobalListener) {
            document.body.removeEventListener('click', this.boundHandleGlobalActions, true);
            this.hasGlobalListener = false;
            Logger.info('Listener global quitado.');
        }
        this.root.innerHTML = '';
        try {
            LoginView(this.root, this.state);
        } catch (renderError) {
            Logger.error('Error render Login:', renderError);
            this.root.innerHTML = 'Error crítico login.';
        }
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-bs-theme', next);
        Logger.info(`Tema cambiado a: ${next}`);

        this.updateNavigation();
    }

    updateNavigation() {
        const currentPath = window.location.hash || '#/';
        const mainNavHTML = MainNav(currentPath, state, state.ui.navContext);
        
        const toolbarContainer = this.root.querySelector('.toolbar-container');
        if (toolbarContainer) {
            toolbarContainer.outerHTML = mainNavHTML;
        }
    }
}