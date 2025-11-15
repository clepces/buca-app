// ======================================================
// ARCHIVO: src/services/modal.service.js
// ACTUALIZACIÓN: Soporte para tamaños y WiFi en tiempo real
// MEJORA: (Precisión Decimal y UI)
// 1. Añadido helper 'formatFintechRate' para UI de tasas.
// 2. Se muestra precisión completa (ej. 236.4601) en hero e historial.
// 3. Input usa step="any" y valor .toString() para precisión.
// 4. 'performSave' ahora guarda el 'float' completo, sin truncar.
// 5. Estados de lista usan la clase 'history-empty-state'.
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
    // Estilo centrado para el modal pequeño
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
        title: '', // Sin título en el header para confirmaciones, se ve más limpio
        contentElement: content,
        id: config.modalId,
        size: 'small' // <--- TAMAÑO PEQUEÑO
    });

    // Ocultamos el borde del header para que se vea más fluido
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
export function openProductModal(productToEdit = null) {
    return new Promise((resolve) => {
        const isEditMode = productToEdit !== null;
        const modalTitle = isEditMode 
            ? `<i class="bi bi-pencil-fill me-2"></i> Editar Producto`
            : '<i class="bi bi-plus-circle-fill me-2"></i> Añadir Nuevo Producto';
        
        const dummyContent = document.createElement('div');
        dummyContent.textContent = 'Cargando...';

        const productModalElement = Modal({
            title: modalTitle,
            contentElement: dummyContent,
            id: isEditMode ? 'edit-product-modal' : 'add-product-modal',
            size: 'large' // <--- TAMAÑO GRANDE (por defecto)
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

// ==========================================================================
// FUNCIÓN COMPLETA: openRateUpdateModal()
// ARCHIVO: src/services/modal.service.js
// VERSIÓN: REFINADA CON BOTÓN DE REFRESCAR
// ==========================================================================

export function openRateUpdateModal() {
    
    // --- VERIFICAR PERMISOS ---
    if (!can(PERMISSIONS.EDIT_SETTINGS_BUSINESS) && !can(PERMISSIONS.EDIT_SETTINGS_SYSTEM)) {
        Logger.warn('Intento de abrir modal de tasa sin permisos.');
        return;
    }

    // --- HELPER: FORMATO FINTECH ---
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

    // --- DATOS INICIALES ---
    const simboloBase = state.settings.currencies.base.symbol || 'Bs.';
    const currentRate = state.settings.currencies.principal.rate;
    
    // --- CREAR CONTENIDO DEL MODAL ---
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
                    <button class="btn-refresh" data-action="refresh-history" title="Actualizar historial">
                        <i class="bi bi-arrow-clockwise"></i> Actualizar
                    </button>
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

    // --- CREAR BOTONES DEL FOOTER ---
    const saveButton = document.createElement('button');
    saveButton.className = 'btn-primary';
    saveButton.innerHTML = `<i class="bi bi-check-lg me-1"></i> Aplicar Nueva Tasa`;
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn-secondary';
    cancelButton.innerHTML = `Cerrar`;

    const footerContainer = document.createElement('div');
    footerContainer.id = "modal-footer-container";
    footerContainer.append(cancelButton, saveButton);

    // --- CREAR MODAL ---
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

    // --- INYECTAR WIDGET EN HEADER ---
    const headerWidget = content.querySelector('#temp-header-widget').firstElementChild;
    const modalHeader = modal.querySelector('.modal-header');
    const closeBtn = modal.querySelector('.close');
    if (modalHeader && closeBtn) {
        modalHeader.insertBefore(headerWidget, closeBtn);
    }

    // --- LÓGICA DE CONECTIVIDAD EN VIVO ---
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

    // --- RELOJ EN VIVO ---
    const clockEl = headerWidget.querySelector('#live-clock');
    const updateClock = () => {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString('es-VE', { 
            hour12: true, 
            hour: '2-digit', 
            minute:'2-digit', 
            second:'2-digit' 
        });
    };
    const clockInterval = setInterval(updateClock, 1000);
    updateClock();

    // --- LIMPIEZA AL CERRAR ---
    const originalRemove = modal.remove;
    modal.remove = function() {
        clearInterval(clockInterval);
        window.removeEventListener('online', updateConnectivityUI);
        window.removeEventListener('offline', updateConnectivityUI);
        originalRemove.call(this);
    };

    // --- 🆕 FUNCIÓN PARA CARGAR HISTORIAL (REUTILIZABLE) ---
    const loadHistoryData = () => {
        const listEl = content.querySelector('#rate-history-list');
        const refreshBtn = content.querySelector('.btn-refresh');
        
        // Estado: Loading
        listEl.innerHTML = `
            <li class="history-empty-state">
                <div class="spinner"></div>
                <span style="margin-top: 1rem;">Cargando historial...</span>
            </li>
        `;
        
        if (refreshBtn) {
            refreshBtn.disabled = true;
            refreshBtn.classList.add('is-loading');
        }

        fetchRateHistory(6)
            .then(history => {
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
                        const fullDate = dateObj.toLocaleDateString('es-VE', { 
                            day: 'numeric', 
                            month: 'long' 
                        });
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
                    listEl.innerHTML = `
                        <li class="history-empty-state">
                            <i class="bi bi-info-circle"></i>
                            <span>Sin historial disponible.</span>
                        </li>
                    `;
                }
            })
            .catch(error => {
                Logger.error('Error cargando historial:', error);
                listEl.innerHTML = `
                    <li class="history-empty-state">
                        <i class="bi bi-exclamation-triangle text-warning"></i>
                        <span>Error al cargar historial. Intenta de nuevo.</span>
                    </li>
                `;
            })
            .finally(() => {
                if (refreshBtn) {
                    refreshBtn.disabled = false;
                    refreshBtn.classList.remove('is-loading');
                }
            });
    };

    // --- 🆕 LISTENER PARA EL BOTÓN DE REFRESCAR ---
    content.addEventListener('click', (e) => {
        const refreshBtn = e.target.closest('[data-action="refresh-history"]');
        if (refreshBtn && navigator.onLine) {
            loadHistoryData();
            showToast('Actualizando historial...', 'info', 2000);
        } else if (refreshBtn && !navigator.onLine) {
            showToast('Sin conexión a internet', 'warning');
        }
    });

    // --- LÓGICA DE GUARDADO ---
    const performSave = (newRate) => {
        const finalRate = parseFloat(newRate);
        state.settings.currencies.principal.rate = finalRate;
        localStorage.setItem('buca_last_known_rate_usd', finalRate.toString());
        
        Logger.info(`Tasa aplicada correctamente: ${finalRate}`);
        triggerRerender(); 
        showToast(`Tasa actualizada a ${simboloBase} ${finalRate.toString()}`, 'success');
        modal.remove();
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
    
    // --- AÑADIR MODAL AL DOM ---
    document.body.appendChild(modal);

    // --- 🆕 CARGA INICIAL DE DATOS ---
    if (navigator.onLine) {
        const spinner = content.querySelector('#api-loading-spinner');
        const heroRateDisplay = content.querySelector('#hero-rate-display');
        
        spinner.style.display = 'block';

        // Cargar tasa actual (Hero Card)
        fetchCurrentRates().then(data => {
            spinner.style.display = 'none';
            const apiRate = parseFloat(data.current.usd);
            const apiDate = new Date(data.current.date + 'T12:00:00'); 
            
            if (!isNaN(apiRate)) {
                heroRateDisplay.innerHTML = formatFintechRate(apiRate, simboloBase);
                
                const dateStr = apiDate.toLocaleDateString('es-VE', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                });
                heroDateDisplay.innerHTML = `<span class="text-success">● En línea</span> • Oficial: <strong>${dateStr}</strong>`;
                
                const input = content.querySelector('#manual-rate-input');
                if(input && Math.abs(parseFloat(input.value) - currentRate) < 0.01) {
                    input.value = apiRate.toString();
                }
            }
        }).catch(() => {
            spinner.style.display = 'none';
            heroDateDisplay.innerHTML = `<span class="text-warning">● API Inaccesible</span>`;
        });

        // ✅ Cargar historial usando la función reutilizable
        loadHistoryData();
        
    } else {
        // Sin conexión - Estado offline
        const listEl = content.querySelector('#rate-history-list');
        listEl.innerHTML = `
            <li class="history-empty-state">
                <i class="bi bi-wifi-off"></i>
                <span>Sin conexión para cargar historial.</span>
            </li>
        `;
    }
}