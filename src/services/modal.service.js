// ======================================================
// ARCHIVO: src/services/modal.service.js
// PROPÓSITO: Gestión centralizada de ventanas modales.
// ======================================================

import { state } from '../store/state.js';
import { Modal } from '../components/Modal.js';
import { ProductForm } from '../components/ProductForm.js';
import { Logger } from './logger.service.js';
import { fetchCurrentRates, fetchRateHistory } from './rate.service.js';
import { showToast } from './toast.service.js';
import { triggerRerender } from '../store/actions.js';
import { PERMISSIONS } from './roles.config.js';
import { can } from './permissions.service.js';

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
    content.innerHTML = `<p style="font-size: 1.1rem; line-height: 1.6; color: var(--bs-gray-700);">${messageHTML}</p>`;
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
        title: `<i class="${config.icon} me-2"></i> ${title}`,
        contentElement: content,
        id: config.modalId
    });

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

export function openProductModal(productToEdit = null) {
    return new Promise((resolve) => {
        const isEditMode = productToEdit !== null;
        const modalTitle = isEditMode 
            ? `<i class="bi bi-pencil-fill me-2"></i> Editar Producto`
            : '<i class="bi bi-plus-circle-fill me-2"></i> Añadir Nuevo Producto';
        const modalId = isEditMode ? 'edit-product-modal' : 'add-product-modal';

        const dummyContent = document.createElement('div');
        dummyContent.textContent = 'Cargando formulario...';

        const productModalElement = Modal({
            title: modalTitle,
            contentElement: dummyContent,
            id: modalId
        });

        const formElement = ProductForm(productToEdit, productModalElement);
        const modalBodyContainer = productModalElement.querySelector('#modal-body-container');
        
        if (modalBodyContainer) {
            modalBodyContainer.innerHTML = '';
            modalBodyContainer.appendChild(formElement);
        }

        document.body.appendChild(productModalElement);

        const firstInput = formElement.querySelector('input, select');
        if (firstInput) firstInput.focus();
        
        const originalRemove = productModalElement.remove;
        productModalElement.remove = function() {
            originalRemove.call(this);
            resolve(true);
        };
    });
}

