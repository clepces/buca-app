// ======================================================
// ARCHIVO: src/services/modal.service.js
// ACTUALIZACIÓN: Inclusión de openEmployeeModal
// ======================================================
import { state as globalState } from '../store/state.js';
import { Modal } from '../components/Common/Modal.js';

import { ProductForm } from '../components/Products/ProductForm.js';
import { CompanyForm } from '../components/Companies/CompanyForm.js';
import { EmployeeForm } from '../components/Team/EmployeeForm.js';
import { ClientForm } from '../components/People/ClientForm.js';
import { SuperAdminSettings } from '../components/Settings/SuperAdminSettings.js';

import { Logger } from './logger.service.js';
import { fetchCurrentRates, fetchRateHistory } from './rate.service.js';
import { showToast } from './toast.service.js';

import { triggerRerender } from '../store/actions.js';
import { PERMISSIONS } from './roles.config.js';
import { can } from './permissions.service.js';


import { saveState } from './storage.service.js';


// --- MODAL DE CONFIRMACIÓN (PEQUEÑO) ---
export function showConfirmationModal(title, messageHTML, onConfirm, options = {}) {
    const defaults = {
        icon: 'bi bi-exclamation-triangle-fill text-warning',
        confirmText: 'Sí, continuar',
        cancelText: 'Cancelar',
        confirmButtonClass: 'btn-primary',
        cancelButtonClass: 'btn-secondary',
        confirmIcon: 'bi bi-check-lg',
        cancelIcon: 'bi bi-x-lg',
        modalId: 'confirmation-modal'
    };
    const config = { ...defaults, ...options };

    const content = document.createElement('div');
    content.innerHTML = `
        <div style="text-align: center; padding: 1rem 0;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">
                <i class="${config.icon}"></i>
            </div>
            <p style="font-size: 1.1rem; line-height: 1.5; color: var(--bs-gray-700); margin: 0;">
                ${messageHTML}
            </p>
        </div>
    `;

    if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
        content.querySelector('p').style.color = 'var(--bs-gray-300)';
    }

    const confirmButton = document.createElement('button');
    confirmButton.className = config.confirmButtonClass;
    confirmButton.innerHTML = `<i class="${config.confirmIcon} me-1"></i> ${config.confirmText}`;

    const cancelButton = document.createElement('button');
    cancelButton.className = config.cancelButtonClass;
    cancelButton.innerHTML = `<i class="${config.cancelIcon} me-1"></i> ${config.cancelText}`;

    const modal = Modal({
        title: '',
        contentElement: content,
        id: config.modalId,
        size: 'small'
    });

    modal.querySelector('.modal-header').style.borderBottom = 'none';
    modal.querySelector('.modal-header').style.paddingBottom = '0';

    const modalFooterTarget = modal.querySelector('#modal-footer-container');
    if (modalFooterTarget) {
        modalFooterTarget.append(cancelButton, confirmButton);
    }

    const closeModalFunc = () => modal.remove();

    cancelButton.addEventListener('click', closeModalFunc);
    confirmButton.addEventListener('click', () => {
        onConfirm();
        closeModalFunc();
    });

    document.body.appendChild(modal);
}

// --- MODAL DE PRODUCTO (GRANDE) ---
export function openProductModal(productToEdit = null, options = {}) {
    const { isGlobal = false } = options;

    return new Promise((resolve) => {
        const isEditMode = productToEdit !== null;
        const entityName = isGlobal ? 'Plantilla Global' : 'Producto';

        const modalTitle = isEditMode
            ? `<i class="bi bi-pencil-fill me-2"></i> Editar ${entityName}`
            : `<i class="bi bi-plus-circle-fill me-2"></i> Nueva ${entityName}`;

        const dummyContent = document.createElement('div');
        dummyContent.textContent = 'Cargando...';

        const productModalElement = Modal({
            title: modalTitle,
            contentElement: dummyContent,
            id: isEditMode ? 'edit-product-modal' : 'add-product-modal',
            size: 'large'
        });

        const formElement = ProductForm(productToEdit, productModalElement, isGlobal);
        const modalBodyContainer = productModalElement.querySelector('#modal-body-container');

        if (modalBodyContainer) {
            modalBodyContainer.innerHTML = '';
            modalBodyContainer.appendChild(formElement);
        }

        document.body.appendChild(productModalElement);

        const firstInput = formElement.querySelector('input, select');
        if (firstInput) firstInput.focus();

        const originalRemove = productModalElement.remove;
        productModalElement.remove = function () {
            originalRemove.call(this);
            resolve(true);
        };
    });
}

