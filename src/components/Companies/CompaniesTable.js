// ======================================================
// ARCHIVO: src/components/Companies/CompaniesTable.js
// MEJORA: Soporte visual para items 'deleted' y botón Restaurar
// ======================================================

import { EmptyState } from '../Common/EmptyState.js';
import { can } from '../../services/permissions.service.js';
import { PERMISSIONS } from '../../services/roles.config.js';

export function CompaniesTable({ companies = [], selectedIds, isAllSelected }) {

    if (!companies || companies.length === 0) {
        return EmptyState({
            icon: 'bi-building-slash',
            message: 'No se encontraron compañías en esta vista.'
        });
    }

    function renderPlanBadge(planId = 'plan_basic') {
        const planLower = planId.toLowerCase();
        let className = 'bg-primary-subtle text-primary-emphasis';
        let planName = 'Básico';

        if (planLower.includes('enterprise')) {
            className = 'bg-dark-subtle text-dark-emphasis';
            planName = 'Empresarial';
        } else if (planLower.includes('advanced')) {
            className = 'bg-info-subtle text-info-emphasis';
            planName = 'Avanzado';
        }
        return `<span class="badge ${className}">${planName}</span>`;
    }

    function renderStatusBadge(status = 'active') {
        const statusLower = status.toLowerCase();

        // --- LÓGICA PARA ESTADO ELIMINADO ---
        if (statusLower === 'deleted') {
            return `<span class="badge bg-secondary text-white badge-with-icon">
                        <i class="bi bi-trash3"></i> Eliminado
                    </span>`;
        }

        let className = 'bg-success-subtle text-success-emphasis';
        let icon = 'bi-check-circle-fill';

        if (statusLower !== 'active') {
            className = 'bg-danger-subtle text-danger-emphasis';
            icon = 'bi-x-circle-fill';
        }
        return `<span class="badge ${className} badge-with-icon">
                    <i class="bi ${icon}"></i> ${status}
                </span>`;
    }

    function getCompanyAvatar(companyId) {
        const avatarNum = (parseInt(companyId, 36) % 28) + 1;
        const avatarId = avatarNum.toString().padStart(2, '0');
        return `/assets/img/company/company-${avatarId}.svg`;
    }

    function formatTimestamp(timestamp) {
        if (!timestamp) return 'N/A';
        if (timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString('es-VE');
        }
        return new Date(timestamp).toLocaleDateString('es-VE');
    }

    return `
        <table class="table-companies">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" class="form-check-input" id="select-all-companies" data-action="select-all" ${isAllSelected ? 'checked' : ''}>
                    </th>
                    <th>Nombre de la Compañía</th>
                    <th>Plan</th>
                    <th>Fecha</th>
                    <th>Status</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${companies.map(company => {
        const isSelected = selectedIds.has(company.id);
        const isDeleted = company.status === 'deleted'; // Detectamos si está borrada

        return `
                    <tr data-company-id="${company.id}" class="${isSelected ? 'selected' : ''} ${isDeleted ? 'row-deleted' : ''}">
                        <td data-label="Select">
                            <input type="checkbox" class="form-check-input company-checkbox" data-action="select-one" data-company-id="${company.id}" ${isSelected ? 'checked' : ''}>
                        </td>
                        <td data-label="Company Name">
                            <div class="company-name-cell">
                                <div class="company-avatar">
                                    <img src="${getCompanyAvatar(company.id)}" alt="${company.name} logo" style="${isDeleted ? 'filter: grayscale(100%); opacity: 0.6;' : ''}">
                                </div>
                                <div class="company-info">
                                    <span class="company-name" style="${isDeleted ? 'text-decoration: line-through; color: var(--bs-gray-500);' : ''}">${company.name}</span>
                                    <span class="company-domain">ID: ${company.id}</span>
                                </div>
                            </div>
                        </td>
                        <td data-label="Plan">${renderPlanBadge(company.planId)}</td>
                        <td data-label="Created Date">${formatTimestamp(company.createdAt)}</td>
                        <td data-label="Status">${renderStatusBadge(company.status)}</td>
                        <td data-label="Actions">
                            <div class="list-actions">
                                
                                ${/* Si está borrada, mostramos RESTAURAR. Si no, las acciones normales */ ''}
                                ${isDeleted ? `
                                    <button class="btn-icon btn-icon-sm btn-success" data-action="restore-company" title="Restaurar Compañía">
                                        <i class="bi bi-arrow-counterclockwise"></i>
                                    </button>
                                ` : `
                                    ${can(PERMISSIONS.VIEW_COMPANIES) ? `
                                    <button class="btn-icon btn-icon-sm btn-info" data-action="view-company" title="Ver">
                                        <i class="bi bi-eye-fill"></i>
                                    </button>` : ''}

                                    ${can(PERMISSIONS.EDIT_COMPANY) ? `
                                    <button class="btn-icon btn-icon-sm" data-action="edit-company" title="Editar">
                                        <i class="bi bi-pencil-square"></i>
                                    </button>` : ''}
                                    
                                    ${can(PERMISSIONS.DELETE_COMPANY) ? `
                                    <button class="btn-icon btn-icon-sm danger" data-action="delete-company" title="Mover a Papelera">
                                        <i class="bi bi-trash3-fill"></i>
                                    </button>` : ''}
                                `}

                            </div>
                        </td>
                    </tr>
                `}).join('')}
            </tbody>
        </table>
    `;
}