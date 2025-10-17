// ARCHIVO NUEVO: src/router/routes.js

import { PERMISSIONS } from '../services/roles.config.js';

// Importamos las vistas de forma dinámica para el router
const DashboardView = () => import('../views/DashboardView.js').then(m => m.DashboardView);
const ProductsView = () => import('../views/ProductsView.js').then(m => m.ProductsView);
const PosView = () => import('../views/PosView.js').then(m => m.PosView);
const InventoryView = () => import('../views/InventoryView.js').then(m => m.InventoryView);
const ClientsView = () => import('../views/ClientsView.js').then(m => m.ClientsView);

export const routes = [
    { 
        path: '#/', 
        component: DashboardView, 
        permission: PERMISSIONS.VIEW_DASHBOARD 
    },
    { 
        path: '#/products', 
        component: ProductsView, 
        permission: PERMISSIONS.VIEW_PRODUCTS 
    },
    { 
        path: '#/pos', 
        component: PosView, 
        permission: PERMISSIONS.VIEW_POS 
    },
    { 
        path: '#/inventory', 
        component: InventoryView, 
        permission: PERMISSIONS.VIEW_INVENTORY 
    },
    { 
        path: '#/clients', 
        component: ClientsView, 
        permission: PERMISSIONS.VIEW_CLIENTS 
    },
];