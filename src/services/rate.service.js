// ======================================================
// ARCHIVO: src/services/rate.service.js
// CORRECCIÓN CRÍTICA: Normalización de decimales (2 dígitos)
// para evitar discrepancias financieras.
// ======================================================

import { Logger } from './logger.service.js';
import { state } from '../store/state.js';

const API_URL_CURRENT = 'https://api.dolarvzla.com/public/exchange-rate';
const API_URL_HISTORY = 'https://api.dolarvzla.com/public/exchange-rate/list';
const LOCAL_STORAGE_KEY_USD = 'buca_last_known_rate_usd';

export async function fetchCurrentRates() {
    try {
        const response = await fetch(API_URL_CURRENT);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const data = await response.json();
        const currentData = data.current || data;
        if (!currentData.usd) throw new Error('Estructura USD no encontrada');
        return { current: currentData };
    } catch (error) {
        Logger.error('Error fetching current rates', error);
        throw error;
    }
}

export async function fetchRateHistory(limit = 5) {
    try {
        const response = await fetch(API_URL_HISTORY);
        if (!response.ok) throw new Error(`API History Error: ${response.status}`);
        const data = await response.json();
        const historyList = Array.isArray(data) ? data : (data.rates || data.items || []);
        return historyList.slice(0, limit);
    } catch (error) {
        Logger.error('Error fetching history', error);
        return [];
    }
}

export async function initRateService() {
    try {
        const ratesData = await fetchCurrentRates();
        const rawRate = parseFloat(ratesData.current.usd);

        if (isNaN(rawRate)) throw new Error('Tasa inválida');

        // ✅ CORRECCIÓN: Guardamos la tasa SIN redondear
        // Solo normalizamos a un número limpio
        const currentRate = Number(rawRate); // <-- Sin .toFixed(2)

        // 2. Historial
        const history = await fetchRateHistory(2);
        let trend = 'neutral'; 
        let diffPercent = 0;

        if (history.length >= 2) {
            const previousRate = parseFloat(history[1].usd);
            if (currentRate > previousRate) trend = 'up';
            else if (currentRate < previousRate) trend = 'down';
            diffPercent = ((currentRate - previousRate) / previousRate) * 100;
        }

        // 3. Guardar en Estado Global CON PRECISIÓN COMPLETA
        state.settings.currencies.principal.rate = currentRate;
        state.settings.currencies.principal.trend = trend; 
        state.settings.currencies.principal.diff = diffPercent;

        // 4. Guardar en localStorage con precisión completa
        localStorage.setItem(LOCAL_STORAGE_KEY_USD, currentRate.toString());
        
        Logger.info(`✅ Tasa Aplicada: ${currentRate} (Precisión completa)`);
        
        return { rate: currentRate, isOffline: false };

    } catch (error) {
        Logger.warn(`Fallo API Tasas: ${error.message}`);
        const lastRate = parseFloat(localStorage.getItem(LOCAL_STORAGE_KEY_USD)) || 1.00;
        state.settings.currencies.principal.rate = lastRate;
        return { rate: lastRate, isOffline: true, requiresManualUpdate: true };
    }
}

