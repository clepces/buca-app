// ARCHIVO ACTUALIZADO: src/views/PosView.js

import { EmptyState } from '../components/EmptyState.js';
import { Logger } from '../services/logger.service.js';

export function PosView(element, state) {
    element.innerHTML = `
        <h2 class="view-title"><i class="fas fa-keyboard"></i> Punto de Venta (POS)</h2>
        ${EmptyState({
            icon: 'fa-cash-register',
            message: 'La interfaz principal de ventas se construirá aquí.'
        })}
    `;

    return () => {
        Logger.info('Limpiando PosView...');
    };
}