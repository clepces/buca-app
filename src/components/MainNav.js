// ARCHIVO CORREGIDO Y DEFINITIVO: src/components/MainNav.js

import { can } from '../services/permissions.service.js';
import { PERMISSIONS } from '../services/roles.config.js';
import { MODULES } from '../services/modules.config.js';

export function MainNav(activeRoute = '#/', state) {
    const routes = [
        { path: '#/', icon: 'fa-chart-pie', label: 'Panel', module: MODULES.CORE, permission: PERMISSIONS.VIEW_DASHBOARD },
        { path: '#/products', icon: 'fa-box', label: 'Productos', module: MODULES.SGA_SCM, permission: PERMISSIONS.VIEW_PRODUCTS },
        { path: '#/pos', icon: 'fa-cash-register', label: 'Caja', module: MODULES.POS, permission: PERMISSIONS.VIEW_POS },
        { path: '#/inventory', icon: 'fa-warehouse', label: 'Inventario', module: MODULES.SGA_SCM, permission: PERMISSIONS.VIEW_INVENTORY },
        { path: '#/clients', icon: 'fa-users', label: 'Clientes', module: MODULES.CRM, permission: PERMISSIONS.VIEW_CLIENTS },
    ];

    // --- LÓGICA DE FILTRADO SIMPLIFICADA Y CORREGIDA ---
    
    const isSuperAdmin = state.session.business?.id === 'admin_view';
    
    const availableRoutes = routes.filter(route => {
        const userHasPermission = can(route.permission);
        
        // Super Admin: Ve todos los módulos a los que tiene permisos
        if (isSuperAdmin) {
            return userHasPermission;
        }
        
        // Usuarios normales: Solo ven los módulos según sus permisos
        // El módulo CORE (Panel) siempre se muestra si tienen permiso
        if (route.module === MODULES.CORE) {
            return userHasPermission;
        }
        
        // Para otros módulos, solo verificar permisos
        return userHasPermission;
    });
    
    // --- FIN DE LA LÓGICA REFACTORIZADA ---

    const userName = state.session.user?.name || 'Usuario';
    const userEmail = state.session.user?.email || 'email@dominio.com';

    return `
        <div class="toolbar-container">
            <div class="toolbar-scroll-wrapper">
                <ul class="breadcrumb">
                    ${availableRoutes.map(route => `
                        <li class="breadcrumb-item">
                            <a href="${route.path}" class="nav-button ${activeRoute === route.path ? 'active' : ''}" data-route="${route.path}">
                                <i class="fas ${route.icon}"></i>
                                <span>${route.label}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="toolbar-separador"></div>
            <div class="toolbar-actions">
                <button class="nav-button" data-action="toggle-theme">
                    <i class="fas fa-moon"></i> <span>Tema</span>
                </button>
                <button id="actions-menu-button" class="nav-button" data-action="toggle-actions-menu">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
                <div id="actions-menu-dropdown" class="actions-menu-dropdown">
                    <div class="action-item-header">
                        <i class="fas fa-user-circle"></i>
                        <div class="user-info">
                            <span class="user-name">${userName}</span>
                            <span class="user-email">${userEmail}</span>
                        </div>
                    </div>
                    <hr>
                    ${can(PERMISSIONS.EDIT_SETTINGS) ? `
                    <button class="action-item" data-action="open-config">
                        <i class="fas fa-cog"></i> <span>Configuración</span>
                    </button>
                    <hr>
                    ` : ''}
                    <button class="action-item danger" data-action="logout">
                        <i class="fas fa-sign-out-alt"></i> <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}