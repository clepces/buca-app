// ======================================================
// ARCHIVO: src/views/Products/Super_admin/SuperAdminProductsView.js
// PROPÓSITO: Gestión del Catálogo Maestro Global.
// VERSIÓN: 2.0 (Usando Componentes Reutilizables)
// ======================================================

import { Logger } from '../../../../services/logger.service.js';
import { ViewHeader } from '../../../../components/Common/ViewHeader.js'; // Componente Nuevo
import { DataTable } from '../../../../components/Common/DataTable.js';   // Componente Nuevo
import { showToast } from '../../../../services/toast.service.js';

export function SuperAdminProductsView(element, state) {
    
    Logger.info('[SuperAdminProductsView] Inicializando...');

    // 1. Datos simulados (Mock Data) - Luego conectaremos a Firebase
    const templates = [
        { id: 't1', name: 'Coca Cola 2L', category: 'Bebidas', basePrice: 1.50, status: 'active' },
        { id: 't2', name: 'Harina PAN', category: 'Alimentos', basePrice: 1.10, status: 'active' },
        { id: 't3', name: 'Jabón Ace', category: 'Limpieza', basePrice: 2.50, status: 'draft' },
    ];

    // 2. Definición de Columnas para la Tabla
    const columns = [
        { header: 'Nombre Plantilla', key: 'name', render: (item) => `<strong>${item.name}</strong>` },
        { header: 'Categoría', key: 'category' },
        { header: 'Precio Base Ref.', render: (item) => `$${item.basePrice.toFixed(2)}` },
        { header: 'Estado', render: (item) => 
            `<span class="badge ${item.status === 'active' ? 'bg-success-subtle text-success-emphasis' : 'bg-warning-subtle text-warning-emphasis'}">
                ${item.status}
            </span>` 
        },
        { header: 'Acciones', render: (item) => `
            <div class="list-actions">
                <button class="btn-icon btn-icon-sm" data-action="edit" data-id="${item.id}"><i class="bi bi-pencil"></i></button>
                <button class="btn-icon btn-icon-sm danger" data-action="delete" data-id="${item.id}"><i class="bi bi-trash"></i></button>
            </div>
        `}
    ];

    // 3. Renderizado
    const render = () => {
        element.innerHTML = `
            <div class="view-panel-content">
                ${ViewHeader({
                    title: 'Catálogo Maestro',
                    subtitle: 'Plantillas globales para todos los negocios..',
                    icon: 'bi-globe-americas',
                    actions: [
                        { label: 'Nueva Plantilla', action: 'create-template', icon: 'bi-plus-lg' }
                    ]
                })}

                <div id="templates-table-container" class="mt-4">
                    ${DataTable({ columns, data: templates })}
                </div>
            </div>
        `;
    };

    // 4. Manejo de Eventos
    const handleActions = (e) => {
        const btn = e.target.closest('[data-action]');
        if(!btn) return;
        
        const action = btn.dataset.action;
        const id = btn.dataset.id;

        if(action === 'create-template') {
            showToast('Abrir modal de creación global', 'info');
        }
        if(action === 'delete') {
            if(confirm('¿Eliminar plantilla?')) showToast(`Plantilla ${id} eliminada (simulado)`);
        }
    };

    // Inicialización
    render();
    element.addEventListener('click', handleActions);

    return () => {
        element.removeEventListener('click', handleActions);
    };
}