// ARCHIVO CORREGIDO: src/App.js
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
import { MODULES } from './services/modules.config.js'; // Asegúrate que MODULES esté importado

export default class App {

    constructor(rootElement, initialState, mainLoader) {
        this.root = rootElement;
        this.state = initialState; // Estado local de la instancia App
        this.mainLoader = mainLoader;
        this.currentViewCleanup = () => {};
        this.boundHandleGlobalActions = this.handleGlobalActions.bind(this);
        this.isLoggingOut = false;
        this.hasGlobalListener = false;
        Logger.info('App: Instancia creada.');
        registerRerender(this.render.bind(this));
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
                this.state.session.isLoggedIn = true;
                this.state.session.user = {
                    uid: state.user.uid,
                    email: state.user.email,
                    name: state.user.name,
                    role: state.role
                };
                this.state.session.business = {
                    id: state.businessId || 'admin_view',
                    departmentId: state.departmentId
                };
                if (this.state.session.business.id === 'admin_view') {
                    this.mainLoader.updateMessage('Bienvenido, Administrador');
                    this.state.products = [];
                } else {
                    this.mainLoader.updateMessage('Cargando datos del negocio...');
                    try {
                        const businessData = await loadBusinessData(this.state); 
                        this.state.products = (businessData && businessData.products) ? businessData.products : [];
                    } catch (error) {
                        Logger.error('Error cargando datos:', error);
                        this.state.products = [];
                    }
                }
                await delay(1500);
                this.bootAuthenticatedApp();
            } else {
                Logger.warn('No se pudo cargar sesión. Mostrando login.');
                await logout(); // Llama a logout si falla la carga
                // showLogin() será llamado por onAuthStateChanged(null)
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

    bootAuthenticatedApp() {
        Logger.info('App: arrancando aplicación autenticada.');
        if (!this.hasGlobalListener) {
            document.body.addEventListener('click', this.boundHandleGlobalActions, true);
            this.hasGlobalListener = true;
            Logger.info('Listener de acciones globales añadido.');
        }

        // --- INICIO DE LA LÓGICA CORREGIDA ---
        
        // 1. Definimos las rutas base
        const dashboardPath = '#/';
        const rootPath = '#/';
        const currentHash = window.location.hash || '#/';

        // 2. Verificamos si la ruta actual (en la URL) es válida y tenemos permiso
        const currentRoute = routes.find(r => r.path === currentHash);
        const isCurrentRouteValid = currentRoute && can(currentRoute.permission);

        // 3. Buscamos la ruta "por defecto" (el Dashboard o el primer fallback)
        let defaultRoutePath = null;
        const dashboardRoute = routes.find(r => r.path === dashboardPath);
        if (dashboardRoute && can(dashboardRoute.permission)) {
            defaultRoutePath = dashboardPath;
            Logger.info(`Usuario tiene permiso para Dashboard. Ruta por defecto: ${defaultRoutePath}`);
        } else {
            const fallbackRoute = routes.find(route => route.path !== rootPath && can(route.permission));
            if (fallbackRoute) {
                defaultRoutePath = fallbackRoute.path;
                Logger.info(`Usuario NO puede ver Dashboard. Ruta alternativa por defecto: ${defaultRoutePath}`);
            } else {
                // Caso extremo: solo puede ver la raíz (que es el dashboard)
                defaultRoutePath = rootPath;
                Logger.warn(`Usuario solo tiene permiso para la ruta raíz '${rootPath}'. Usando como por defecto.`);
            }
        }

        // 4. Decidimos si redirigir
        let needsRedirect = false;
        if (!isCurrentRouteValid) {
            // La ruta actual NO es válida (ej. /#/foo) O no tenemos permiso.
            // Redirigimos al path por defecto.
            Logger.warn(`Ruta actual '${currentHash}' no es válida o no tiene permisos. Redirigiendo a la ruta por defecto.`);
            needsRedirect = true;
        } else if (currentHash === rootPath && defaultRoutePath !== rootPath) {
             // Caso especial: Estamos en la raíz, pero nuestra ruta por defecto NO es la raíz
             // (ej. un Cajero que entra a /#/ y debe ir a /#/pos)
             Logger.info(`Ruta actual es raíz, pero la ruta por defecto es ${defaultRoutePath}. Redirigiendo.`);
             needsRedirect = true;
        }

        if (needsRedirect) {
            Logger.info(`Redirigiendo desde '${currentHash}' hacia la ruta objetivo: ${defaultRoutePath}`);
            window.location.hash = defaultRoutePath;
        } else {
            // La ruta actual es válida y tenemos permisos (ej. /#/clients), no hacemos nada
            Logger.info(`Ya estamos en la ruta correcta (${currentHash}). Renderizando layout e iniciando router.`);
            this.renderLayout();
            // initRouter(this.handleNavigation.bind(this)); // Esta línea aquí es redundante
        }
        
        // --- FIN DE LA LÓGICA CORREGIDA ---

        // Esta llamada SIEMPRE debe ejecutarse al final para que el router escuche
        setTimeout(() => {
            Logger.trace("Llamando a initRouter después de posible redirección.");
            initRouter(this.handleNavigation.bind(this));
        }, 0);
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
        // --- INICIO MODIFICACIÓN ---
        // Pasamos state.ui.navContext y state completo a MainNav
        const mainNavHTML = MainNav(currentPath, state, state.ui.navContext); // <-- Genera el HTML correcto        // --- FIN MODIFICACIÓN ---
        
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

        // --- Limpieza de la vista anterior ---
        if (typeof this.currentViewCleanup === 'function') {
            try { this.currentViewCleanup(); }
            catch (e) { Logger.error('Error en cleanup de vista:', e); }
            this.currentViewCleanup = () => {};
        }

        // --- Encontrar la ruta y verificar permisos ---
        const route = routes.find(r => r.path === path);
        const defaultRoute = routes.find(r => r.path === '#/'); // Ruta del dashboard como fallback

        if (!route) {
             Logger.warn(`Ruta no encontrada: ${path}. Redirigiendo a Dashboard.`);
             window.location.hash = '#/'; // Redirige si la ruta no existe
             return; // La redirección disparará handleNavigation de nuevo
        }

        if (!can(route.permission)) {
            Logger.warn(`Acceso denigado a: ${path}. Redirigiendo a ruta por defecto.`);
            // Busca la primera ruta principal a la que tenga acceso
            const accessibleRoute = routes.find(r => r.isMainModule && can(r.permission)) || defaultRoute;
            window.location.hash = accessibleRoute.path;
            return; // La redirección disparará handleNavigation de nuevo
        }

        // --- INICIO MODIFICACIÓN: Actualizar contexto de navegación ---
        // Asegúrate que route exista antes de acceder a route.context
        // Y usa MODULES.CORE como fallback correcto.
        const newNavContext = route?.context || MODULES.CORE;
        // --- FIN MODIFICACIÓN ---
        if (state.ui.navContext !== newNavContext) {
             state.ui.navContext = newNavContext;
             // Forzamos el re-renderizado del layout para actualizar MainNav
             this.renderLayout();
             // Esperamos un instante para que el DOM se actualice ANTES de cargar la vista
             await delay(10);
        } else {
            // Si el contexto no cambió, solo actualizamos el botón activo en MainNav
            document.querySelectorAll('.nav-button, .contextual-nav-button').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('href') === path);
            });
        }
        // Re-seleccionamos viewContainer por si renderLayout() lo recreó
        const updatedViewContainer = document.getElementById('view-container');
        if (!updatedViewContainer) {
             Logger.error("Contenedor de vista desaparecido después de renderLayout().");
             return;
        }
        // --- FIN MODIFICACIÓN ---


        // --- Cargar y renderizar la vista ---
        updatedViewContainer.classList.add('fade-out'); // Inicia animación de salida
        await delay(150); // Espera que termine la animación

        try {
            // Importa dinámicamente el componente de la vista
            const ViewComponent = await route.component();
            // Llama a la función del componente para renderizar y obtener la función de limpieza
            this.currentViewCleanup = ViewComponent(updatedViewContainer, this.state);
        } catch (loadError) {
            Logger.error(`Error cargando componente para la vista ${path}:`, loadError);
            updatedViewContainer.innerHTML = `<p>Error al cargar la vista ${path}.</p>`; // Mensaje de error
            this.currentViewCleanup = () => {}; // No hay nada que limpiar
        } finally {
            updatedViewContainer.classList.remove('fade-out'); // Quita la clase para la animación de entrada
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

        // Solo re-renderizar la navegación sin afectar la vista actual
        this.updateNavigation();
    }

    updateNavigation() {
        const currentPath = window.location.hash || '#/';
        const mainNavHTML = MainNav(currentPath, state, state.ui.navContext);
        
        // Actualizar solo la navegación sin recrear todo el layout
        const toolbarContainer = this.root.querySelector('.toolbar-container');
        if (toolbarContainer) {
            toolbarContainer.outerHTML = mainNavHTML;
        }
    }
}