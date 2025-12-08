// ======================================================
// ARCHIVO: src/App.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.2.1 - FILE: 1.4.6
// CORRECCIÓN: Integrado Listener Global para cerrar menús
//             al hacer clic fuera (click outside).
// ======================================================

import { state } from './store/state.js';
import { registerRerender, setUser } from './store/actions.js';
import { logout, tracedLoadUserData } from './services/auth.service.js';
import { loadBusinessData } from './services/storage.service.js';
import { initRouter } from './router/index.js';
import { Logger } from './services/logger.service.js';
import { LoginView } from './views/Authorization/LoginView.js';
import { Header } from './components/Layout/Header.js';
import { MainNav } from './components/Layout/MainNav.js';
import { Footer } from './components/Layout/Footer.js';
import { LoaderComponent } from './components/Common/Loader.js';
import { delay } from './utils/retardo.js';
import { can } from './services/permissions.service.js';
import { PERMISSIONS } from './services/roles.config.js';
import { routes } from './router/routes.js';
import { MODULES } from './services/modules.config.js';
import { ROLES } from './services/roles.config.js';
import { initRateService } from './services/rate.service.js';
import { showToast } from './services/toast.service.js';
import { openRateUpdateModal, openSuperAdminSettingsModal } from './services/modal.service.js';
import { initTippy } from './utils/tippy-helper.js';

export default class App {

    constructor(rootElement, initialState, mainLoader) {
        this.root = rootElement;
        this.mainLoader = mainLoader;
        this.currentViewCleanup = () => { };
        this.boundHandleGlobalActions = this.handleGlobalActions.bind(this);
        this.isLoggingOut = false;
        this.hasGlobalListener = false;
        Logger.info('App: Instancia creada.');
        registerRerender(this.render.bind(this));
    }

    async init() {
        Logger.info('App: Inicializando...');
        registerRerender(this.render.bind(this));
        this.initConnectivityListeners();
    }

    initConnectivityListeners() {
        window.addEventListener('offline', () => {
            Logger.warn('App: Conexión perdida. Pasando a modo offline.');
            showToast('Sin conexión a internet. Trabajando en modo local.', 'warning', 5000);
            document.body.classList.add('is-offline');
            state.ui.isOffline = true;
        });

        window.addEventListener('online', () => {
            Logger.info('App: Conexión restablecida.');
            showToast('Conexión restablecida. Sincronizando...', 'success', 3000);
            document.body.classList.remove('is-offline');

            const currentPath = window.location.hash || '#/';
            this.handleNavigation(currentPath);
        });
    }

