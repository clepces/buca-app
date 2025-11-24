import { CategoryManager } from './CategoryManager.js';
import { state as globalState } from '../../store/state.js';
import { sanitizeHTML } from '../../utils/sanitize.js';

export function SuperAdminSettings(modalElementRef) {
    const element = document.createElement('div');
    element.className = 'settings-layout';

    const appConfig = globalState.settings.appConfig || {};
    const appName = appConfig.system?.metadata?.appNameSimplify || 'B.U.C.A';
    const appNameFull = appConfig.system?.metadata?.appName || 'Business Under Control Access';
    const defaultTax = globalState.settings.products.tax_rate || 16;
    
    // 1. Leer configuración actual de apariencia
    const appearanceConfig = globalState.settings.appearance?.header || {
        showFullscreen: true, showMessages: true, showNotifications: true, 
        showSettings: true, showRate: true, showLanguage: true
    };

    const currentCategories = Array.isArray(globalState.settings.products.available_categories) 
        ? globalState.settings.products.available_categories 
        : ['General'];

    const categoryManager = CategoryManager(currentCategories);

    const renderMaintenanceState = (title, msg) => `
        <div class="maintenance-state">
            <i class="bi bi-cone-striped maintenance-icon animate-pulse"></i>
            <h3>${title}</h3>
            <p class="text-muted">${msg}</p>
            <button class="btn-secondary mt-4" disabled>Notificarme cuando esté listo</button>
        </div>
    `;
    // --- FUNCIÓN HELPER PARA RENDERIZAR SWITCHES ---
    const renderSwitch = (id, title, desc, isChecked) => `
        <label class="form-switch" for="${id}">
            <div class="switch-label-group">
                <span class="switch-title">${title}</span>
                <span class="switch-desc">${desc}</span>
            </div>
            <input type="checkbox" id="${id}" class="form-check-input" ${isChecked ? 'checked' : ''}>
        </label>
        <hr style="margin: 0.5rem 0; border-color: var(--bs-border-color); opacity: 0.5;">
    `;
    element.innerHTML = `
        <nav class="settings-nav custom-scrollbar">
            <div class="nav-section-title">Sistema</div>
            <button class="settings-nav-item active" data-panel="panel-general">
                <i class="bi bi-sliders"></i> General
            </button>
            <button class="settings-nav-item" data-panel="panel-defaults">
                <i class="bi bi-box-seam"></i> Valores por Defecto
            </button>
            
            <div class="nav-section-title">Negocio</div>
            <button class="settings-nav-item" data-panel="panel-plans">
                <i class="bi bi-credit-card-2-front"></i> Planes y Suscripción
            </button>
            <button class="settings-nav-item" data-panel="panel-integrations">
                <i class="bi bi-plugin"></i> Integraciones 
                <span class="badge bg-warning-subtle text-warning-emphasis ms-auto">WIP</span>
            </button>
            
            <div class="nav-section-title">Personalización</div>
            <button class="settings-nav-item" data-panel="panel-appearance">
                <i class="bi bi-palette"></i> Apariencia 
                <!--<span class="badge bg-warning-subtle text-warning-emphasis ms-auto">WIP</span>-->
            </button>
        </nav>

        <div class="settings-content custom-scrollbar">

            <div id="panel-general" class="settings-panel active">
                <div class="settings-header-block">
                    <h2>Configuración General</h2>
                    <p>Define la identidad básica de la plataforma.</p>
                </div>
                <div class="config-box">
                    <div class="config-box-header">
                        <i class="bi bi-globe"></i>
                        <h3>Identidad del Sitio</h3>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Nombre Corto (Header)</label>
                                <input type="text" id="setting-app-name" class="form-control" value="${sanitizeHTML(appName)}">
                                <small class="text-muted">Visible en la barra superior móvil.</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Nombre Completo (Login)</label>
                                <input type="text" id="setting-app-name-full" class="form-control" value="${sanitizeHTML(appNameFull)}">
                                <small class="text-muted">Visible en la pantalla de inicio de sesión.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="panel-defaults" class="settings-panel" style="display: none;">

                <div class="settings-header-block">
                    <h2>Valores por Defecto</h2>
                    <p>Configura los parámetros iniciales para nuevos productos y negocios.</p>
                </div>
                <div class="config-box">
                    <div class="config-box-header">
                        <i class="bi bi-tags-fill"></i>
                        <h3>Categorías de Producto</h3>
                    </div>
                    <p class="text-muted mb-3">Estas categorías aparecerán sugeridas al crear un nuevo producto.</p>
                    <div id="category-manager-container"></div>
                </div>

                <div class="config-box">
                    <div class="config-box-header">
                        <i class="bi bi-percent"></i>
                        <h3>Impuestos (IVA)</h3>
                    </div>
                    <div class="form-group" style="max-width: 300px;">
                        <label>Tasa de IVA Global (%)</label>
                        <div class="input-group">
                            <input type="number" id="setting-default-tax" class="form-control" value="${defaultTax}">
                            <span class="input-group-text">%</span>
                        </div>
                        <small class="text-muted">Esta tasa se aplicará si el negocio no define una propia.</small>
                    </div>
                </div>

            </div>

            <div id="panel-plans" class="settings-panel" style="display: none;">
                ${renderMaintenanceState('Gestión de Planes', 'Estamos rediseñando el módulo de suscripciones para ofrecer facturación recurrente.')}
            </div>
            <div id="panel-integrations" class="settings-panel" style="display: none;">
                ${renderMaintenanceState('Integraciones API', 'Próximamente podrás conectar pasarelas de pago y servicios de envío.')}
            </div>

            <div id="panel-appearance" class="settings-panel" style="display: none;">
                <div class="settings-header-block">
                    <h2>Personalización de Interfaz</h2>
                    <p>Controla qué elementos son visibles en la barra superior (Header).</p>
                </div>

                <div class="config-box">
                    <div class="config-box-header">
                        <i class="bi bi-layout-text-window-reverse"></i>
                        <h3>Acciones de Cabecera</h3>
                    </div>
                    <div class="p-2">
                        ${renderSwitch('toggle-show-fullscreen', 'Pantalla Completa', 'Botón para expandir la vista', appearanceConfig.showFullscreen)}
                        ${renderSwitch('toggle-show-rate', 'Widget de Tasa BCV', 'Muestra la tasa de cambio actual', appearanceConfig.showRate)}
                        ${renderSwitch('toggle-show-language', 'Selector de Idioma', 'Bandera y menú de región', appearanceConfig.showLanguage)}
                        ${renderSwitch('toggle-show-messages', 'Mensajes (WIP)', 'Acceso directo a bandeja de entrada', appearanceConfig.showMessages)}
                        ${renderSwitch('toggle-show-notifications', 'Notificaciones', 'Campana de alertas del sistema', appearanceConfig.showNotifications)}
                        ${renderSwitch('toggle-show-settings', 'Acceso Rápido Configuración', 'Engranaje de ajustes directos', appearanceConfig.showSettings)}
                    </div>
                </div>
            </div>
            
        </div>

        <nav class="settings-quick-nav">
            <button class="quick-nav-item" data-tippy-content="Seguridad" data-tippy-placement="left"><i class="bi bi-shield-lock"></i></button>
            <button class="quick-nav-item" data-tippy-content="Base de Datos" data-tippy-placement="left"><i class="bi bi-database"></i></button>
            <button class="quick-nav-item" data-tippy-content="Logs del Sistema" data-tippy-placement="left"><i class="bi bi-terminal"></i></button>
        </nav>
    `;

    element.querySelector('#category-manager-container').appendChild(categoryManager.element);

    const navItems = element.querySelectorAll('.settings-nav-item');
    const panels = element.querySelectorAll('.settings-panel');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.dataset.panel;
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            panels.forEach(p => {
                p.style.display = (p.id === targetId) ? 'block' : 'none';
                if(p.id === targetId) p.classList.add('active');
            });
        });
    });

    return {
        element,
        getSettingsData: () => ({
            appName: sanitizeHTML(element.querySelector('#setting-app-name').value),
            appNameFull: sanitizeHTML(element.querySelector('#setting-app-name-full').value),
            defaultTax: parseFloat(element.querySelector('#setting-default-tax').value) || 0,
            defaultCategories: categoryManager.getCategories(),
            
            // NUEVO: Retornar objeto de apariencia
            appearance: {
                header: {
                    showFullscreen: element.querySelector('#toggle-show-fullscreen').checked,
                    showRate: element.querySelector('#toggle-show-rate').checked,
                    showLanguage: element.querySelector('#toggle-show-language').checked,
                    showMessages: element.querySelector('#toggle-show-messages').checked,
                    showNotifications: element.querySelector('#toggle-show-notifications').checked,
                    showSettings: element.querySelector('#toggle-show-settings').checked
                }
            }
        })
    };
}