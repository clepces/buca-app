// ======================================================
// ARCHIVO: src/views/PosView.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: Actualizar iconos a Bootstrap Icons
// ======================================================

import { EmptyState } from '../../components/EmptyState.js';
import { Logger } from '../../services/logger.service.js';

export function PosView(element, state) {
    element.innerHTML = `
        <div class="view-header">
            <h2 class="view-title"><i class="bi bi-printer-fill me-2"></i> Punto de Venta (POS)</h2>

        </div>

        ${EmptyState({
             // icon: 'bi-cart-plus-fill',
            message: 'La interfaz principal de ventas se construirá aquí.'
        })}
    `;

    return () => {
        Logger.info('Limpiando PosView...');
    };
}