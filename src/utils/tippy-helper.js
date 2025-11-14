// ======================================================
// ARCHIVO: src/utils/tippy-helper.js
// VERSIÓN CORREGIDA
// ======================================================

import { Logger } from '../services/logger.service.js';

export function initTippy(container = document.body, options = {}) {
    if (typeof tippy === 'undefined') {
        Logger.warn('Tippy.js no está cargado. Los tooltips no funcionarán.');
        return;
    }

    const defaultOptions = {
        animation: 'scale-subtle',
        theme: 'light-border',
        arrow: true,
        delay: [400, 0], // [show, hide] - Aumentado para evitar tooltips molestos
        duration: [200, 150],
        placement: 'top',
        allowHTML: true, // ✅ Permite HTML (necesario si usas Opción 2)
        maxWidth: 300,
        interactive: false, // Los tooltips no son interactivos (no se puede hacer clic)
        ...options
    };

    try {
        // 1. Inicializar en elementos con data-tippy-content
        const elements = container.querySelectorAll('[data-tippy-content]');
        
        if (elements.length > 0) {
            tippy(elements, defaultOptions);
            Logger.trace(`✅ Tippy inicializado en ${elements.length} elemento(s)`);
        }

        // 2. Convertir elementos con title="" legacy
        const legacyElements = container.querySelectorAll('[title]:not([data-tippy-content])');
        
        if (legacyElements.length > 0) {
            legacyElements.forEach(el => {
                const titleText = el.getAttribute('title');
                if (titleText && titleText.trim()) {
                    el.setAttribute('data-tippy-content', titleText);
                    el.removeAttribute('title');
                }
            });
            
            tippy(legacyElements, defaultOptions);
            Logger.trace(`✅ Tippy convertido de ${legacyElements.length} title(s) legacy`);
        }

    } catch (error) {
        Logger.error('Error al inicializar Tippy:', error);
    }
}

export function destroyTippy(container = document.body) {
    const elements = container.querySelectorAll('[data-tippy-content], [title]');
    elements.forEach(el => {
        if (el._tippy) {
            el._tippy.destroy();
        }
    });
    Logger.trace('✅ Instancias de Tippy destruidas');
}