    initGlobalClickListener() {
        document.addEventListener('click', (e) => {
            const profileMenu = document.getElementById('header-profile-dropdown');
            const profileButton = e.target.closest('[data-action="toggle-profile-menu"]');

            if (profileMenu &&
                profileMenu.classList.contains('show') &&
                !profileButton &&
                !profileMenu.contains(e.target)) {

                profileMenu.classList.remove('show');
            }

            const actionsMenu = document.getElementById('actions-menu-dropdown');
            const actionsButton = e.target.closest('[data-action="toggle-actions-menu"]');

            if (actionsMenu &&
                actionsMenu.classList.contains('show') &&
                !actionsButton &&
                !actionsMenu.contains(e.target)) {

                actionsMenu.classList.remove('show');
            }

            // 3. Manejo del Dropdown de Idioma (NUEVO)
            const langMenu = document.getElementById('header-language-dropdown');
            const langBtn = e.target.closest('[data-action="toggle-language-menu"]');

            if (langMenu &&
                langMenu.classList.contains('show') &&
                !langBtn &&
                !langMenu.contains(e.target)) {

                langMenu.classList.remove('show');
            }
        });
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
                this.mainLoader.updateMessage('Obteniendo tasas de cambio...');
                await delay(500);
                const rateInfo = await initRateService();
                state.settings.currencies.principal.rate = rateInfo.rate;
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
                await delay(1000);
                if (rateInfo.isOffline) {
                    showToast(`Modo Offline: Usando tasa guardada (Bs. ${rateInfo.rate})`, 'warning', 5000);
                }
                if (rateInfo.requiresManualUpdate) {
                    showToast('¡No se encontró tasa! Debes actualizarla manualmente.', 'error', 15000);
                }

            } else {
                Logger.warn('No se pudo cargar sesión. Mostrando login.');
                await logout();
            }
        } else {
            this.mainLoader.hide();
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
        this.renderLayout();
        const canViewDashboard = can(PERMISSIONS.VIEW_DASHBOARD);
        const userRole = sessionData?.user?.role || state.session?.user?.role;
        Logger.trace(`[App] bootAuthenticatedApp: Rol del usuario es ${userRole}`);
        const defaultRoute = '#/';
        let redirectTo = defaultRoute;
        if (!canViewDashboard) {
            Logger.warn('Usuario no tiene permiso para Dashboard. Buscando ruta alternativa...');
            if (userRole === ROLES.CAJERO && can(PERMISSIONS.VIEW_POS_MODULE)) {
                redirectTo = '#/pos';
            } else if (userRole === ROLES.OPERADOR && can(PERMISSIONS.VIEW_INVENTORY_MODULE)) {
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
        initRouter(this.handleNavigation.bind(this));

        if (!this.hasGlobalListener) {
            document.body.addEventListener('click', this.boundHandleGlobalActions, true);

            // --- ¡AQUÍ INICIAMOS EL LISTENER DE CIERRE DE MENÚS! ---
            this.initGlobalClickListener();

            this.hasGlobalListener = true;
            Logger.info('Listeners globales añadidos.');
        }
    }

    async handleLogoutSequence(toastMessage = '¡Hasta pronto!') {
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

    async handleGlobalActions(e) {
        const link = e.target.closest('a[data-route]');
        if (link) {
            e.preventDefault();
            const newPath = link.dataset.route;
            if (window.location.hash !== newPath) {
                window.location.hash = newPath;
            }
            return;
        }
        const actionElement = e.target.closest('[data-action]');
        if (!actionElement) return;

        const action = actionElement.dataset.action;

        // NUEVO: Manejo del Menú de Idioma
        const langMenu = document.getElementById('header-language-dropdown');

        if (action === 'toggle-language-menu') {
            e.stopPropagation();
            langMenu?.classList.toggle('show');

            // Cerrar otros menús si están abiertos
            document.getElementById('header-profile-dropdown')?.classList.remove('show');
            return;
        }

        // Si clic en cualquier otra cosa, cerrar idioma
        if (action !== 'toggle-language-menu' && langMenu?.classList.contains('show')) {
            langMenu.classList.remove('show');
        }

        // NUEVOS CASOS AGREGADOS
        if (action === 'wip-feature') {
            showToast('Función en desarrollo (WIP)', 'info');
            return;
        }

        if (action === 'toggle-fullscreen') {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(e => Logger.error(e));
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
            return;
        }

        if (action === 'add-product') {
            // Reutilizamos el permiso de crear producto
            if (can(PERMISSIONS.CREATE_PRODUCT)) {
                // Importamos dinámicamente para evitar ciclos si es necesario, o usamos el helper global
                // Idealmente, emite un evento o llama a la función si está disponible.
                // Por ahora, redirigimos a productos donde está el botón real
                window.location.hash = '#/inventory/products';
                showToast('Redirigiendo a gestión de productos...', 'info');
            } else {
                showToast('No tienes permisos para añadir productos.', 'warning');
            }
            return;
        }

        // 1. ABRIR/CERRAR MENÚ DESPLEGABLE (PERFIL)
        const profileDropdown = document.getElementById('header-profile-dropdown');
        if (action === 'toggle-profile-menu') {
            e.stopPropagation(); // Evitar que el listener global lo cierre inmediatamente
            profileDropdown?.classList.toggle('show');
            return;
        }
        // Cerrar si se hace clic en una opción del menú
        if (action !== 'toggle-profile-menu' && profileDropdown?.classList.contains('show')) {
            profileDropdown.classList.remove('show');
        }

        // 2. ABRIR/CERRAR MENÚ DE ACCIONES (NAV)
        const dropdown = document.getElementById('actions-menu-dropdown');
        if (action !== 'toggle-actions-menu' && dropdown?.classList.contains('show')) {
            dropdown.classList.remove('show');
        }

        if (action === 'logout') {
            this.handleLogoutSequence();
        } else if (action === 'view-profile-details' || action === 'app-settings') {
            showToast('Esta sección está en desarrollo (WIP).', 'info');
        } else if (action === 'toggle-notifications') {
            showToast('No hay notificaciones nuevas.', 'info');
        } else {
            switch (action) {
                case 'open-rate-modal':
                    openRateUpdateModal();
                    break;
                case 'open-config':
                    // Verificamos permisos
                    if (can(PERMISSIONS.EDIT_SETTINGS_BUSINESS) || can(PERMISSIONS.EDIT_SETTINGS_SYSTEM)) {
                        Logger.info('Abriendo modal de Configuración Global...');
                        openSuperAdminSettingsModal();
                    } else {
                        Logger.warn('Intento de abrir config sin permisos.');
                    }
                    break;
                case 'toggle-theme':
                    this.toggleTheme();
                    break;
                default:
                    if (action === 'toggle-actions-menu') {
                        e.stopPropagation(); // Evitar cierre inmediato
                        dropdown?.classList.toggle('show');
                    } else {
                        Logger.warn(`Acción desconocida: ${action}`);
                    }
            }
        }
    }

    renderLayout() {
        const currentPath = window.location.hash || '#/';
        const mainNavHTML = MainNav(currentPath, state, state.ui.navContext);
        this.root.innerHTML = `
            <div class="page-wrapper"  id="app-layout" >
                ${Header(state)}
                <main class="content">
                    ${mainNavHTML}
                    <div class="container view-container" id="view-container"></div>
                </main>
                ${Footer(state)}
            </div>
        `;

        // Inicializa Tippy en todo el layout
        initTippy(this.root);

        if (state.session.isLoggedIn && !this.hasGlobalListener) {
            document.body.addEventListener('click', this.boundHandleGlobalActions, true);
            // (La inicialización del listener global ahora se hace en bootAuthenticatedApp)
        }
    }

    render() {
        if (state.session.isLoggedIn) {
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
            this.currentViewCleanup = () => { };
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
            this.currentViewCleanup = ViewComponent(updatedViewContainer, state);
        } catch (loadError) {
            Logger.error(`Error cargando componente para la vista ${path}:`, loadError);
            updatedViewContainer.innerHTML = `<p>Error al cargar la vista ${path}.</p>`;
            this.currentViewCleanup = () => { };
        } finally {
            updatedViewContainer.classList.remove('fade-out');
        }
    }

    showLogin() {
        this.mainLoader.hide();
        Logger.info('Mostrando pantalla de login...');
        if (typeof this.currentViewCleanup === 'function') {
            try {
                this.currentViewCleanup();
            } catch (e) {
                Logger.error('Error cleanup (login):', e);
            }
            this.currentViewCleanup = () => { };
        }
        if (this.hasGlobalListener) {
            document.body.removeEventListener('click', this.boundHandleGlobalActions, true);
            this.hasGlobalListener = false;
            Logger.info('Listener global quitado.');
        }
        this.root.innerHTML = '';
        try {
            LoginView(this.root, state);
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