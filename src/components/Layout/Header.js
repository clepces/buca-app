// ======================================================
// ARCHIVO: src/components/Layout/Header.js
// VERSIÓN: 4.0 (Diseño "White Clean" idéntico a la imagen)
// ======================================================
import { sanitizeHTML } from '../../utils/sanitize.js';
import { state as globalState } from '../../store/state.js';
import { can } from '../../services/permissions.service.js';
import { PERMISSIONS } from '../../services/roles.config.js';

export function Header(state) {
    const appConfig = state.settings.appConfig;
    
    // 1. Datos de Tienda y Usuario
    const storeName = sanitizeHTML(
        appConfig?.system?.metadata?.appNameSimplify || 'B.U.C.A'
    );
    const user = state.session?.user || { name: 'Usuario', email: 'user@buca.app' };
    // Iniciales para el avatar (ej: "AT")
    const userInitials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'US';

    // 2. Tasa de Cambio
    const tasaBcv = state.settings.currencies.principal.rate;
    const tasaDisplay = tasaBcv.toFixed(4).replace(/\.?0+$/, '');
    const canEditRate = can(PERMISSIONS.EDIT_SETTINGS_BUSINESS) || can(PERMISSIONS.EDIT_SETTINGS_SYSTEM);
    
    // Widget de Tasa
    const rateWidgetHTML = `
        <div class="header-rate-widget ${canEditRate ? 'clickable' : ''}" 
             ${canEditRate ? 'data-action="open-rate-modal" title="Clic para actualizar"' : ''}>
            <div class="rate-icon-circle">
                <i class="bi bi-currency-exchange"></i>
            </div>
            <div class="rate-text-group">
                <span class="rate-label">TASA BCV</span>
                <span class="rate-amount">Bs. ${tasaDisplay} <i class="bi bi-graph-up-arrow text-success ms-1" style="font-size:0.7rem"></i></span>
            </div>
        </div>
    `;

    // 3. HTML del Menú Desplegable de Usuario
    const profileDropdownHTML = `
        <div class="profile-dropdown-menu" id="header-profile-dropdown">
            <div class="dropdown-header">
                <div class="dropdown-user-details">
                    <strong>${user.name}</strong>
                    <span>${user.email}</span>
                </div>
            </div>
            <div class="dropdown-divider"></div>
            
            <button class="dropdown-item" data-action="view-profile-details">
                <i class="bi bi-person"></i> Mi Perfil
                <span class="badge-wip">WIP</span>
            </button>
            <button class="dropdown-item" data-action="toggle-theme">
                <i class="bi bi-moon-stars"></i> Cambiar Tema
            </button>
            <button class="dropdown-item" data-action="app-settings">
                <i class="bi bi-gear"></i> Configuración
            </button>
            
            <div class="dropdown-divider"></div>
            
            <button class="dropdown-item text-danger" data-action="logout">
                <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
            </button>
        </div>
    `;

    return `
        <header class="app-header">
            <div class="header-section left">
                <div class="brand-logo">
                    <span class="brand-text">${storeName}</span>
                </div>
            </div>

            <div class="header-section center">
                <div class="global-search-wrapper">
                    <i class="bi bi-search search-icon"></i>
                    <input type="text" 
                           class="global-search-input" 
                           placeholder="Buscar productos, clientes, facturas..." 
                           id="global-search-input">
                    <div class="keyboard-shortcut">Ctrl + K</div>
                </div>
            </div>

            <div class="header-section right">
                
                ${rateWidgetHTML}

                <div class="separator-vertical"></div>

                <button class="header-icon-btn" data-action="toggle-theme" title="Tema">
                    <i class="bi bi-moon"></i>
                </button>

                <button class="header-icon-btn notification-btn" data-action="toggle-notifications">
                    <i class="bi bi-bell"></i>
                    <span class="notification-dot">3</span>
                </button>

                <div class="separator-vertical"></div>

                <div class="user-profile-container" data-action="toggle-profile-menu">
                    <div class="user-text-info">
                        <span class="user-name">${user.name}</span>
                        <span class="user-role badge bg-primary-subtle text-primary">${user.role || 'Admin'}</span>
                    </div>
                    <div class="user-avatar-circle">
                        ${userInitials}
                    </div>
                    <i class="bi bi-chevron-down dropdown-caret"></i>
                    
                    ${profileDropdownHTML}
                </div>
            </div>
        </header>
    `;
}