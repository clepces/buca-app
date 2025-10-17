// ARCHIVO CORREGIDO: src/views/InventoryView.js

import { EmptyState } from '../components/EmptyState.js';
import { Logger } from '../services/logger.service.js';

export function InventoryView(element, state) {
    element.innerHTML = `
        <h2 class="view-title"><i class="fas fa-warehouse"></i> Inventario</h2>
        ${EmptyState({
            icon: 'fa-dolly-flatbed',
            message: 'El módulo de inventario avanzado está en construcción.'
        })}
    `;

    return () => {
        Logger.info('Limpiando InventoryView...'); // Ahora sí funcionará
    };
}