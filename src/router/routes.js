// ======================================================
// ARCHIVO CORREGIDO: src/router/routes.js
// ======================================================

import { PERMISSIONS } from '../services/roles.config.js';
import { MODULES } from '../services/modules.config.js';

// --- Importaciones de Vistas ---
const ProductsView = () => import('../views/Inventory/products/ProductsView.js').then(m => m.ProductsView);
const PosView = () => import('../views/PosView.js').then(m => m.PosView);
const ClientsView = () => import('../views/ClientsView.js').then(m => m.ClientsView);
const DashboardView = () => import('../views/Dashboard/DashboardView.js').then(m => m.DashboardView);
const InventoryDashboardView = () => import('../views/Inventory/DashboardView.js').then(m => m.InventoryDashboardView);

// --- ¡CORRECCIÓN AQUÍ! ---
// Debe importar 'CompaniesView' desde 'CompaniesView.js', no 'InventoryDashboardView'
const CompaniesDashboardView = () => import('../views/Companies/CompaniesView.js').then(m => m.CompaniesView);


export const routes = [
    // --- Módulo CORE ---
    {
        path: '#/',
        component: DashboardView,
        permission: PERMISSIONS.VIEW_DASHBOARD,
        context: MODULES.CORE,
        isMainModule: true,
        label: 'Panel',
        icon: 'bi-grid-1x2-fill'
    },
    // --- Módulo COMPANIES (NUEVO) ---
    {
        path: '#/companies',
        component: CompaniesDashboardView, // Usa la importación corregida
        permission: PERMISSIONS.VIEW_COMPANIES_MODULE,
        context: MODULES.CORE, // Lo mantenemos en CORE según tu ruta
        isMainModule: true,
        label: 'Empresas',
        icon: 'bi-building' // Icono más apropiado
    },
    // --- Módulo INVENTARIO ---
    {
        path: '#/inventory',
        component: InventoryDashboardView,
        // --- ¡CORRECCIÓN AQUÍ! ---
        // El permiso se renombró a VIEW_INVENTORY_MODULE
        permission: PERMISSIONS.VIEW_INVENTORY_MODULE,
        context: MODULES.SGA_SCM,
        isMainModule: true,
        label: 'Inventario',
        icon: 'bi-box-seam'
    },
    {
        path: '#/inventory/products',
        component: ProductsView,
        permission: PERMISSIONS.VIEW_PRODUCTS,
        context: MODULES.SGA_SCM,
        isMainModule: false,
        label: 'Productos',
        icon: 'bi-boxes'
    },
    // --- Módulo CAJA ---
    {
        path: '#/pos',
        component: PosView,
        permission: PERMISSIONS.VIEW_POS, // Este estaba bien
        context: MODULES.POS,
        isMainModule: true,
        label: 'Ventas y Compras',
        icon: 'bi-printer'
    },
    // --- Módulo CLIENTES ---
    {
        path: '#/clients',
        component: ClientsView,
        permission: PERMISSIONS.VIEW_CLIENTS, // Este estaba bien
        context: MODULES.CRM,
        isMainModule: true,
        label: 'Clientes',
        icon: 'bi-people'
    },
];