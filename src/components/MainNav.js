// src/components/MainNav.js
import { can } from '../services/permissions.service.js';
import { routes } from '../router/routes.js';
import { MODULES } from '../services/modules.config.js';
import { PERMISSIONS } from '../services/roles.config.js';

export function MainNav(activeRoute = '#/', state, currentContext = MODULES.CORE) {

    const userName = state.session.user?.name || 'Usuario';
    const userEmail = state.session.user?.email || 'email@dominio.com';

    // --- 1. Obtener Rutas del Menú Principal ---
    const mainRoutes = routes.filter(route =>
        route.isMainModule && can(route.permission)
    );

    // --- 2. Preparar Datos para el Menú Contextual (SI APLICA) ---
    let sectionTitle = '';
    let sectionPath = '#/'; // Default seguro
    let mainRouteOfContext = null;
    let contextSubRoutes = []; // Renombrado para claridad
    let showContextualMenu = currentContext !== MODULES.CORE; // Bandera clara

    if (showContextualMenu) {
        contextSubRoutes = routes.filter(route =>
            route.context === currentContext && can(route.permission) && !route.isMainModule
        );
        mainRouteOfContext = routes.find(r => r.context === currentContext && r.isMainModule);

        if (mainRouteOfContext) {
             sectionTitle = mainRouteOfContext.label;
             sectionPath = mainRouteOfContext.path;
        } else {
             // Fallback si no se encuentra la ruta principal (no debería pasar)
             sectionTitle = 'Sección'; // Título genérico
             sectionPath = '#/'; // Vuelve al inicio como seguridad
             console.warn(`[MainNav] No se encontró ruta principal para el contexto: ${currentContext}`);
        }
    }

    // --- 3. Construir HTML del Menú Contextual (SI APLICA) ---
    // Solo se construye si showContextualMenu es true
    const contextualMenuHTML = showContextualMenu ? `
        <li class="breadcrumb-item">
            <a href="#/" class="nav-button back-button" data-route="#/">
                <i class="bi bi-arrow-left"></i>
                <span>Volver</span>
            </a>
        </li>
        <li class="breadcrumb-item section-title-item">
            <!-- {/* Usamos las variables definidas arriba, ahora sabemos que existen en este punto */} -->
            <a href="${sectionPath}" class="nav-button section-title-link ${activeRoute === sectionPath ? 'active' : ''}" data-route="${sectionPath}">
                 <i class="bi ${mainRouteOfContext?.icon || 'bi-folder-fill'} me-1"></i>
                <span>${sectionTitle}</span>
            </a>
        </li>
        <li class="breadcrumb-item separator">|</li>
        ${contextSubRoutes.map(route => `
            <li class="breadcrumb-item">
                <a href="${route.path}" class="nav-button contextual-nav-button ${activeRoute === route.path ? 'active' : ''}" data-route="${route.path}">
                    <i class="bi ${route.icon || 'bi-record-fill'}"></i>
                    <span>${route.label}</span>
                </a>
            </li>
        `).join('')}
    ` : ''; // Si no es contextual, el string queda vacío

    // --- 4. Lógica del Tema (sin cambios) ---
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    const themeIconClass = currentTheme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill';

    // --- 5. Renderizado Final ---
    return `
        <div class="toolbar-container">
            <div class="toolbar-scroll-wrapper">
                <!-- {/* Menú Principal: Se muestra si NO es contextual */} -->
                <ul class="breadcrumb main-nav-menu ${!showContextualMenu ? 'visible' : 'hidden'}">
                    ${mainRoutes.map(route => `
                        <li class="breadcrumb-item">
                            <a href="${route.path}" class="nav-button ${activeRoute === route.path ? 'active' : ''}" data-route="${route.path}">
                                <i class="bi ${route.icon}"></i>
                                <span>${route.label}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>

                <!-- {/* Menú Contextual: Se muestra si SI es contextual */} -->
                <ul class="breadcrumb contextual-nav-menu ${showContextualMenu ? 'visible' : 'hidden'}">
                    ${contextualMenuHTML} <!-- {/* <-- Insertamos el string (vacío o construido) */} -->
                </ul>
            </div>
            <!-- {/* Acciones Fijas (sin cambios) */} -->
            <div class="toolbar-separador"></div>
            <div class="toolbar-actions">
                 <button class="nav-button" data-action="toggle-theme" title="Cambiar Tema">
                    <i class="bi ${themeIconClass}"></i>
                </button>
                <button id="actions-menu-button" class="nav-button" data-action="toggle-actions-menu" title="Más opciones">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <div id="actions-menu-dropdown" class="actions-menu-dropdown">
                   <div class="action-item-header"> <i class="bi bi-person-circle"></i> <div class="user-info"> <span class="user-name">${userName}</span> <span class="user-email">${userEmail}</span> </div> </div> <hr>
                    ${can(PERMISSIONS.EDIT_SETTINGS) ? `<button class="action-item" data-action="open-config"> <i class="bi bi-gear-fill"></i> <span>Configuración</span> </button> <hr>` : ''}
                    <button class="action-item danger" data-action="logout"> <i class="bi bi-box-arrow-right"></i> <span>Cerrar Sesión</span> </button>
                </div>
            </div>
        </div>
    `;
}