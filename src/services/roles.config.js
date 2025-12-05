// ======================================================
// ARCHIVO: src/services/roles.config.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.2.0 - FILE: 1.1.0
// CORRECCIÓN: (Refactorización de Roles)
// 1. Se renombra 'ROLES.ADMIN' a 'ROLES.PROPIETARIO'.
// 2. Se renombra 'ROLES.USER' a 'ROLES.OPERADOR'.
// 3. Se actualizan las llaves en 'rolesConfig' para coincidir.
// ======================================================

// --- ¡INICIO DE CORRECCIÓN! ---
export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    PROPIETARIO: 'Propietario', // Antes: ADMIN: 'admin'
    OPERADOR: 'Operador',     // Antes: USER: 'user'
    CAJERO: 'Cajero'           // Antes: CAJERO: 'cajero'
};
// --- FIN DE CORRECCIÓN ---

export const PERMISSIONS = {
    // --- Vistas Generales ---
    VIEW_DASHBOARD: 'view:dashboard',                   // Permiso para ver el panel principal (cualquier rol)

    // --- Productos (Inventario) ---
    VIEW_INVENTORY_MODULE: 'view:inventory_module',     // Ver el módulo de Inventario (incluye resumen y sub-vistas)
    VIEW_PRODUCTS: 'view:products',                     // Ver la lista de productos
    CREATE_PRODUCT: 'product:create',                   // Crear un nuevo producto
    EDIT_PRODUCT: 'product:edit',                       // Editar un producto existente
    DELETE_PRODUCT: 'product:delete',                   // Eliminar un producto

    // --- Punto de Venta (POS) ---
    VIEW_POS_MODULE: 'view:pos_module',                 // Ver el módulo de Punto de Venta
    VIEW_POS: 'view:pos',
    USE_POS: 'pos:use',                                 // Realizar ventas/transacciones en el POS

    // --- Clientes (CRM) ---
    VIEW_CLIENTS_MODULE: 'view:clients_module',         // Ver el módulo de Clientes
    VIEW_CLIENTS: 'view:clients',
    // TODO: Añadir permisos CREATE_CLIENT, EDIT_CLIENT, etc. si es necesario

    // --- Empresas (Super Admin) --- NUEVO ---
    VIEW_COMPANIES_MODULE: 'view:companies_module',     // Ver el módulo de Empresas (Super Admin)
    VIEW_COMPANIES: 'view:companies',                   // Ver la lista de empresas
    CREATE_COMPANY: 'company:create',                   // Crear una nueva empresa
    EDIT_COMPANY: 'company:edit',                       // Editar una empresa
    DELETE_COMPANY: 'company:delete',                   // Eliminar una empresa
    MANAGE_COMPANY_USERS: 'company:manage_users',       // Gestionar usuarios de una empresa
    MANAGE_COMPANY_PLAN: 'company:manage_plan',         // Cambiar el plan/suscripción
    MANAGE_MY_TEAM: 'people:manage_team',               // Nuevo permiso

    // --- Configuración ---
    EDIT_SETTINGS_BUSINESS: 'settings:edit_business',   // Editar configuración DEL NEGOCIO (Admin)
    EDIT_SETTINGS_SYSTEM: 'settings:edit_system',       // Editar configuración DEL SISTEMA (Super Admin)

};

// --- ¡INICIO DE CORRECCIÓN! ---
// Actualizamos las llaves para que coincidan con el objeto ROLES
export const rolesConfig = {
    [ROLES.SUPER_ADMIN]: {
        // Super Admin tiene acceso a todo
        permissions: [
            PERMISSIONS.VIEW_DASHBOARD,

            // Empresas
            PERMISSIONS.VIEW_COMPANIES_MODULE,
            PERMISSIONS.VIEW_COMPANIES,
            PERMISSIONS.CREATE_COMPANY,
            PERMISSIONS.EDIT_COMPANY,
            PERMISSIONS.DELETE_COMPANY,
            PERMISSIONS.MANAGE_COMPANY_USERS,
            PERMISSIONS.MANAGE_COMPANY_PLAN,

            // Sistema
            PERMISSIONS.EDIT_SETTINGS_SYSTEM,
            PERMISSIONS.EDIT_SETTINGS_BUSINESS, // reporal para depuracion y desarrollo

            // Puede ver todo lo demás también (opcional, pero común) reporal para depuracion y desarrollo
            PERMISSIONS.VIEW_INVENTORY_MODULE,  // 
            PERMISSIONS.VIEW_PRODUCTS,          //
            PERMISSIONS.CREATE_PRODUCT,         //
            PERMISSIONS.EDIT_PRODUCT,           //
            PERMISSIONS.DELETE_PRODUCT,         //

            PERMISSIONS.VIEW_POS_MODULE,        //
            PERMISSIONS.USE_POS,                //
            PERMISSIONS.VIEW_CLIENTS_MODULE,    //
        ]
    },
    [ROLES.PROPIETARIO]: { // Antes: [ROLES.ADMIN]
        permissions: [
            PERMISSIONS.VIEW_DASHBOARD,
            PERMISSIONS.VIEW_INVENTORY_MODULE,
            PERMISSIONS.VIEW_PRODUCTS,
            PERMISSIONS.CREATE_PRODUCT,
            PERMISSIONS.EDIT_PRODUCT,
            PERMISSIONS.DELETE_PRODUCT,
            PERMISSIONS.VIEW_POS_MODULE,
            PERMISSIONS.USE_POS,
            PERMISSIONS.VIEW_CLIENTS_MODULE,
            PERMISSIONS.EDIT_SETTINGS_BUSINESS,
            PERMISSIONS.MANAGE_MY_TEAM,
        ]
    },
    [ROLES.OPERADOR]: { // Antes: [ROLES.USER]
        permissions: [
            PERMISSIONS.VIEW_DASHBOARD,
            PERMISSIONS.VIEW_INVENTORY_MODULE,
            PERMISSIONS.VIEW_PRODUCTS
        ]
    },
    [ROLES.CAJERO]: { // Antes: [ROLES.CAJERO] (solo cambiamos mayúscula)
        permissions: [
            PERMISSIONS.VIEW_DASHBOARD,
            PERMISSIONS.VIEW_POS_MODULE,
            PERMISSIONS.USE_POS,
            PERMISSIONS.VIEW_CLIENTS_MODULE,
        ]
    }
};
// --- FIN DE CORRECCIÓN ---