export function openRateUpdateModal() {
    
    if (!can(PERMISSIONS.EDIT_SETTINGS_BUSINESS) && !can(PERMISSIONS.EDIT_SETTINGS_SYSTEM)) {
        Logger.warn('Intento de abrir modal de tasa sin permisos.');
        return;
    }

    const simboloBase = state.settings.currencies.base.symbol || 'Bs.';
    const currentRate = state.settings.currencies.principal.rate;
    
    // Crear contenedor del modal
    const content = document.createElement('div');
    content.style.width = '100%';

    // HTML Estructura Refinada
    content.innerHTML = `
        <div id="temp-header-widget" style="display:none;">
            <div class="header-status-widget">
                <span class="status-wifi online" id="wifi-status-icon"><i class="bi bi-wifi"></i></span>
                <span class="status-clock" id="live-clock">--:--:--</span>
            </div>
        </div>

        <div class="rate-modal-grid">
            
            <div class="rate-control-panel">
                
                <div class="rate-hero-card">
                    <span class="hero-badge"><i class="bi bi-lightning-charge-fill"></i> Tasa Automática</span>
                    <div class="hero-amount" id="hero-rate-display">
                        ${simboloBase} ${currentRate.toFixed(2)}
                    </div>
                    <div class="hero-date" id="hero-rate-date">
                        Sincronizando...
                    </div>
                    <div id="api-loading-spinner" style="display:none; margin-top:0.5rem; color: var(--primary-color);">
                        <small><i class="bi bi-arrow-repeat animate-spin"></i> Buscando actualización...</small>
                    </div>
                </div>

                <div class="manual-input-card">
                    <div class="manual-header">
                        <h5><i class="bi bi-sliders"></i> Ajuste Manual</h5>
                    </div>
                    <div class="fintech-input-group">
                        <span>${simboloBase}</span>
                        <input type="number" step="0.01" id="manual-rate-input" 
                               value="${currentRate.toFixed(2)}" placeholder="0.00">
                    </div>
                    <div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--bs-gray-500); line-height: 1.4;">
                        <i class="bi bi-info-circle-fill me-1"></i> 
                        Al guardar, este valor se usará inmediatamente para todos los cálculos.
                    </div>
                </div>

            </div>

            <div class="history-panel-card">
                <div class="history-header-panel">
                    <h5><i class="bi bi-graph-up"></i> Tendencia de Mercado</h5>
                </div>
                <ul class="history-list custom-scrollbar" id="rate-history-list">
                    <li class="history-item"><span class="text-muted">Cargando datos...</span></li>
                </ul>
            </div>

        </div>
    `;

    // --- Botones ---
    const saveButton = document.createElement('button');
    saveButton.className = 'btn-primary';
    saveButton.innerHTML = `<i class="bi bi-check-lg me-1"></i> Aplicar Nueva Tasa`;
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn-secondary';
    cancelButton.innerHTML = `Cerrar`;

    // IMPORTANTE: Crear un contenedor con display flex para el gap
    const footerContainer = document.createElement('div');
    footerContainer.id = "modal-footer-container"; // ID para el CSS
    footerContainer.append(cancelButton, saveButton);

    const modal = Modal({
        title: `<i class="bi bi-currency-exchange me-2"></i> Gestión de Tasa`,
        contentElement: content,
        id: 'rate-update-modal'
    });
    
    // Reemplazar el footer container por defecto o añadirle al existente
    const modalFooterSlot = modal.querySelector('.modal-footer');
    if (modalFooterSlot) {
        modalFooterSlot.innerHTML = ''; // Limpiar
        modalFooterSlot.appendChild(footerContainer);
    }

    // --- Inyectar Widget en Header ---
    // Movemos el widget de reloj/wifi al header del modal
    const headerWidget = content.querySelector('#temp-header-widget').firstElementChild;
    const modalHeader = modal.querySelector('.modal-header');
    const closeBtn = modal.querySelector('.close');
    if (modalHeader && closeBtn) {
        modalHeader.insertBefore(headerWidget, closeBtn);
    }

    // --- Reloj en Vivo ---
    const updateClock = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-VE', { hour12: true, hour: '2-digit', minute:'2-digit', second:'2-digit' });
        const clockEl = headerWidget.querySelector('#live-clock');
        if (clockEl) clockEl.textContent = timeString;
        
        // Estado WiFi (Simulado basado en navegador)
        const wifiIcon = headerWidget.querySelector('#wifi-status-icon');
        if (navigator.onLine) {
            wifiIcon.className = 'status-wifi online';
            wifiIcon.innerHTML = '<i class="bi bi-wifi"></i>';
        } else {
            wifiIcon.className = 'status-wifi offline';
            wifiIcon.innerHTML = '<i class="bi bi-wifi-off"></i>';
        }
    };
    const clockInterval = setInterval(updateClock, 1000);
    updateClock(); // Ejecutar ya

    // Limpiar intervalo al cerrar
    const originalRemove = modal.remove;
    modal.remove = function() {
        clearInterval(clockInterval);
        originalRemove.call(this);
    };

    // --- Lógica de Guardado ---
    const performSave = (newRate) => {
        try {
            state.settings.currencies.principal.rate = newRate;
            localStorage.setItem('buca_last_known_rate_usd', newRate.toString());
            Logger.info(`Tasa actualizada manualmente a: ${newRate}`);
            triggerRerender(); 
            showToast(`Tasa actualizada a ${simboloBase} ${newRate.toFixed(2)}`, 'success');
            modal.remove();
        } catch (e) {
            Logger.error('Error al guardar la tasa', e);
            showToast('No se pudo guardar la tasa.', 'error');
        }
    };

    saveButton.addEventListener('click', () => {
        const input = content.querySelector('#manual-rate-input');
        const newRate = parseFloat(input.value);
        const oldRate = state.settings.currencies.principal.rate;

        if (isNaN(newRate) || newRate <= 0) {
            showToast('Ingresa un número válido.', 'warning');
            return;
        }

        const diffPercent = Math.abs((newRate - oldRate) / oldRate);
        if (diffPercent > 0.10) {
            showConfirmationModal(
                '¿Cambio significativo?',
                `La nueva tasa varía un <strong>${(diffPercent*100).toFixed(0)}%</strong>. ¿Confirmar?`,
                () => performSave(newRate),
                { confirmText: 'Sí, aplicar', confirmButtonClass: 'btn-warning' }
            );
        } else {
            performSave(newRate);
        }
    });

    cancelButton.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);

    // --- Carga de Datos ---
    const spinner = content.querySelector('#api-loading-spinner');
    const heroRateDisplay = content.querySelector('#hero-rate-display');
    const heroDateDisplay = content.querySelector('#hero-rate-date');
    
    spinner.style.display = 'block';

    // 1. Tasa Actual
    fetchCurrentRates().then(data => {
        spinner.style.display = 'none';
        const apiRate = parseFloat(data.current.usd);
        const apiDate = new Date(data.current.date + 'T12:00:00'); 
        
        if (!isNaN(apiRate)) {
            heroRateDisplay.textContent = `${simboloBase} ${apiRate.toFixed(2)}`;
            // Formato: Jueves, 13 de noviembre
            const dateStr = apiDate.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' });
            heroDateDisplay.innerHTML = `<span class="text-success">● En línea</span> • Oficial para: <strong>${dateStr}</strong>`;
            
            const input = content.querySelector('#manual-rate-input');
            if(input && Math.abs(parseFloat(input.value) - currentRate) < 0.01) {
                input.value = apiRate.toFixed(2);
            }
        }
    }).catch(() => {
        spinner.style.display = 'none';
        heroDateDisplay.innerHTML = `<span class="text-danger">● Offline</span> • Usando memoria local`;
    });

    // 2. Historial Inteligente (Mañana vs Hoy)
    fetchRateHistory(6).then(history => {
        const listEl = content.querySelector('#rate-history-list');
        if (history && history.length > 0) {
            
            const today = new Date();
            today.setHours(0,0,0,0); // Normalizar hoy a medianoche

            listEl.innerHTML = history.map((item, index) => {
                // Comparación con el siguiente día (que es más viejo en la lista) para el %
                const prevItem = history[index + 1]; 
                
                const dateObj = new Date(`${item.date}T12:00:00`);
                const itemDate = new Date(`${item.date}T00:00:00`); // Para comparar fechas
                
                // Lógica de etiquetas de día
                let dayBadgeHTML = '';
                let rowClass = '';

                if (itemDate > today) {
                    // Es futuro (la tasa publicada a las 5pm para mañana)
                    dayBadgeHTML = `<span class="day-badge tomorrow">Mañana</span>`;
                    rowClass = 'is-active-day'; // Resaltar
                } else if (itemDate.getTime() === today.getTime()) {
                    // Es hoy
                    dayBadgeHTML = `<span class="day-badge today">Hoy</span>`;
                }

                // Formato fechas: Mes completo
                const dayName = dateObj.toLocaleDateString('es-VE', { weekday: 'long' });
                const fullDate = dateObj.toLocaleDateString('es-VE', { day: 'numeric', month: 'long' });
                
                const val = parseFloat(item.usd);
                
                // Cálculo %
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
                        <span class="day-name">
                            ${dayName} ${dayBadgeHTML}
                        </span>
                        <span class="full-date">${fullDate}</span>
                    </div>
                    <div class="val-col">
                        <span class="rate-val">${simboloBase} ${val.toFixed(2)}</span>
                        ${percentHTML}
                    </div>
                </li>
                `;
            }).join('');
        } else {
            listEl.innerHTML = `<li class="text-center p-4 text-muted">Sin historial.</li>`;
        }
    });
}