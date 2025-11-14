// ======================================================
// ARCHIVO: src/utils/tippy-helper.js
// PROPÓSITO: Helper global para inicializar Tippy.js
// ======================================================

import { Logger } from '../services/logger.service.js';

/**
 * Inicializa Tippy.js en todos los elementos con [data-tippy-content]
 * dentro de un contenedor específico.
 * 
 * @param {HTMLElement} container - El contenedor donde buscar elementos
 * @param {Object} options - Opciones personalizadas de Tippy
 */
export function initTippy(container = document.body, options = {}) {
    if (typeof tippy === 'undefined') {
        Logger.warn('Tippy.js no está cargado. Los tooltips no funcionarán.');
        return;
    }

    const defaultOptions = {
        animation: 'scale-subtle',
        theme: 'light-border',
        arrow: true,
        delay: [200, 0], // [show, hide]
        duration: [200, 150],
        placement: 'top',
        allowHTML: true, // Permite HTML en los tooltips
        ...options
    };

    try {
        // Inicializar en elementos con data-tippy-content
        const elements = container.querySelectorAll('[data-tippy-content]');
        
        if (elements.length > 0) {
            tippy(elements, defaultOptions);
            Logger.trace(`✅ Tippy inicializado en ${elements.length} elemento(s)`);
        }

        // También inicializar en elementos con title="" (legacy)
        const legacyElements = container.querySelectorAll('[title]:not([data-tippy-content])');
        
        if (legacyElements.length > 0) {
            legacyElements.forEach(el => {
                const titleText = el.getAttribute('title');
                if (titleText) {
                    el.setAttribute('data-tippy-content', titleText);
                    el.removeAttribute('title'); // Eliminar title nativo
                }
            });
            
            tippy(legacyElements, defaultOptions);
            Logger.trace(`✅ Tippy inicializado en ${legacyElements.length} elemento(s) legacy`);
        }

    } catch (error) {
        Logger.error('Error al inicializar Tippy:', error);
    }
}

/**
 * Destruye todas las instancias de Tippy en un contenedor
 * (útil para cleanup de vistas)
 */
export function destroyTippy(container = document.body) {
    const elements = container.querySelectorAll('[data-tippy-content]');
    elements.forEach(el => {
        if (el._tippy) {
            el._tippy.destroy();
        }
    });
}