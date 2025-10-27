// src/router/routes.js

import { PERMISSIONS } from '../services/roles.config.js';
import { MODULES } from '../services/modules.config.js';

const ProductsView = () => import('../views/Inventory/products/ProductsView.js').then(m => m.ProductsView);
const PosView = () => import('../views/PosView.js').then(m => m.PosView);
const ClientsView = () => import('../views/ClientsView.js').then(m => m.ClientsView);

const DashboardView = () => import('../views/Dashboard/DashboardView.js').then(m => m.DashboardView);
const InventoryDashboardView = () => import('../views/Inventory/DashboardView.js').then(m => m.InventoryDashboardView);

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
    // --- Módulo INVENTARIO ---
    {
        path: '#/inventory',
        component: InventoryDashboardView, // Usa la importación actualizada
        permission: PERMISSIONS.VIEW_INVENTORY,
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
    // { // Ejemplo Futuro: Ruta de Ajustes de Inventario
    //     path: '#/inventory/settings',
    //     component: () => import('../views/Inventory/SettingsView.js').then(m => m.InventorySettingsView), // <-- Nota la ruta
    //     permission: PERMISSIONS.EDIT_SETTINGS,
    //     context: MODULES.SGA_SCM,
    //     isMainModule: false,
    //     label: 'Ajustes Inv.',
    //     icon: 'bi-sliders'
    // },
    // --- Módulo CAJA ---
    {
        path: '#/pos',
        component: PosView,
        permission: PERMISSIONS.VIEW_POS,
        context: MODULES.POS,
        isMainModule: true,
        label: 'Ventas y Compras',
        icon: 'bi-printer'
    },
    // --- Módulo CLIENTES ---
    {
        path: '#/clients',
        component: ClientsView,
        permission: PERMISSIONS.VIEW_CLIENTS,
        context: MODULES.CRM,
        isMainModule: true,
        label: 'Clientes',
        icon: 'bi-people'
    },
];