// --- MODAL DE COMPAÑÍA (GRANDE) ---
export function openCompanyModal(companyToEdit = null) {
    return new Promise((resolve) => {
        const isEdit = companyToEdit !== null;
        const modalTitle = isEdit
            ? `<i class="bi bi-pencil-square me-2"></i> Editar Compañía`
            : `<i class="bi bi-building-fill-add me-2"></i> Crear Nueva Compañía`;

        const dummyContent = document.createElement('div');
        dummyContent.textContent = 'Cargando formulario...';

        const companyModalElement = Modal({
            title: modalTitle,
            contentElement: dummyContent,
            id: 'add-company-modal',
            size: 'large'
        });

        const formElement = CompanyForm(companyModalElement, companyToEdit);

        const modalBodyContainer = companyModalElement.querySelector('#modal-body-container');
        if (modalBodyContainer) {
            modalBodyContainer.innerHTML = '';
            modalBodyContainer.appendChild(formElement);
        }

        document.body.appendChild(companyModalElement);

        const firstInput = formElement.querySelector('input, select');
        if (firstInput) firstInput.focus();

        const originalRemove = companyModalElement.remove;
        companyModalElement.remove = function () {
            originalRemove.call(this);
            resolve(true);
        };
    });
}

// --- MODAL DE CLIENTE (MEDIANO) ---
export function openClientModal(clientToEdit = null) {
    return new Promise((resolve) => {
        const isEdit = clientToEdit !== null;
        const modalTitle = isEdit
            ? `<i class="bi bi-person-fill-gear me-2"></i> Editar Cliente`
            : `<i class="bi bi-person-plus-fill me-2"></i> Nuevo Cliente`;

        const dummyContent = document.createElement('div');
        dummyContent.textContent = 'Cargando...';

        const modalElement = Modal({
            title: modalTitle,
            contentElement: dummyContent,
            id: 'client-modal',
            size: 'medium'
        });

        const formElement = ClientForm(modalElement, clientToEdit);
        const body = modalElement.querySelector('#modal-body-container');
        if (body) {
            body.innerHTML = '';
            body.appendChild(formElement);
        }

        // Focus
        const firstInput = formElement.querySelector('input');
        if (firstInput) firstInput.focus();

        document.body.appendChild(modalElement);

        const originalRemove = modalElement.remove;
        modalElement.remove = function () {
            originalRemove.call(this);
            resolve(true);
        };
    });
}

// --- MODAL DE EMPLEADO (MEDIANO) ---
export function openEmployeeModal(employeeToEdit = null) {
    return new Promise((resolve) => {
        const isEditMode = employeeToEdit !== null;

        const modalTitle = isEditMode
            ? `<i class="bi bi-person-gear me-2"></i> Editar Empleado`
            : `<i class="bi bi-person-plus-fill me-2"></i> Nuevo Empleado`;

        const dummyContent = document.createElement('div');
        dummyContent.textContent = 'Cargando formulario...';

        // Creamos el Modal Wrapper
        const modalElement = Modal({
            title: modalTitle,
            contentElement: dummyContent,
            id: isEditMode ? 'edit-employee-modal' : 'add-employee-modal',
            size: 'medium' // Tamaño mediano es suficiente para empleados
        });

        // Instanciamos el Formulario (que ahora usará el Wizard internamente)
        const formElement = EmployeeForm(modalElement, employeeToEdit);

        const modalBodyContainer = modalElement.querySelector('#modal-body-container');

        if (modalBodyContainer) {
            modalBodyContainer.innerHTML = '';
            // Quitamos padding si el wizard lo requiere, o lo dejamos si EmployeeForm lo maneja
            // modalBodyContainer.style.padding = '0'; 
            modalBodyContainer.appendChild(formElement);
        }

        document.body.appendChild(modalElement);

        // Enfocar primer input
        const firstInput = formElement.querySelector('input');
        if (firstInput) firstInput.focus();

        // Manejar cierre para resolver la promesa
        const originalRemove = modalElement.remove;
        modalElement.remove = function () {
            originalRemove.call(this);
            resolve(true); // Resolvemos true indicando que se cerró (puede haber guardado o no)
        };
    });
}

