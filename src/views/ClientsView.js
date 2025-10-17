// ARCHIVO CORREGIDO: src/views/ClientsView.js

import { EmptyState } from '../components/EmptyState.js';
import { Logger } from '../services/logger.service.js';

export function ClientsView(element, state) {
    element.innerHTML = `
        <h2 class="view-title"><i class="fas fa-users"></i> Clientes</h2>
        ${EmptyState({
            icon: 'fa-user-plus',
            message: 'La gestión de clientes estará disponible próximamente.'
        })}
    `;

    return () => {
        Logger.info('Limpiando ClientsView...'); // Ahora sí funcionará
    };
}