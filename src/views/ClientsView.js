// ======================================================
// ARCHIVO: src/views/ClientsView.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: Actualizar iconos a Bootstrap Icons
// ======================================================

import { EmptyState } from '../components/EmptyState.js';
import { Logger } from '../services/logger.service.js';

export function ClientsView(element, state) {
    element.innerHTML = `
        <div class="view-header align-items-center mb-4">
            <div>
                <h2 class="view-title"><i class="bi bi-people-fill me-2"></i> Clientes</h2>
            </div>
            <div class="ms-auto d-flex gap-2">
                {acceso rapido btn}
            </div>
        </div>


        ${EmptyState({
            // icon: 'bi-person-plus-fill',
            message: 'La gestión de clientes estará disponible próximamente.'
        })}
    `;

    return () => {
        Logger.info('Limpiando ClientsView...');
    };
}