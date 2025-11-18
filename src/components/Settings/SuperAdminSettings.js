// ======================================================
// ARCHIVO: src/components/Settings/SuperAdminSettings.js
// PROPÓSITO: UI del modal de Configuración Global (Super Admin)
// VERSIÓN 2.0: Layout de 3 columnas y Gestor de Categorías
// ======================================================

import { Logger } from '../../services/logger.service.js';
import { state as globalState } from '../../store/state.js';
import { sanitizeHTML } from '../../utils/sanitize.js';
// --- ¡NUEVA IMPORTACIÓN! ---
import { CategoryManager } from './CategoryManager.js';

export function SuperAdminSettings(modalElementRef) {
    const element = document.createElement('div');
    element.className = 'settings-layout'; // Layout principal de 3 columnas
    
    // Leemos la configuración global
    const appConfig = globalState.settings.appConfig || {};
    
    // Obtenemos los valores actuales
    const appName = appConfig.system?.metadata?.appNameSimplify || 'B.U.C.A';
    const appNameFull = appConfig.system?.metadata?.appName || 'Business Under Control Access';
    // --- ¡CAMBIO! Pasamos las categorías al nuevo componente ---
    const defaultCategories = globalState.settings.products.available_categories;
    const defaultTax = globalState.settings.products.tax_rate;

    // --- ¡NUEVO! Instanciamos el gestor de categorías ---
    const categoryManager = CategoryManager(defaultCategories);

    element.innerHTML = `
        <nav class="settings-nav">
            <span class="nav-title">Configuración</span>
            <button class="settings-nav-item active" data-panel="panel-general">
                <i class="bi bi-gear-fill"></i>
                <span>General</span>
            </button>
            <button class="settings-nav-item" data-panel="panel-defaults">
                <i class="bi bi-box-seam"></i>
                <span>Valores por Defecto</span>
            </button>
            <button class="settings-nav-item" data-panel="panel-plans">
                <i class="bi bi-gem"></i>
                <span>Planes y Suscripción</span>
            </button>
            <button class="settings-nav-item" data-panel="panel-integrations" disabled>
                <i class="bi bi-plugin"></i>
                <span>Integraciones</span>
            </button>
            <button class="settings-nav-item" data-panel="panel-appearance" disabled>
                <i class="bi bi-palette-fill"></i>
                <span>Apariencia</span>
            </button>
        </nav>

        <div class="settings-content custom-scrollbar">
            
            <div id="panel-general" class="settings-panel active">
                <div class="summary-card-premium">
                    <div class="card-premium-header">
                        <i class="bi bi-gear-fill"></i>
                        <span>Configuración General del Sistema</span>
                    </div>
                    <div class="card-premium-body">
                        <div class="form-group">
                            <label for="setting-app-name">Nombre Corto (Header)</label>
                            <input type="text" id="setting-app-name" value="${sanitizeHTML(appName)}">
                        </div>
                        <div class="form-group">
                            <label for="setting-app-name-full">Nombre Completo (Login)</label>
                            <input type="text" id="setting-app-name-full" value="${sanitizeHTML(appNameFull)}">
                        </div>
                    </div>
                </div>
            </div>

            <div id="panel-defaults" class="settings-panel" style="display: none;">
                <div class="summary-card-premium">
                    <div class="card-premium-header">
                        <i class="bi bi-box-seam"></i>
                        <span>Valores por Defecto (Nuevos Negocios)</span>
                    </div>
                    <div class="card-premium-body">
                        <div class="form-group">
                            <label>Categorías de Producto</label>
                            <div id="category-manager-container"></div>
                        </div>
                        <div class="form-group">
                            <label for="setting-default-tax">Tasa de IVA (%) por Defecto</label>
                            <input type="number" id="setting-default-tax" value="${defaultTax}">
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="panel-plans" class="settings-panel" style="display: none;">
                 </div>

            </div>

        <nav class="settings-quick-nav">
            <span class="nav-title">Atajos</span>
            <button class="quick-nav-item" data-tippy-content="Seguridad" data-tippy-placement="left">
                <i class="bi bi-shield-lock-fill"></i>
            </button>
            <button class="quick-nav-item" data-tippy-content="API Keys" data-tippy-placement="left">
                <i class="bi bi-key-fill"></i>
            </button>
            <button class="quick-nav-item" data-tippy-content="Facturación" data-tippy-placement="left">
                <i class="bi bi-credit-card-fill"></i>
            </button>
        </nav>
    `;

    // --- ¡NUEVO! Inyectar el gestor de categorías ---
    element.querySelector('#category-manager-container').appendChild(categoryManager.element);

    // --- Lógica de Navegación Interna (sin cambios) ---
    const navItems = element.querySelectorAll('.settings-nav-item');
    const panels = element.querySelectorAll('.settings-panel');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.disabled) return;
            const targetPanelId = item.dataset.panel;
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            panels.forEach(p => {
                p.style.display = (p.id === targetPanelId) ? 'block' : 'none';
            });
        });
    });

    // --- ¡CORRECCIÓN! Se eliminan los listeners de 'saveButton' y 'cancelButton' ---

    // --- ¡NUEVO! Devolvemos el elemento y un "getter" de datos ---
    return {
        element,
        getSettingsData: () => {
            return {
                appName: sanitizeHTML(element.querySelector('#setting-app-name').value),
                appNameFull: sanitizeHTML(element.querySelector('#setting-app-name-full').value),
                defaultTax: parseFloat(element.querySelector('#setting-default-tax').value) || 16,
                defaultCategories: categoryManager.getCategories() // Obtenemos del sub-componente
            };
        }
    };
}