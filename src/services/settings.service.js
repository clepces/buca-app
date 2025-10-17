import { saveState } from './storage.service.js';
import { Logger } from './logger.service.js';

export function updateSingleSetting(state, keyPath, value) {
    // Esta función auxiliar nos permite navegar por el objeto usando el string de la ruta.
    const keys = keyPath.split('.');
    let current = state.settings;
    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
        if (typeof current !== 'object' || current === null) {
            Logger.error(`Ruta de configuración inválida: ${keyPath}`);
            return;
        }
    }
    current[keys[keys.length - 1]] = value;
    saveState(state);
    Logger.info(`✅ Ajuste actualizado: ${keyPath} =`, value);
}

export function updateAllSettings(state, newSettingsData) {
    for (const key in newSettingsData) {
        if (state.settings.hasOwnProperty(key)) {
            Object.assign(state.settings[key], newSettingsData[key]);
        }
    }
    saveState(state);
    Logger.info('✅ Todos los ajustes han sido actualizados.');
}