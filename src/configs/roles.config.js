export const rolesConfig = {
    title: "Gestión de Roles",
    description: "Aqui puede gestionar los roles de la aplicacion",
    collection: "business_roles",

    // Configuración para tu DataTable.js existente
    tableColumns: [
        { key: "name", label: "Rol" },
        { key: "description", label: "Descripción" },
        { key: "active", label: "Estado", render: (val) => val ? 'Activo' : 'Inactivo' }
    ],

    // Configuración para el Wizard
    wizardSteps: [
        {
            title: "Datos del Rol",
            fields: [
                {
                    name: "name",
                    label: "Nombre del Rol",
                    type: "text",
                    required: true,
                    placeholder: "Ej: Supervisor"
                },
                {
                    name: "description",
                    label: "Descripción",
                    type: "textarea",
                    required: false
                }
            ]
        },
        {
            title: "Permisos",
            fields: [
                {
                    name: "permissions",
                    label: "Asignar Permisos",
                    type: "checkbox-group", // Ojo: Tendremos que adaptar esto en el Wizard
                    options: [
                        { value: "pos", label: "Punto de Venta" },
                        { value: "inventory", label: "Inventario" },
                        { value: "users", label: "Usuarios" }
                    ]
                }
            ]
        }
    ]
};