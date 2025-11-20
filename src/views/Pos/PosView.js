// ======================================================
// ARCHIVO: src/views/Pos/PosView.js
// MEJORA: Protección contra errores de renderizado (Runtime)
// ======================================================
import { EmptyState } from '../../components/Common/EmptyState.js';
import { Logger } from '../../services/logger.service.js';

export function PosView(element, state) {
    try {
        // Lógica de renderizado normal
        element.innerHTML = `
        <div class="view-panel-content">
            <div class="view-header align-items-start mb-4">
                <div>
                    <h2 class="view-title">
                        <i class="bi bi-printer-fill me-2"></i> Punto de Venta (POS)
                    </h2>
                </div>
                <div class="ms-auto text-end">
                    <button class="btn-primary"><i class="bi bi-plus-lg"></i> Nueva Venta</button>
                </div>
            </div>

            ${EmptyState({
                icon: 'bi-cart', // Usando icono Bootstrap
                message: 'La interfaz de caja se construirá aquí.'
            })}
        </div>
        `;

        // Retornar limpieza
        return () => {
            Logger.info('Limpiando PosView...');
        };

    } catch (error) {
        Logger.error('[PosView] Error de renderizado:', error);
        element.innerHTML = `<div class="alert alert-danger m-4">Error al cargar el Punto de Venta: ${error.message}</div>`;
        return () => {};
    }
}