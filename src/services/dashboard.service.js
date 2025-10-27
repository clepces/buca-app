// src/services/dashboard.service.js
import { Logger } from './logger.service.js'; // <-- AÑADIR ESTA LÍNEA

export function getDashboardStats(products) {

    Logger.info(`Dashboard Stats: Calculando con ${products ? products.length : 0} productos.`);
    if (products && products.length > 0) {
        Logger.trace('Primer producto para cálculo:', JSON.stringify(products[0])); // Log first product data
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
        const currentStock = product.stock?.current || 0;
        const packageCost = product.pricing?.packageCost || 0;
        // --- ¡CAMBIO AQUÍ! Acceso a unitsPerPackage ---
        // Ahora lee directamente de pricing o del objeto priceLists
        const unitsPerPackage = product.pricing?.unitsPerPackage || product.pricing?.priceLists?.unitsPerPackage || 1;
        // --- ¡CAMBIO AQUÍ! Acceso a unitSellPrice ---
        // Ahora lee directamente de pricing o del objeto priceLists
        const unitSellPrice = product.pricing?.unitSellPrice || product.pricing?.priceLists?.unitSellPrice || 0;
        // ---------------------------------------------

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

    // ... (handle NaN and return) ...
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