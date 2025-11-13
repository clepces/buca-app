// ======================================================
// ARCHIVO: src/services/rate.service.js
// MEJORA: Cálculo de tendencia (Subida/Bajada)
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
        // Corrección: Priorizar 'rates'
        const historyList = Array.isArray(data) ? data : (data.rates || data.items || []);
        return historyList.slice(0, limit);
    } catch (error) {
        Logger.error('Error fetching history', error);
        return [];
    }
}

export async function initRateService() {
    try {
        // 1. Obtener Tasa Actual
        const ratesData = await fetchCurrentRates();
        const currentRate = parseFloat(ratesData.current.usd);

        if (isNaN(currentRate)) throw new Error('Tasa inválida');

        // 2. Obtener Historial para comparar (ayer vs hoy)
        const history = await fetchRateHistory(2);
        let trend = 'neutral'; // 'up', 'down', 'neutral'
        let diffPercent = 0;

        if (history.length >= 2) {
            // Asumiendo que history[0] es hoy/reciente y history[1] es ayer
            // A veces la API pone el actual en el historial, a veces no. 
            // Comparamos el currentRate con el último distinto almacenado o el segundo de la lista.
            const previousRate = parseFloat(history[1].usd);
            
            if (currentRate > previousRate) trend = 'up';
            else if (currentRate < previousRate) trend = 'down';
            
            diffPercent = ((currentRate - previousRate) / previousRate) * 100;
        }

        // 3. Guardar en Estado Global
        state.settings.currencies.principal.rate = currentRate;
        state.settings.currencies.principal.trend = trend; // Guardamos la tendencia
        state.settings.currencies.principal.diff = diffPercent;

        localStorage.setItem(LOCAL_STORAGE_KEY_USD, currentRate.toString());
        Logger.info(`Tasa: ${currentRate} | Tendencia: ${trend} (${diffPercent.toFixed(2)}%)`);
        
        return { rate: currentRate, isOffline: false };

    } catch (error) {
        Logger.warn(`Fallo API Tasas: ${error.message}`);
        // Fallback Offline...
        const lastRate = parseFloat(localStorage.getItem(LOCAL_STORAGE_KEY_USD)) || 1.00;
        state.settings.currencies.principal.rate = lastRate;
        state.settings.currencies.principal.trend = 'neutral';
        return { rate: lastRate, isOffline: true, requiresManualUpdate: true };
    }
}