import { Logger } from './logger.service.js';

export function generarPDF(productos, nombreTienda, settings) {
    if (typeof window.jspdf === 'undefined') {
        Logger.error("La librería jspdf no está cargada. Asegúrate de que esté en index.html.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const simboloMoneda = settings.currencies.principal.symbol || '$';

    doc.setFontSize(18);
    doc.text(`Listado de Productos - ${nombreTienda}`, 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString('es-VE')}`, 14, 30);

    const head = [['#', 'Producto', 'Marca', 'Categoría', `Precio (${simboloMoneda})`]];
    const body = productos.map((p, index) => [
        index + 1,
        p.product_info.product_name,
        p.product_info.product_brand,
        p.product_info.product_category,
        p.product_price.venta_paquete.toFixed(2)
    ]);

    doc.autoTable({
        startY: 40,
        head: head,
        body: body,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save(`productos_${nombreTienda}_${new Date().toISOString().slice(0, 10)}.pdf`);
}