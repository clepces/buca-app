// ======================================================
// ARCHIVO: src/views/People/ClientsView.js
// MEJORA: Protección contra errores de renderizado
// ======================================================
import { EmptyState } from '../../components/Common/EmptyState.js';
import { Logger } from '../../services/logger.service.js';

export function ClientsView(element, state) {
    try {
        element.innerHTML = `
        <div class="view-panel-content">
            <div class="view-header align-items-center mb-4">
                <div>
                    <h2 class="view-title"><i class="bi bi-people-fill me-2"></i> Clientes</h2>
                </div>
                <div class="ms-auto d-flex gap-2">
                    <button class="btn-primary"><i class="bi bi-person-plus-fill"></i> Nuevo Cliente</button>
                </div>
            </div>

            ${EmptyState({
                icon: 'bi-person-badge',
                message: 'Gestión de clientes próximamente.'
            })}
        </div>
        `;

        return () => Logger.info('Limpiando ClientsView...');

    } catch (error) {
        Logger.error('[ClientsView] Error:', error);
        element.innerHTML = `<div class="alert alert-danger m-4">Error en módulo Clientes.</div>`;
    }
}