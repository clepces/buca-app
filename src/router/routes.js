// ======================================================
// ARCHIVO: src/router/routes.js
// VERSIÓN: 3.2.0 (Organizado y Corregido)
// PROPÓSITO: Definición central de rutas y sus adaptadores.
// ======================================================

import { PERMISSIONS } from '../services/roles.config.js';
import { MODULES } from '../services/modules.config.js';

// --- 1. CARGA PEREZOSA (LAZY LOADING) DE VISTAS EXISTENTES ---
// Estas vistas ya exportan la función que el router espera: (container) => { ... }
const DashboardView = () => import('../views/Dashboard/DashboardView.js').then(m => m.DashboardView);
const CompaniesView = () => import('../views/Companies/CompaniesView.js').then(m => m.CompaniesView);
const InventoryView = () => import('../views/Inventory/InventoryView.js').then(m => m.InventoryDashboardView);
const ProductsView = () => import('../views/Products/ProductsView.js').then(m => m.ProductsView);
const PosView = () => import('../views/Pos/PosView.js').then(m => m.PosView);
const ClientsView = () => import('../views/People/ClientsView.js').then(m => m.ClientsView);
const TeamView = () => import('../views/Team/TeamView.js').then(m => m.TeamView);

// --- 2. ADAPTADORES PARA VISTAS GENÉRICAS (NUEVA ARQUITECTURA) ---
// Aquí es donde solucionamos el problema. Convertimos la Clase Genérica
// en la función estándar que App.js sabe ejecutar.

const RolesView = async () => {
    // A. Importamos la Clase y la Configuración
    const { default: GenericModuleView } = await import('../views/GenericModuleView.js');
    const { rolesConfig } = await import('../configs/roles.config.js');

    // B. Retornamos la función constructora que App.js espera
    // (containerElement, state) son pasados por App.js automáticamente
    return (containerElement) => {
        // 1. Instanciamos la clase pasando la configuración requerida
        const viewInstance = new GenericModuleView(rolesConfig);

        // 2. Ejecutamos el renderizado en el ID del contenedor
        // Nota: GenericModuleView espera un ID (string), no el elemento DOM.
        viewInstance.render(containerElement.id);

        // 3. Retornamos la función de limpieza (Cleanup)
        return () => {
            // Si necesitaras limpiar eventos, iría aquí.
        };
    };
};

// ======================================================
// 3. DEFINICIÓN DE RUTAS (ROUTER CONFIG)
// ======================================================

export const routes = [
    // ----------------------------------------------------
    // ÁREA CORE / DASHBOARD
    // ----------------------------------------------------
    {
        path: '#/',
        component: DashboardView,
        permission: PERMISSIONS.VIEW_DASHBOARD,
        context: MODULES.CORE,
        isMainModule: true,
        label: 'Inicio',
        icon: 'bi-grid-1x2-fill'
    },
    {
        path: '#/companies',
        component: CompaniesView,
        permission: PERMISSIONS.VIEW_COMPANIES_MODULE, // Solo Super Admin
        context: MODULES.CORE,
        isMainModule: true,
        label: 'Negocios',
        icon: 'bi-building'
    },

    // ----------------------------------------------------
    // ÁREA OPERATIVA (POS & PRODUCTOS)
    // ----------------------------------------------------
    {
        path: '#/pos',
        component: PosView,
        permission: PERMISSIONS.VIEW_POS_MODULE,
        context: MODULES.POS,
        isMainModule: true,
        label: 'Ventas (Caja)',
        icon: 'bi-cart4'
    },

    // ----------------------------------------------------
    // ÁREA OPERATIVA (SCM)
    // ---------------------------------------------------- 
    {
        path: '#/inventory',
        component: InventoryView,
        permission: PERMISSIONS.VIEW_INVENTORY_MODULE,
        context: MODULES.SCM,
        isMainModule: true,
        label: 'Inventario',
        icon: 'bi-clipboard-data'
    },
    {
        path: '#/inventory/products',
        component: ProductsView,
        permission: PERMISSIONS.VIEW_PRODUCTS,
        context: MODULES.SCM,
        isMainModule: false,
        label: 'Productos',
        icon: 'bi-box-seam'
    },


    // ----------------------------------------------------
    // ÁREA CRM (PERSONAS & EQUIPO)
    // ----------------------------------------------------
    {
        path: '#/clients',
        component: ClientsView,
        permission: PERMISSIONS.VIEW_CLIENTS_MODULE,
        context: MODULES.CRM,
        isMainModule: false,
        label: 'Clientes',
        icon: 'bi-people'
    },
    {
        path: '#/team',
        component: TeamView,
        permission: PERMISSIONS.VIEW_TEAM_MODULE,
        context: MODULES.CRM,
        isMainModule: true,
        label: 'Equipo',
        icon: 'bi-person-badge'
    },

    // ----------------------------------------------------
    // ÁREA CONFIGURACIÓN (SETTINGS)
    // ----------------------------------------------------
    {
        path: '#/roles',
        component: RolesView, // Usamos el adaptador creado arriba
        // IMPORTANTE: Asegúrate de que este permiso exista en tu permissions.service.js
        // Si el usuario no tiene este permiso, el router hará un bucle de redirección.
        permission: PERMISSIONS.EDIT_SETTINGS_BUSINESS,
        context: MODULES.SETTINGS,
        isMainModule: true,
        label: 'Roles y Permisos',
        icon: 'bi-shield-lock'
    }
];