// --- MODAL DE CONFIGURACIÓN GLOBAL (FULLSCREEN) ---
export function openSuperAdminSettingsModal() {
    return new Promise((resolve) => {
        const modalTitle = '<i class="bi bi-shield-lock-fill me-2"></i> Configuración Global';
        const dummyContent = document.createElement('div');
        dummyContent.textContent = 'Cargando configuración...';

        const settingsModalElement = Modal({
            title: modalTitle,
            contentElement: dummyContent,
            id: 'super-admin-settings-modal',
            size: 'fullscreen'
        });

        // 1. Inyectar buscador en header
        const modalHeader = settingsModalElement.querySelector('.modal-header');
        const closeBtn = settingsModalElement.querySelector('.close');
        if (modalHeader && closeBtn) {
            const headerActions = document.createElement('div');
            headerActions.className = 'modal-header-actions';
            headerActions.innerHTML = `
                <div class="search-container">
                    <i class="bi bi-search search-icon"></i>
                    <input type="search" id="search-settings" class="form-control" placeholder="Buscar ajustes (próximamente)..." disabled>
                </div>
            `;
            modalHeader.insertBefore(headerActions, closeBtn);
        }

        const modalBody = settingsModalElement.querySelector('#modal-body-container');
        modalBody.style.padding = '0';

        // 2. Inyectar componente de settings
        const { element: settingsElement, getSettingsData } = SuperAdminSettings(settingsModalElement);

        if (modalBody) {
            modalBody.innerHTML = '';
            modalBody.appendChild(settingsElement);
        }

        // 3. Crear Footer y Botones
        const modalFooterTarget = settingsModalElement.querySelector('#modal-footer-container');

        const saveButton = document.createElement('button');
        saveButton.className = 'btn-primary';
        saveButton.innerHTML = `<i class="bi bi-save-fill me-1"></i> Guardar Cambios`;
        saveButton.id = 'btn-save-global-settings';

        const cancelButton = document.createElement('button');
        cancelButton.className = 'btn-secondary';
        cancelButton.innerHTML = `Cancelar`;

        modalFooterTarget.append(cancelButton, saveButton);

        // --- 4. LÓGICA DE GUARDADO CORREGIDA ---
        saveButton.addEventListener('click', async () => {
            // Añadimos estado de carga al botón
            const originalBtnText = saveButton.innerHTML;
            saveButton.innerHTML = `<i class="bi bi-hourglass-split animate-spin me-1"></i> Guardando...`;
            saveButton.disabled = true;

            try {
                const data = getSettingsData();
                Logger.info('Guardando configuración global...', data);

                // A) Actualizar estado local
                if (!globalState.settings.appConfig.system) globalState.settings.appConfig.system = {};
                if (!globalState.settings.appConfig.system.metadata) globalState.settings.appConfig.system.metadata = {};

                globalState.settings.appConfig.system.metadata.appNameSimplify = data.appName;
                globalState.settings.appConfig.system.metadata.appName = data.appNameFull;
                globalState.settings.products.tax_rate = data.defaultTax;
                globalState.settings.products.available_categories = data.defaultCategories;

                // ✅ CLAVE: Guardar Apariencia
                if (data.appearance) {
                    globalState.settings.appearance = data.appearance;
                }

                // B) Persistir en DB (Firebase/IndexedDB)
                await saveState(globalState);

                showToast('Configuración guardada exitosamente.', 'success');
                settingsModalElement.remove();

                // C) Refrescar UI (Header, etc.)
                triggerRerender();

            } catch (error) {
                Logger.error('Error al guardar configuración:', error);
                showToast('Error al guardar: ' + error.message, 'error');

                // Restaurar botón en caso de error
                saveButton.innerHTML = originalBtnText;
                saveButton.disabled = false;
            }
        });

        cancelButton.addEventListener('click', () => {
            settingsModalElement.remove();
        });

        document.body.appendChild(settingsModalElement);

        const originalRemove = settingsModalElement.remove;
        settingsModalElement.remove = function () {
            originalRemove.call(this);
            resolve(true);
        };
    });
}

