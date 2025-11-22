import { EmptyState } from '../../../components/Common/EmptyState.js';
import { Logger } from '../../../services/logger.service.js';

export function SuperAdminInventoryView(element) {
    
    element.innerHTML = `
    <div class="view-panel-content">
        <div class="view-header">
            <div>
                <h2 class="view-title"><i class="bi bi-database-fill-gear me-2"></i> Catálogo Maestro</h2>
                <p class="text-muted mb-0">Define productos plantilla que los negocios pueden importar.</p>
            </div>
            <div class="view-header-actions">
                 <button class="btn-primary"><i class="bi bi-plus-lg me-1"></i> Crear Plantilla</button>
            </div>
        </div>

        <div class="d-flex gap-3 mb-4">
            <div class="config-box w-100 p-3 d-flex align-items-center justify-content-between">
                <div><h5 class="mb-1">Productos Globales</h5><span class="text-muted small">Visibles para todos</span></div>
                <h2 class="mb-0 text-primary">0</h2>
            </div>
            <div class="config-box w-100 p-3 d-flex align-items-center justify-content-between">
                <div><h5 class="mb-1">Reportes de Stock</h5><span class="text-muted small">Alertas críticas</span></div>
                <h2 class="mb-0 text-danger">0</h2>
            </div>
        </div>

        <div class="table-container-wrapper">
             <div class="table-filters">
                <div class="search-container">
                    <i class="bi bi-search search-icon"></i>
                    <input type="search" class="form-control" placeholder="Buscar en el catálogo maestro...">
                </div>
             </div>
             <div class="p-5">
                ${EmptyState({
                    icon: 'bi-cloud-plus',
                    message: 'El Catálogo Maestro está vacío.',
                    instructions: 'Crea productos genéricos para estandarizar la base de datos.'
                })}
             </div>
        </div>
    </div>
    `;

    return () => Logger.info('Limpiando SuperAdminInventoryView');
}