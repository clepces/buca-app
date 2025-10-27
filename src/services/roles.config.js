// ARCHIVO CORREGIDO Y DEFINITIVO: src/services/roles.config.js

export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    USER: 'user',
    CAJERO: 'cajero'
};

export const PERMISSIONS = {
    // Permisos de Acciones
    USE_POS: 'pos:use',
    CREATE_PRODUCT: 'product:create',
    EDIT_PRODUCT: 'product:edit',
    DELETE_PRODUCT: 'product:delete',
    EDIT_SETTINGS: 'settings:edit',

    // Permisos para ver Vistas
    VIEW_DASHBOARD: 'view:dashboard',
    VIEW_PRODUCTS: 'view:products',
    VIEW_POS: 'view:pos',
    VIEW_INVENTORY: 'view:inventory',
    VIEW_CLIENTS: 'view:clients',
};

export const rolesConfig = {
    [ROLES.SUPER_ADMIN]: {
        // Super Admin tiene acceso a todo
        permissions: [
            PERMISSIONS.VIEW_DASHBOARD,
            PERMISSIONS.VIEW_PRODUCTS,
            PERMISSIONS.VIEW_POS,
            PERMISSIONS.VIEW_INVENTORY,
            PERMISSIONS.VIEW_CLIENTS,
            PERMISSIONS.USE_POS,
            PERMISSIONS.CREATE_PRODUCT,
            PERMISSIONS.EDIT_PRODUCT,
            PERMISSIONS.DELETE_PRODUCT,
            PERMISSIONS.EDIT_SETTINGS,
        ]
    },
    [ROLES.ADMIN]: {
        // Admin del negocio tiene acceso a todo excepto configuraciones del sistema
        permissions: [
            PERMISSIONS.VIEW_DASHBOARD,
            PERMISSIONS.VIEW_PRODUCTS,
            PERMISSIONS.VIEW_POS,
            PERMISSIONS.VIEW_INVENTORY,
            PERMISSIONS.VIEW_CLIENTS,
            PERMISSIONS.USE_POS,
            PERMISSIONS.CREATE_PRODUCT,
            PERMISSIONS.EDIT_PRODUCT,
            PERMISSIONS.DELETE_PRODUCT,
            PERMISSIONS.EDIT_SETTINGS,
        ]
    },
    [ROLES.USER]: {
        permissions: [
            PERMISSIONS.VIEW_DASHBOARD,
            PERMISSIONS.VIEW_PRODUCTS,
            PERMISSIONS.VIEW_INVENTORY,
            PERMISSIONS.VIEW_CLIENTS,
            PERMISSIONS.CREATE_PRODUCT,
            PERMISSIONS.EDIT_PRODUCT,
        ]
    },
    [ROLES.CAJERO]: {
        permissions: [
            // El cajero puede ver el panel y la vista de caja.
            PERMISSIONS.VIEW_DASHBOARD, 
            PERMISSIONS.VIEW_POS,
            PERMISSIONS.USE_POS,
        ]
    }
};