// --- MODAL DE TASA (GRANDE) ---
export function openRateUpdateModal() {
    if (!can(PERMISSIONS.EDIT_SETTINGS_BUSINESS) && !can(PERMISSIONS.EDIT_SETTINGS_SYSTEM)) {
        Logger.warn('Intento de abrir modal de tasa sin permisos.');
        return;
    }

    function formatFintechRate(rate, symbol) {
        const rateStr = rate.toString();
        const parts = rateStr.split('.');
        const integer = parts[0];
        const fraction = parts[1] || '00';
        const mainFraction = fraction.substring(0, 2);
        const extraFraction = fraction.substring(2);

        return `
            <span class="fintech-rate">
                <span class="fintech-symbol">${symbol}</span>
                <span class="fintech-integer">${integer}</span>
                <span class="fintech-decorator">.</span>
                <span class="fintech-fraction">${mainFraction}</span>
                ${extraFraction ? `<span class="fintech-extra">${extraFraction}</span>` : ''}
            </span>
        `;
    }

    const simboloBase = globalState.settings.currencies.base.symbol || 'Bs.';
    const currentRate = globalState.settings.currencies.principal.rate;

    const content = document.createElement('div');
    content.style.width = '100%';

    content.innerHTML = `
        <div id="temp-header-widget" style="display:none;">
            <div class="header-status-widget">
                <span class="status-wifi" id="wifi-status-icon" title="Comprobando...">
                    <i class="bi bi-question-circle"></i>
                </span>
                <span class="status-clock" id="live-clock">--:--:--</span>
            </div>
        </div>

        <div class="rate-modal-grid">
            <div class="rate-control-panel">
                <div class="rate-hero-card">
                    <span class="hero-badge"><i class="bi bi-lightning-charge-fill"></i> Tasa Automática</span>
                    <div class="hero-amount" id="hero-rate-display">
                        ${formatFintechRate(currentRate, simboloBase)}
                        </div>
                    <div class="hero-date" id="hero-rate-date">
                        Verificando conexión...
                    </div>
                    <div id="api-loading-spinner" style="display:none; margin-top:0.5rem; color: var(--primary-color);">
                        <small><i class="bi bi-arrow-repeat animate-spin"></i> Sincronizando...</small>
                    </div>
                </div>

                <div class="manual-input-card">
                    <div class="manual-header">
                        <h5><i class="bi bi-sliders"></i> Ajuste Manual</h5>
                    </div>
                    <div class="fintech-input-group">
                        <span>${simboloBase}</span>
                        <input type="number" step="any" id="manual-rate-input" 
                            value="${currentRate.toString()}" 
                            placeholder="0.0000">
                        </div>
                    <div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--bs-gray-500);">
                        <i class="bi bi-info-circle-fill me-1"></i> 
                        Este valor prevalecerá para todos los cálculos.
                    </div>
                </div>
            </div>

            <div class="history-panel-card">
                <div class="history-header-panel">
                    <h5><i class="bi bi-graph-up"></i> Tendencia de Mercado</h5>
                </div>
                <ul class="history-list custom-scrollbar" id="rate-history-list">
                    <li class="history-empty-state">
                        <div class="spinner"></div>
                        <span style="margin-top: 1rem;">Cargando...</span>
                    </li>
                    </ul>
            </div>
        </div>
    `;

    const saveButton = document.createElement('button');
    saveButton.className = 'btn-primary';
    saveButton.innerHTML = `<i class="bi bi-check-lg me-1"></i> Aplicar Nueva Tasa`;

    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn-secondary';
    cancelButton.innerHTML = `Cerrar`;

    const footerContainer = document.createElement('div');
    footerContainer.id = "modal-footer-container";
    footerContainer.append(cancelButton, saveButton);

    const modal = Modal({
        title: `<i class="bi bi-currency-exchange me-2"></i> Gestión de Tasa`,
        contentElement: content,
        id: 'rate-update-modal',
        size: 'large'
    });

    const modalFooterSlot = modal.querySelector('.modal-footer');
    if (modalFooterSlot) {
        modalFooterSlot.innerHTML = '';
        modalFooterSlot.appendChild(footerContainer);
    }

    const headerWidget = content.querySelector('#temp-header-widget').firstElementChild;
    const modalHeader = modal.querySelector('.modal-header');
    const closeBtn = modal.querySelector('.close');
    if (modalHeader && closeBtn) {
        modalHeader.insertBefore(headerWidget, closeBtn);
    }

    const wifiIcon = headerWidget.querySelector('#wifi-status-icon');
    const heroDateDisplay = content.querySelector('#hero-rate-date');

    const updateConnectivityUI = () => {
        const isOnline = navigator.onLine;
        wifiIcon.className = isOnline ? 'status-wifi online' : 'status-wifi offline';
        wifiIcon.innerHTML = isOnline ? '<i class="bi bi-wifi"></i>' : '<i class="bi bi-wifi-off"></i>';
        wifiIcon.title = isOnline ? 'En línea' : 'Sin conexión';

        if (!isOnline) {
            heroDateDisplay.innerHTML = `<span class="text-danger">● Offline</span> • Sin conexión a API`;
        } else {
            if (heroDateDisplay.innerText.includes('Offline')) {
                heroDateDisplay.innerHTML = `<span class="text-success">● En línea</span> • Listo para sincronizar`;
            }
        }
    };

    window.addEventListener('online', updateConnectivityUI);
    window.addEventListener('offline', updateConnectivityUI);
    updateConnectivityUI();

    const clockEl = headerWidget.querySelector('#live-clock');
    const updateClock = () => {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString('es-VE', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
    const clockInterval = setInterval(updateClock, 1000);
    updateClock();

    const originalRemove = modal.remove;
    modal.remove = function () {
        clearInterval(clockInterval);
        window.removeEventListener('online', updateConnectivityUI);
        window.removeEventListener('offline', updateConnectivityUI);
        originalRemove.call(this);
    };

    const performSave = (newRate) => {
        const finalRate = parseFloat(newRate);
        globalState.settings.currencies.principal.rate = finalRate;

        // Persistir Tasa
        saveState(globalState);
        localStorage.setItem('buca_last_known_rate_usd', finalRate.toString());

        Logger.info(`Tasa aplicada correctamente: ${finalRate}`);
        triggerRerender();
        showToast(`Tasa actualizada a ${simboloBase} ${finalRate.toString()}`, 'success');
        modal.remove();
    };

    saveButton.addEventListener('click', () => {
        const input = content.querySelector('#manual-rate-input');
        const newRate = parseFloat(input.value);
        const oldRate = globalState.settings.currencies.principal.rate;

        if (isNaN(newRate) || newRate <= 0) {
            showToast('Ingresa un número válido.', 'warning');
            return;
        }

        const diffPercent = Math.abs((newRate - oldRate) / oldRate);
        if (diffPercent > 0.10) {
            showConfirmationModal(
                '¿Cambio significativo?',
                `La nueva tasa varía un <strong>${(diffPercent * 100).toFixed(0)}%</strong>. ¿Confirmar?`,
                () => performSave(newRate),
                { confirmText: 'Sí, aplicar', confirmButtonClass: 'btn-warning' }
            );
        } else {
            performSave(newRate);
        }
    });

    cancelButton.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);

    if (navigator.onLine) {
        const spinner = content.querySelector('#api-loading-spinner');
        const heroRateDisplay = content.querySelector('#hero-rate-display');

        spinner.style.display = 'block';

        fetchCurrentRates().then(data => {
            spinner.style.display = 'none';
            const apiRate = parseFloat(data.current.usd);
            const apiDate = new Date(data.current.date + 'T12:00:00');

            if (!isNaN(apiRate)) {
                heroRateDisplay.innerHTML = formatFintechRate(apiRate, simboloBase);
                const dateStr = apiDate.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' });
                heroDateDisplay.innerHTML = `<span class="text-success">● En línea</span> • Oficial: <strong>${dateStr}</strong>`;

                const input = content.querySelector('#manual-rate-input');
                if (input && Math.abs(parseFloat(input.value) - currentRate) < 0.01) {
                    input.value = apiRate.toString();
                }
            }
        }).catch(() => {
            spinner.style.display = 'none';
            heroDateDisplay.innerHTML = `<span class="text-warning">● API Inaccesible</span>`;
        });

        fetchRateHistory(6).then(history => {
            const listEl = content.querySelector('#rate-history-list');
            if (history && history.length > 0) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                listEl.innerHTML = history.map((item, index) => {
                    const prevItem = history[index + 1];
                    const dateObj = new Date(`${item.date}T12:00:00`);
                    const itemDate = new Date(`${item.date}T00:00:00`);

                    let dayBadgeHTML = '';
                    let rowClass = '';

                    if (itemDate > today) {
                        dayBadgeHTML = `<span class="day-badge tomorrow">Mañana</span>`;
                        rowClass = 'is-active-day';
                    } else if (itemDate.getTime() === today.getTime()) {
                        dayBadgeHTML = `<span class="day-badge today">Hoy</span>`;
                    }

                    const dayName = dateObj.toLocaleDateString('es-VE', { weekday: 'long' });
                    const fullDate = dateObj.toLocaleDateString('es-VE', { day: 'numeric', month: 'long' });
                    const val = parseFloat(item.usd);

                    let percentHTML = '';
                    if (prevItem) {
                        const prevVal = parseFloat(prevItem.usd);
                        const diff = ((val - prevVal) / prevVal) * 100;
                        const isPositive = diff > 0;
                        const icon = isPositive ? 'bi-caret-up-fill' : (diff === 0 ? 'bi-dash' : 'bi-caret-down-fill');
                        const cssClass = isPositive ? 'positive' : (diff === 0 ? 'neutral' : 'negative');
                        percentHTML = `
                            <span class="rate-change ${cssClass}">
                                <i class="bi ${icon}"></i> ${Math.abs(diff).toFixed(2)}%
                            </span>
                        `;
                    }

                    return `
                    <li class="history-item ${rowClass}">
                        <div class="date-col">
                            <span class="day-name">${dayName} ${dayBadgeHTML}</span>
                            <span class="full-date">${fullDate}</span>
                        </div>
                        <div class="val-col">
                            <span class="rate-val">${formatFintechRate(val, simboloBase)}</span>
                            ${percentHTML}
                        </div>
                    </li>`;
                }).join('');
            } else {
                listEl.innerHTML = `<li class="history-empty-state"><i class="bi bi-info-circle"></i><span>Sin historial disponible.</span></li>`;
            }
        });
    } else {
        const listEl = content.querySelector('#rate-history-list');
        listEl.innerHTML = `
            <li class="history-empty-state">
                <i class="bi bi-wifi-off"></i>
                <span>Sin conexión para cargar historial.</span>
            </li>
        `;
    }
}