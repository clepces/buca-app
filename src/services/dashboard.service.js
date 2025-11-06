// ======================================================
// ARCHIVO: src/services/dashboard.service.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.2.0 - FILE: 1.1.0
// CORRECCIÓN: (Bug M-2) El servicio ahora lee la estructura
//             de precios anidada correcta
//             (pricing.priceLists.unitSellPrice)
//             en lugar de la estructura plana.
// ======================================================

import { Logger } from './logger.service.js';

export function getDashboardStats(products) {

    Logger.info(`Dashboard Stats: Calculando con ${products ? products.length : 0} productos.`);
    if (products && products.length > 0) {
        Logger.trace('Primer producto para cálculo:', JSON.stringify(products[0]));
    }

    if (!products || products.length === 0) {
        return {
            totalProducts: 0,
            totalInvestment: 0,
            totalStockValue: 0,
            potentialProfit: 0,
        };
    }

    const totals = products.reduce((acc, product, index) => {
        // --- ¡INICIO DE CORRECCIÓN! (Cálculo de $0.00) ---
        const currentStock = product.stock?.current || 0;
        const packageCost = product.pricing?.packageCost || 0;
        const unitsPerPackage = product.pricing?.unitsPerPackage || 1;

        // Hacemos la lectura robusta:
        // 1. Intenta leer la estructura NUEVA (anidada)
        // 2. Si falla, intenta leer la estructura ANTIGUA (plana)
        const unitSellPrice = product.pricing?.priceLists?.[0]?.unitSellPrice || 
                            product.pricing?.unitSellPrice || 
                            0;
        // --- FIN DE CORRECCIÓN ---

        const costPerUnit = packageCost / (unitsPerPackage > 0 ? unitsPerPackage : 1);
        const investmentToAdd = costPerUnit * currentStock;
        const stockValueToAdd = unitSellPrice * currentStock;

        if (index === 0) {
            Logger.trace(`Prod ${index}: Stock=${currentStock}, PkgCost=${packageCost}, Units/Pkg=${unitsPerPackage}, UnitSellPrice=${unitSellPrice}`);
            Logger.trace(`Prod ${index}: Cost/Unit=${costPerUnit.toFixed(4)}, Adding Invest=${investmentToAdd.toFixed(4)}, Adding StockVal=${stockValueToAdd.toFixed(4)}`);
        }

        acc.investment += investmentToAdd;
        acc.stockValue += stockValueToAdd;

        return acc;
    }, { 
        investment: 0, stockValue: 0 
    });

    const totalInvestment = isNaN(totals.investment) ? 0 : totals.investment;
    const totalStockValue = isNaN(totals.stockValue) ? 0 : totals.stockValue;
    const potentialProfit = totalStockValue - totalInvestment;

    Logger.info(`Dashboard Stats: Inv=${totalInvestment.toFixed(2)}, StockVal=${totalStockValue.toFixed(2)}, Profit=${potentialProfit.toFixed(2)}`);

    return {
        totalProducts: products.length,
        totalInvestment: totalInvestment,
        totalStockValue: totalStockValue,
        potentialProfit: isNaN(potentialProfit) ? 0 : potentialProfit,
    };
}