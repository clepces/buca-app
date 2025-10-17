// ARCHIVO NUEVO: src/services/modules.config.js

export const MODULES = {
    CORE: 'core',
    SGA_SCM: 'sga_scm',
    POS: 'pos',
    CRM: 'crm'
};

export const modulesConfig = [
    {
        id: MODULES.CORE,
        name: "Núcleo del Sistema",
        isDefault: true,
    },
    {
        id: MODULES.SGA_SCM,
        name: "Gestión de Almacén",
        isDefault: false,
    },
    {
        id: MODULES.POS,
        name: "Punto de Venta (POS)",
        isDefault: false,
    },
    {
        id: MODULES.CRM,
        name: "Gestión de Clientes (CRM)",
        isDefault: false,
    }
];