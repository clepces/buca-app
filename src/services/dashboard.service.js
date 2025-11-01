// ======================================================
// ARCHIVO: src/services/dashboard.service.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: Actualizado para leer la nueva estructura de
//             datos del producto (ej. product.pricing.unitSellPrice)
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
        // --- ¡INICIO DE CORRECCIÓN! (Anotación M-2) ---
        // Leemos la nueva estructura "plana"
        const currentStock = product.stock?.current || 0;
        const packageCost = product.pricing?.packageCost || 0;
        const unitsPerPackage = product.pricing?.unitsPerPackage || 1;
        const unitSellPrice = product.pricing?.unitSellPrice || 0;
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
    }, { investment: 0, stockValue: 0 });

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