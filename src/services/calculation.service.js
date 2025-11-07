import { Logger } from './logger.service.js';

export function calcularPrecioVenta(costoPorUnidad, porcentajeGanancia, unidades, settings) {
    Logger.info('--- Iniciando de Cálculo ---');
    // Logger.info('Costo recibido:', costoPorUnidad);
    // Logger.info('% Ganancia:', porcentajeGanancia);
    if (unidades <= 0) return null;
    const tasaIVA = settings.products.tax_rate / 100;
    const metodoCalculo = settings.products.calculation_method;
    let subtotalVenta;
    if (metodoCalculo === 'margin') {
        // Cálculo basado en MARGEN
        if (porcentajeGanancia >= 100) {
            console.error("El margen no puede ser 100% o más.");
            return null;
        }
        subtotalVenta = costoPorUnidad / (1 - (porcentajeGanancia / 100));
    } else {
        // Cálculo basado en RECARGO (markup) - el método por defecto
        subtotalVenta = costoPorUnidad * (1 + (porcentajeGanancia / 100));
    }
    // Logger.info('Subtotal (sin IVA):', subtotalVenta);
    const montoIVA = subtotalVenta * tasaIVA;
    // Logger.info('Monto del IVA:', montoIVA);
    const precioFinalTotal = subtotalVenta + montoIVA;
    // Logger.info('Precio Final Total:', precioFinalTotal);
    const precioFinalUnitario = precioFinalTotal / unidades;
    // Logger.info('Precio Final por Unidad:', precioFinalUnitario);
    Logger.info('--- Final de Cálculo ---');
    return {
        costoUnitarioDolar: costoPorUnidad / unidades,
        subtotalMayorDolar: subtotalVenta,
        montoIVAMayorDolar: montoIVA,
        precioFinalMayorDolar: precioFinalTotal,
        precioFinalUnitarioDolar: precioFinalUnitario,
    };
}

export function crearProducto(nombre, marca, categoria, descripcion, costoPorPaquete, ganancia, totalUnidades, unidadesPorPaquete, paquetes, settings) {
    const unidadesParaCalculo = unidadesPorPaquete > 0 ? unidadesPorPaquete : totalUnidades;
    const precios = calcularPrecioVenta(costoPorPaquete, ganancia, unidadesParaCalculo, settings);
    if (!precios) {
        console.error("Error al calcular el precio en la creación del producto.");
        return null;
    }
    const costoTotalCompraInicial = costoPorPaquete * (paquetes || 1);
    const costoUnitario = costoTotalCompraInicial / totalUnidades;
    return {
        product_info: {
            id: Date.now() + Math.floor(Math.random() * 1000),
            product_name: nombre,
            product_brand: marca,
            product_category: categoria,
            description: descripcion,
            purchase_history: [{
                date: new Date().toISOString(),
                quantity_added: totalUnidades,
                total_cost: costoTotalCompraInicial,
                cost_per_unit: costoUnitario
            }],
            product_estado: { disponible: totalUnidades }
        },
        product_price: {
            costo_inicial_paquete: costoPorPaquete,
            costo_promedio_paquete: costoPorPaquete,
            unidades_por_paquete: unidadesParaCalculo,
            venta_unidad: precios.precioFinalUnitarioDolar,
            venta_paquete: precios.precioFinalMayorDolar,
        },
        product_ajuste: {
            percentage: ganancia / 100
        }
    };
}

export function calcularTotalesCarrito(cart, allProducts, settings) {
    const ivaRate = settings.products.tax_rate;
    let subtotal = 0;
    cart.forEach(item => {
        const product = allProducts.find(p => p.id === item.id);
        if (product) {
            subtotal += product.pricing.unitSellPrice * item.quantity;
        }
    });
    const iva = subtotal * (ivaRate / 100);
    const total = subtotal + iva;
    return { subtotal, iva, total, ivaRate };
}