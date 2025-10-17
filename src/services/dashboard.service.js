export function getDashboardStats(products) {
    if (!products || products.length === 0) {
        return {
            totalProducts: 0,
            totalInvestment: 0,
            totalStockValue: 0,
            potentialProfit: 0,
        };
    }

    const totals = products.reduce((acc, product) => {
        const stock = product.product_info.product_estado.disponible || 0;
        const cost = product.product_price.costo_promedio_paquete || 0;
        const price = product.product_price.venta_paquete || 0;
        
        acc.investment += cost * stock;
        acc.stockValue += price * stock;
        
        return acc;
    }, { investment: 0, stockValue: 0 });

    return {
        totalProducts: products.length,
        totalInvestment: totals.investment,
        totalStockValue: totals.stockValue,
        potentialProfit: totals.stockValue - totals.investment,
    };
}