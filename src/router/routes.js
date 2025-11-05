// ======================================================
// ARCHIVO: src/router/routes.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: Usar permisos de MÓDULO (Anotación C-5)
// ======================================================

import { PERMISSIONS } from '../services/roles.config.js';
import { MODULES } from '../services/modules.config.js';

// --- Importaciones de Vistas ---

// VISTAS: SUPER ADMIN, PROPIETARIO, OPERADOR, CAJA
const DashboardView = () => import('../views/Dashboard/DashboardView.js').then(m => m.DashboardView);
const CompaniesDashboardView = () => import('../views/Companies/CompaniesView.js').then(m => m.CompaniesView);

// VISTAS: PROPIETARIO, OPERADOR
const InventoryDashboardView = () => import('../views/Inventory/DashboardView.js').then(m => m.InventoryDashboardView);
const ProductsView = () => import('../views/Inventory/products/ProductsView.js').then(m => m.ProductsView);

// VISTAS: PROPIERARIO, CAJA
const PosView = () => import('../views/PosView.js').then(m => m.PosView);

// VISTAS: PROPIETARIO, OPERADOR, CAJA -> limitado  
const ClientsView = () => import('../views/ClientsView.js').then(m => m.ClientsView);


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
    {
        path: '#/companies',
        component: CompaniesDashboardView,
        permission: PERMISSIONS.VIEW_COMPANIES_MODULE,
        context: MODULES.CORE,
        isMainModule: true,
        label: 'Empresas',
        icon: 'bi-building'
    },
    // --- Módulo INVENTARIO ---
    {
        path: '#/inventory',
        component: InventoryDashboardView,
        permission: PERMISSIONS.VIEW_INVENTORY_MODULE, // <-- Correcto
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
        permission: PERMISSIONS.VIEW_POS_MODULE, // Antes: VIEW_POS
        context: MODULES.POS,
        isMainModule: true,
        label: 'Ventas y Compras',
        icon: 'bi-printer'
    },
    // --- Módulo CLIENTES ---
    {
        path: '#/clients',
        component: ClientsView,
        permission: PERMISSIONS.VIEW_CLIENTS_MODULE, // Antes: VIEW_CLIENTS
        context: MODULES.CRM,
        isMainModule: true,
        label: 'Clientes',
        icon: 'bi-people'
    },
];