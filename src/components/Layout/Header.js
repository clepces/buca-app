// ======================================================
// ARCHIVO: src/components/Layout/Header.js
// VERSIÓN: 11.0 (Refinamiento UI: Idioma, Tasa y Perfil)
// ======================================================
import { sanitizeHTML } from '../../utils/sanitize.js';
import { state as globalState } from '../../store/state.js';
import { can } from '../../services/permissions.service.js';
import { PERMISSIONS } from '../../services/roles.config.js';

export function Header(state) {
    const appConfig = state.settings.appConfig;
    
    // 1. Configuración de Apariencia (Con Fallback de seguridad)
    const uiConfig = state.settings.appearance?.header || {
        showFullscreen: true, showMessages: true, showNotifications: true, 
        showSettings: true, showRate: true, showLanguage: true
    };

    // 1. Datos
    const storeName = sanitizeHTML(
        appConfig?.system?.metadata?.appNameSimplify || 'B.U.C.A'
    );
    const user = state.session?.user || { name: 'Usuario', email: 'user@buca.app' };
    const userInitials = user.name ? user.name.substring(0, 2).toUpperCase() : 'US';

    // 2. Widget Tasa (Condicional)
    const tasaBcv = state.settings.currencies.principal.rate;
    const tasaDisplay = tasaBcv.toFixed(2);
    const canEditRate = can(PERMISSIONS.EDIT_SETTINGS_BUSINESS) || can(PERMISSIONS.EDIT_SETTINGS_SYSTEM);
    
    const rateWidgetHTML = uiConfig.showRate ? `
        <div class="header-widget-rate ${canEditRate ? 'clickable' : ''}" 
            ${canEditRate ? 'data-action="open-rate-modal" title="Actualizar Tasa"' : ''}>
            <div class="hw-icon"><i class="bi bi-currency-exchange"></i></div>
            <div class="hw-content">
                <span class="hw-label">TASA BCV</span>
                <div class="hw-value-group">
                    <span class="hw-currency">Bs.</span>
                    <span class="hw-amount">${tasaDisplay}</span>
                </div>
            </div>
        </div>
    ` : '';

    // 3. Widget Idioma (Condicional)
    const currentLang = { code: 'ES', flag: '🇻🇪' };    
    const languageWidgetHTML = uiConfig.showLanguage ? `
        <div class="language-capsule" data-action="toggle-language-menu" title="Cambiar Idioma">
            <span class="lang-flag">${currentLang.flag}</span>
            <div class="lang-separator"></div>
            <span class="lang-code">${currentLang.code}</span>
            <i class="bi bi-chevron-down lang-arrow"></i>
            
            <div class="language-dropdown-menu" id="header-language-dropdown">
                <div class="lang-menu-header">Seleccionar Región</div>
                <button class="lang-item active">
                    <span class="lang-flag">🇻🇪</span> <span>Español (VE)</span> <i class="bi bi-check2 ms-auto"></i>
                </button>
                <button class="lang-item">
                    <span class="lang-flag">🇺🇸</span> <span>English (US)</span>
                </button>
            </div>
        </div>
    ` : '';

    // Simulamos datos extra para la UI (luego vendrán del state real)
    const userPlan = 'Enterprise'; 
    const planColor = 'warning'; // success, warning, info
    
    // --- NUEVA ESTRUCTURA DEL MENÚ DE PERFIL ---
    const profileMenuHTML = `
        <div class="profile-dropdown-card" id="header-profile-dropdown">
            
            <div class="dropdown-header-modern">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="user-avatar-large">
                        <span>${userInitials}</span>
                        <span class="status-indicator online"></span>
                    </div>
                    <div class="user-details-modern">
                        <div class="name-row">
                            <strong>${user.name}</strong>
                            <span class="plan-badge ${planColor}">${userPlan}</span>
                        </div>
                        <span class="user-email-modern">${user.email}</span>
                    </div>
                </div>
            </div>

            <div class="dropdown-scroll-content custom-scrollbar">
                <div class="menu-group">
                    <span class="group-label">Mi Cuenta</span>
                    <button class="menu-item-modern" data-action="view-profile-details">
                        <div class="icon-box"><i class="bi bi-person-badge"></i></div>
                        <div class="item-content">
                            <span>Perfil & Datos</span>
                            <small>Configura tu información personal</small>
                        </div>
                    </button>
                    <button class="menu-item-modern" data-action="wip-feature">
                        <div class="icon-box"><i class="bi bi-credit-card"></i></div>
                        <div class="item-content">
                            <span>Facturación</span>
                            <small>Historial de pagos y plan</small>
                        </div>
                    </button>
                </div>

                <div class="menu-separator"></div>

                <div class="menu-group">
                    <span class="group-label">Sistema</span>
                    <button class="menu-item-modern" data-action="toggle-theme">
                        <div class="icon-box"><i class="bi bi-moon-stars"></i></div>
                        <div class="item-content">
                            <span>Apariencia</span>
                            <small>Alternar modo claro/oscuro</small>
                        </div>
                    </button>
                    <button class="menu-item-modern" data-action="app-settings">
                        <div class="icon-box"><i class="bi bi-sliders"></i></div>
                        <div class="item-content">
                            <span>Preferencias</span>
                            <small>Ajustes generales del ERP</small>
                        </div>
                    </button>
                    <button class="menu-item-modern" data-action="wip-feature">
                        <div class="icon-box"><i class="bi bi-life-preserver"></i></div>
                        <div class="item-content">
                            <span>Centro de Ayuda</span>
                            <small>Documentación y soporte</small>
                        </div>
                    </button>
                </div>
            </div>

            <div class="dropdown-footer-modern">
                <button class="menu-item-logout" data-action="logout">
                    <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                </button>
            </div>
        </div>
    `;

    const logoLight = 'assets/icons/logo-light.svg'; 

    return `
        <header class="app-header">
            
            <div class="header-left">
                <div class="brand-logo">
                    <img src="${logoLight}" alt="Logo" class="logo-img" onerror="this.style.display='none'">
                    <div class="brand-text-group">
                        <span class="brand-title">${storeName}</span>
                        <span class="brand-subtitle">ERP SYSTEM</span>
                    </div>
                </div>
                <button class="mobile-menu-btn ms-3" data-action="toggle-sidebar">
                    <i class="bi bi-list"></i>
                </button>
            </div>
            
            <div class="header-separator /*d-none*/ d-md-block"></div>

            <div class="header-right">
                
                <div class="header-search-wrapper">
                    <i class="bi bi-search header-search-icon"></i>
                    <input type="text" class="header-search-input" placeholder="Buscar..." id="global-search-input">
                    <div class="keyboard-shortcut"><i class="bi bi-command"></i>K</div>
                </div>

                <div class="header-item /*d-none*/ d-lg-flex ms-2">
                    ${rateWidgetHTML}
                </div>

                ${(uiConfig.showRate && uiConfig.showLanguage) ? '<div class="header-separator /*d-none*/ d-md-block"></div>' : '' }

                <div class="header-separator /*d-none*/ d-md-block"></div>

                <div class="header-item /*d-none*/ d-sm-flex">
                    ${languageWidgetHTML}
                </div>

                <div class="header-actions-group">
                    ${uiConfig.showFullscreen ? `
                    <button class="header-icon-btn /*d-none*/ d-md-flex" data-action="toggle-fullscreen" title="Pantalla Completa">
                        <i class="bi bi-arrows-fullscreen"></i>
                    </button>` : ''}
                    
                    ${uiConfig.showMessages ? `
                    <button class="header-icon-btn" data-action="wip-feature" title="Mensajes">
                        <i class="bi bi-envelope-fill"></i>
                        <span class="notification-badge">4</span>
                    </button>` : ''}
                    
                    ${uiConfig.showNotifications ? `
                    <button class="header-icon-btn notification-btn" data-action="toggle-notifications" title="Notificaciones">
                        <i class="bi bi-bell-fill"></i>
                        <span class="notification-dot"></span>
                    </button>` : ''}

                    ${uiConfig.showSettings ? `
                    <button class="header-icon-btn" data-action="app-settings" title="Configuración">
                        <i class="bi bi-gear-fill"></i>
                    </button>` : ''}
                </div>

                <div class="header-separator"></div>

                <div class="user-profile-wrapper" data-action="toggle-profile-menu">
                    <div class="user-avatar-circle">
                        <span>${userInitials}</span>
                    </div>
                    <div class="user-profile-mini-info /*d-none*/ d-xl-flex">
                        <span class="user-name-mini">${user.name.split(' ')[0]}</span>
                        <span class="user-role-mini">${user.role || 'Admin'}</span>
                    </div>
                    <i class="bi bi-chevron-down dropdown-arrow ms-2"></i>
                    
                    ${profileMenuHTML}
                </div>

            </div>
        </header>
    `;
}