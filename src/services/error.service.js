// ARCHIVO CORREGIDO: src/services/error.service.js
import { Logger } from './logger.service.js';
import { showToast } from './toast.service.js';

export const errorService = {
    handle(error, userFriendlyMessage = "Ha ocurrido un error inesperado.") {
        Logger.error(userFriendlyMessage, error);
        showToast(userFriendlyMessage, 'error');
    }
};