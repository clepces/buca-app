// ======================================================
// ARCHIVO ACTUALIZADO: src/components/CompaniesTable.js
// VERSIÓN 3.0: Modificado para leer datos reales de
//              la colección 'businesses'.
// ======================================================

import { EmptyState } from '../Common/EmptyState.js';
import { can } from '../../services/permissions.service.js';
import { PERMISSIONS } from '../../services/roles.config.js';

/**
 * Renderiza la tabla de compañías.
 * @param {object} props
 * @param {Array<object>} props.companies - La lista de compañías (desde Firestore).
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
        } else if (planLower.includes('profesional')) {
            className = 'bg-warning-subtle text-warning-emphasis';
            planName = 'Profesional';
        }
        return `<span class="badge ${className}">${planName}</span>`;
    }

    function renderStatusBadge(status = 'active') {
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

    function getCompanyAvatar(companyId) {
        const avatarNum = (parseInt(companyId, 36) % 28) + 1;
        const avatarId = avatarNum.toString().padStart(2, '0');
        return `/assets/img/company/company-${avatarId}.svg`;
    }

    // --- Helper para formatear Timestamps de Firestore ---
    function formatTimestamp(timestamp) {
        if (!timestamp) return 'N/A';
        // Asume que 'timestamp' es un objeto { seconds: ..., nanoseconds: ... }
        if (timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleDateString('es-VE');
        }
        // Fallback por si ya es un string
        return new Date(timestamp).toLocaleDateString('es-VE');
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
                    <th>Nombre de la Compañía</th>
                    <th>Plan</th>
                    <th>Fecha de Creación</th>
                    <th>Status</th>
                    <th>Acciones</th>
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
                                    <span class="company-domain">ID: ${company.id}</span>
                                </div>
                            </div>
                        </td>
                        <td data-label="Plan">
                            ${renderPlanBadge(company.planId)}
                        </td>
                        <td data-label="Created Date">
                            ${formatTimestamp(company.createdAt)}
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