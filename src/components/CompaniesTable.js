// ======================================================
// ARCHIVO ACTUALIZADO: src/components/CompaniesTable.js
// VERSIÓN 2.0: Añade "View", checkboxes y avatares SVG
// ======================================================

import { EmptyState } from './EmptyState.js';
import { can } from '../services/permissions.service.js';
import { PERMISSIONS } from '../services/roles.config.js';

/**
 * Renderiza la tabla de compañías.
 * @param {object} props
 * @param {Array<object>} props.companies - La lista de compañías a mostrar.
 * @param {Set<string>} props.selectedIds - Un Set con los IDs de las filas seleccionadas.
 * @param {boolean} props.isAllSelected - Si el checkbox "Select All" debe estar marcado.
 * @returns {string} El string de HTML para la tabla.
 */
export function CompaniesTable({ companies = [], selectedIds, isAllSelected }) {

    if (!companies || companies.length === 0) {
        return EmptyState({
            icon: 'bi-building-slash',
            message: 'No se encontraron compañías'
        });
    }

    function renderPlanBadge(planName = 'Basic') {
        const planLower = planName.toLowerCase();
        let className = 'bg-primary-subtle text-primary-emphasis';
        
        if (planLower.includes('enterprise')) {
            className = 'bg-dark-subtle text-dark-emphasis';
        } else if (planLower.includes('advanced')) {
             className = 'bg-info-subtle text-info-emphasis';
        } else if (planLower.includes('premium')) {
            className = 'bg-warning-subtle text-warning-emphasis';
        }
        return `<span class="badge ${className}">${planName}</span>`;
    }

    function renderStatusBadge(status = 'Active') {
        const statusLower = status.toLowerCase();
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

    // --- Helper para obtener un avatar SVG aleatorio ---
    function getCompanyAvatar(companyId) {
        // Genera un número entre 1 y 28 basado en el ID de la compañía
        const avatarNum = (parseInt(companyId, 36) % 28) + 1;
        const avatarId = avatarNum.toString().padStart(2, '0');
        return `/assets/img/company/company-${avatarId}.svg`;
    }

    return `
        <table class="table-companies">
            <thead>
                <tr>
                    <th>
                        <input 
                            type="checkbox" 
                            class="form-check-input" 
                            id="select-all-companies"
                            data-action="select-all"
                            ${isAllSelected ? 'checked' : ''}
                        >
                    </th>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th>Account URL</th>
                    <th>Plan</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${companies.map(company => {
                    const isSelected = selectedIds.has(company.id);
                    return `
                    <tr data-company-id="${company.id}" class="${isSelected ? 'selected' : ''}">
                        <td data-label="Select">
                            <input 
                                type="checkbox" 
                                class="form-check-input company-checkbox" 
                                data-action="select-one"
                                data-company-id="${company.id}"
                                ${isSelected ? 'checked' : ''}
                            >
                        </td>
                        <td data-label="Company Name">
                            <div class="company-name-cell">
                                <div class="company-avatar">
                                    <img src="${getCompanyAvatar(company.id)}" alt="${company.name} logo">
                                </div>
                                <div class="company-info">
                                    <span class="company-name">${company.name}</span>
                                    <span class="company-domain">${company.domain || 'N/A'}</span>
                                </div>
                            </div>
                        </td>
                        <td data-label="Email">
                            <a href="mailto:${company.email}">${company.email}</a>
                        </td>
                        <td data-label="Account URL">
                            <a href="${company.accountUrl}" target="_blank">${company.accountUrl.replace('https://', '')}</a>
                        </td>
                        <td data-label="Plan">
                            ${renderPlanBadge(company.plan)}
                        </td>
                        <td data-label="Created Date">
                            ${company.createdDate}
                        </td>
                        <td data-label="Status">
                            ${renderStatusBadge(company.status)}
                        </td>
                        <td data-label="Actions">
                            <div class="list-actions">
                                ${can(PERMISSIONS.VIEW_COMPANIES) ? `
                                <button class="btn-icon btn-icon-sm btn-info" data-action="view-company" title="Visualizar Compañía">
                                    <i class="bi bi-eye-fill"></i>
                                </button>` : ''}

                                ${can(PERMISSIONS.EDIT_COMPANY) ? `
                                <button class="btn-icon btn-icon-sm" data-action="edit-company" title="Editar Compañía">
                                    <i class="bi bi-pencil-square"></i>
                                </button>` : ''}
                                
                                ${can(PERMISSIONS.DELETE_COMPANY) ? `
                                <button class="btn-icon btn-icon-sm danger" data-action="delete-company" title="Eliminar Compañía">
                                    <i class="bi bi-trash3-fill"></i>
                                </button>` : ''}
                            </div>
                        </td>
                    </tr>
                `}).join('')}
            </tbody>
        </table>
    `;
}