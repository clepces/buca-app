// ======================================================
// ARCHIVO: src/views/Team/Super_admin/TeamSuperAdminView.js
// REGISTRO: Vista de Equipo para Super Admin
// ======================================================

import { Logger } from '../../../services/logger.service.js';
import { ViewHeader } from '../../../components/Common/ViewHeader.js';

export function TeamSuperAdminView(element, state) {
    try {
        Logger.info('[TeamSuperAdminView] Inicializando...');

        const render = () => {
            const headerHTML = ViewHeader({
                title: 'Gestión de Equipos (Global)',
                subtitle: 'Vista de Super Administrador',
                icon: 'bi-shield-lock-fill',
                actions: []
            });

            element.innerHTML = `
                <div class="view-panel-content">
                    ${headerHTML}
                     <div class="card shadow-sm mt-4">
                        <div class="card-body">
                            <div class="empty-state text-center p-5">
                                <i class="bi bi-shield-lock-fill text-muted" style="font-size: 3rem;"></i>
                                <h5 class="mt-3">Vista de Super Admin</h5>
                                <p class="text-muted">Como Super Admin, no perteneces a un negocio específico.</p>
                                <button class="btn btn-outline-primary btn-sm mt-2" disabled>Ver todos los usuarios (Próximamente)</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };

        render();

        return () => {
            Logger.info('Limpiando TeamSuperAdminView...');
        };

    } catch (error) {
        Logger.error('[TeamSuperAdminView] Error:', error);
        element.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
        return () => { };
    }
}
