// ======================================================
// ARCHIVO: src/components/MainNav.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: (Anotación J-2)
// 1. Lee el nombre/email desde 'state.session.user'
//    en lugar de 'state.session.user' (que era un mix).
// ======================================================

import { can } from '../../services/permissions.service.js';
import { routes } from '../../router/routes.js';
import { MODULES } from '../../services/modules.config.js';
import { PERMISSIONS } from '../../services/roles.config.js';

export function MainNav(activeRoute = '#/', state, currentContext = MODULES.CORE) {

    // --- ¡INICIO DE CORRECCIÓN! ---
    const userName = state.session?.user?.name || 'Usuario';
    const userEmail = state.session?.user?.email || 'email@dominio.com';
    // --- FIN DE CORRECCIÓN ---

    // 1. Obtener Rutas del Menú Principal
    const mainRoutes = routes.filter(route =>
        route.isMainModule && can(route.permission)
    );

    // 2. Preparar Datos para el Menú Contextual
    let sectionTitle = '';
    let sectionPath = '#/';
    let mainRouteOfContext = null;
    let contextSubRoutes = [];
    let showContextualMenu = currentContext !== MODULES.CORE;

    if (showContextualMenu) {
        contextSubRoutes = routes.filter(
            route => route.context === currentContext && can(route.permission) && !route.isMainModule
        );
        // CORRECCIÓN: Priorizar la ruta activa si es un módulo principal
        mainRouteOfContext = routes.find(r => r.path === activeRoute && r.isMainModule)
            || routes.find(r => r.context === currentContext && r.isMainModule);

        if (mainRouteOfContext) {
            sectionTitle = mainRouteOfContext.label;
            sectionPath = mainRouteOfContext.path;
        } else {
            sectionTitle = 'Sección';
            sectionPath = '#/';
            console.warn(`[MainNav] No se encontró ruta principal para el contexto: ${currentContext}`);
        }
    }

    // 3. Construir HTML del Menú Contextual
    const contextualMenuHTML = showContextualMenu ? `
        <li class="breadcrumb-item">
            <a href="#/" class="nav-button back-button" data-route="#/" data-tippy-content="Volver">
                <i class="bi bi-arrow-left"></i>
                <span>Volver</span>
            </a>
        </li>
        <li class="breadcrumb-item section-title-item">
            <a href="${sectionPath}" class="nav-button section-title-link ${activeRoute === sectionPath ? 'active' : ''}" 
                data-route="${sectionPath}" data-tippy-content="${sectionTitle}">
                 <i class="bi ${mainRouteOfContext?.icon || 'bi-folder-fill'} me-1"></i>
                <span>${sectionTitle}</span>
            </a>
        </li>
        <li class="breadcrumb-item separator">|</li>
        ${contextSubRoutes.map(route => `
            <li class="breadcrumb-item">
                <a href="${route.path}" class="nav-button contextual-nav-button ${activeRoute === route.path ? 'active' : ''}" 
                    data-route="${route.path}" data-tippy-content="${route.label}">
                    <i class="bi ${route.icon || 'bi-record-fill'}"></i>
                    <span>${route.label}</span>
                </a>
            </li>
        `).join('')}
    ` : '';

    // 4. Lógica del Tema
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    const themeIconClass = currentTheme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill';

    // 5. Renderizado Final
    return `
        <div class="toolbar-container">
            <div class="toolbar-scroll-wrapper">
                <ul class="breadcrumb main-nav-menu ${!showContextualMenu ? 'visible' : 'hidden'}">
                    ${mainRoutes.map(route => `
                        <li class="breadcrumb-item">
                            <a href="${route.path}" class="nav-button ${activeRoute === route.path ? 'active' : ''}" 
                                data-route="${route.path}" data-tippy-content="${route.label}">
                                <i class="bi ${route.icon}"></i>
                                <span>${route.label}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>

                <ul class="breadcrumb contextual-nav-menu ${showContextualMenu ? 'visible' : 'hidden'}">
                    ${contextualMenuHTML}
                </ul>
            </div>
            
            <div class="toolbar-separador"></div>
            <div class="toolbar-actions">
                 <button class="nav-button" data-action="toggle-theme" data-tippy-content="Cambiar Tema">
                    <i class="bi ${themeIconClass}"></i>
                </button>
                <button id="actions-menu-button" class="nav-button" data-action="toggle-actions-menu" data-tippy-content="Más opciones">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <div id="actions-menu-dropdown" class="actions-menu-dropdown">
                    <div class="action-item-header"> <i class="bi bi-person-circle"></i> 
                        <div class="user-info"> 
                            <span class="user-name">${userName}</span> 
                            <span class="user-email">${userEmail}</span> 
                        </div> 
                    </div> 

                    <hr>
                    
                    ${(can(PERMISSIONS.EDIT_SETTINGS_BUSINESS) || can(PERMISSIONS.EDIT_SETTINGS_SYSTEM)) ? `
                        <button class="action-item" data-action="open-config">
                            <i class="bi bi-gear-fill"></i> <span>Configuración</span>
                        </button> <hr>
                    ` : ''}
                    
                    <button class="action-item danger" data-action="logout"> <i class="bi bi-box-arrow-right"></i> <span>Cerrar Sesión</span> </button>
                </div>
            </div>
        </div>
    `;
}