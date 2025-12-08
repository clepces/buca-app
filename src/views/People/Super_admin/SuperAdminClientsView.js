// ======================================================
// ARCHIVO: src/views/People/Super_admin/SuperAdminClientsView.js
// PROPÓSITO: Vista de Clientes Global para Super Admin.
// ======================================================

import { ViewHeader } from '../../../components/Common/ViewHeader.js';
import { EmptyState } from '../../../components/Common/EmptyState.js';
import { StatCard } from '../../../components/Common/StatCard.js';
import { Logger } from '../../../services/logger.service.js';

export function SuperAdminClientsView(element) {
    Logger.info('[SuperAdminClientsView] Inicializando...');

    const render = () => {
        const headerHTML = ViewHeader({
            title: 'Directorio Global de Clientes',
            subtitle: 'Supervisión de clientes a través de todos los negocios',
            icon: 'bi-globe-americas',
            actions: [
                { label: 'Reporte Global', action: 'global-report', icon: 'bi-file-earmark-bar-graph' }
            ]
        });

        element.innerHTML = `
            <div class="view-panel-content">
                ${headerHTML}

                <div class="panel-grid mb-4">
                    ${StatCard({
            title: 'Total Clientes (Global)',
            value: 'N/A', // Aquí iría una cloud function stats count
            icon: 'bi-people',
            className: 'productos',
            description: 'En todas las empresas'
        })}
                    ${StatCard({
            title: 'Clientes VIP',
            value: 'N/A',
            icon: 'bi-star-fill',
            className: 'ganancia',
            description: 'Etiquetados como VIP'
        })}
                </div>

                <div class="card shadow-sm border-0">
                    <div class="card-body text-center py-5">
                        <div class="empty-state">
                            <i class="bi bi-shield-lock-fill empty-state-icon text-muted" style="font-size: 3rem;"></i>
                            <h4 class="mt-3">Modo Super Administrador</h4>
                            <p class="text-muted max-w-md mx-auto">
                                Como Super Admin, no gestionas carteras de clientes individuales desde aquí.
                                <br>Para ver o editar un cliente específico, ingresa al panel del negocio correspondiente.
                            </p>
                            <button class="btn btn-outline-primary mt-3" data-route="#/companies">
                                <i class="bi bi-building me-1"></i> Ir a Empresas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    render();

    // Redirección simple para el botón
    element.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-route]');
        if (btn) {
            window.location.hash = btn.dataset.route;
        }
    });

    return () => {
        Logger.info('Limpiando SuperAdminClientsView...');
    };
}