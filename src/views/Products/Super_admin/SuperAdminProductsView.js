// ======================================================
// ARCHIVO: src/views/Products/Super_admin/SuperAdminProductsView.js
// PROPÓSITO: Gestión del Catálogo Maestro Global.
// ======================================================

import { EmptyState } from '../../../components/Common/EmptyState.js';
import { Logger } from '../../../services/logger.service.js';
import { showToast } from '../../../services/toast.service.js';

export function SuperAdminProductsView(element, state) {
    
    Logger.info('[SuperAdminProductsView] Inicializando Catálogo Maestro...');

    // Renderizado inicial
    element.innerHTML = `
        <div class="view-panel-content">
            <div class="view-header">
                <div>
                    <h2 class="view-title">
                        <i class="bi bi-globe-americas me-2"></i> 
                        Catálogo Maestro
                    </h2>
                    <p class="text-muted mb-0">Plantillas de productos globales para todos los negocios.</p>
                </div>
                <div class="view-header-actions">
                    <div class="search-container">
                        <i class="bi bi-search search-icon"></i>
                        <input type="search" id="search-templates" class="form-control" placeholder="Buscar plantilla...">
                    </div>
                    <button class="btn-primary" data-action="create-template">
                        <i class="bi bi-plus-circle-fill me-1"></i> Nueva Plantilla Global
                    </button>
                </div>
            </div>

            <div class="product-list-container">
                ${EmptyState({
                    icon: 'bi-database-add',
                    message: 'Gestión de Plantillas Globales',
                    instructions: 'Los productos creados aquí podrán ser importados por cualquier negocio.'
                })}
            </div>
        </div>
    `;

    // Manejador de eventos
    const handleActions = (e) => {
        const btn = e.target.closest('[data-action]');
        if(!btn) return;
        
        const action = btn.dataset.action;

        if(action === 'create-template') {
            // Aquí abriremos el modal en el futuro, pero con una bandera isGlobal=true
            showToast('Próximamente: Crear Plantilla Global', 'info');
        }
    };

    element.addEventListener('click', handleActions);

    // Limpieza
    return () => {
        element.removeEventListener('click', handleActions);
        Logger.info('Limpiando SuperAdminProductsView...');
    };
}