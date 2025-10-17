
/**
 * ==========================================================================
 * B.U.C.A v3.1.0 - ESTRUCTURA DE DATOS MAESTRA Y DEFINITIVA
 * ==========================================================================
 * Incluye historial de tasas para la funcionalidad de "viaje en el tiempo".
 */
const firestoreDataStructure = {

    /**
     * COLECCIÓN RAÍZ: app_config
     */
    app_config: {   
        global: {
            // --- GESTIÓN DEL METADATA DE LA APP ---
            metadata: {
                appName: "Business Under Control Access",
                dataVersion: "3.1.0",// La versión actual de la ESTRUCTURA de la base de datos.
                appVersion: "3.0.0", // La versión actual del CÓDIGO de la aplicación cliente.
                lastUpdate: "2025-10-12T20:00:00.000Z"
            },

            // --- GESTIÓN DEL ESTADO DE LA APP ---
            systemStatus: {
                isMaintenanceMode: false, // ¡El "interruptor" principal!
                message: "Estamos realizando mejoras en el sistema. B.U.C.A volverá a estar disponible en breve. Agradecemos tu paciencia.",
                allowedRolesInMaintenance: ["super_admin"], // Opcional: Permitir acceso a ciertos roles (como super_admin) durante el mantenimiento.
            },

            // --- GESTIÓN DE FUNCIONALIDADES ---
            featureFlags: {
                "enablePdfExport": true,
                "enableMultiPriceList": false, // Lanzar esta función más adelante
                "showHistoricalRates": true,
                "apiBcvAutoUpdate": {
                    "enabled": true,
                    "updateFrequencyHours": 6
                }
                "enableCrmModule": false
            },

            // --- GESTIÓN DE CONFIGURACIONES POR DEFECTO ---
            modules: [
                {
                    "id": "core",
                    "name": "Núcleo del Sistema",
                    "description": "Gestión de usuarios, roles y la información básica del negocio.",
                    "isDefault": true, // Este módulo siempre está incluido
                    "tables": [
                        { "key": "tenants", "name": "Negocios" },
                        { "key": "users", "name": "Usuarios" },
                        { "key": "roles", "name": "Roles" }
                    ]
                },
                {
                    "id": "sga_scm",
                    "name": "Gestión de Almacén y Compras (SGA/SCM)",
                    "description": "Control de productos, inventario, categorías y proveedores.",
                    "isDefault": false,
                    "tables": [
                        { "key": "products", "name": "Productos" },
                        { "key": "categories", "name": "Categorías" },
                        { "key": "suppliers", "name": "Proveedores" },
                        { "key": "inventory", "name": "Inventario" },
                        { "key": "warehouses", "name": "Almacenes" }
                    ]
                },
                {
                    "id": "pos",
                    "name": "Punto de Venta (POS)",
                    "description": "Módulo de caja para registrar ventas.",
                    "isDefault": false,
                    "tables": [
                        { "key": "pos_terminals", "name": "Terminales de Caja" },
                        { "key": "sales", "name": "Ventas" },
                        { "key": "sale_items", "name": "Artículos de Venta" }
                    ]
                },
                {
                    "id": "crm",
                    "name": "Gestión de Clientes (CRM)",
                    "description": "Base de datos de clientes, historial de compras y comunicación.",
                    "isDefault": false,
                    "tables": [
                        { "key": "customers", "name": "Clientes" }
                    ]
                }
            ],
            plans: {
                "basico": {
                    name: "Plan Básico",
                    maxUsers: 5,
                    maxProducts: 1000,
                    allowedModules: ["core", "sga_scm"]
                },
                "premium": {
                    name: "Plan Premium",
                    maxUsers: 20,
                    maxProducts: 10000,
                    allowedModules: ["core", "sga_scm", "pos", "crm"]
                }
            },
            roles: {
                "super_admin": {
                    name: "Super Administrador",
                    description: "Control total del sistema y todos los negocios.",
                    permissions: ["ALL"] // Un permiso especial que sobrepasa a todos
                },
                "admin": {
                    name: "Administrador de Negocio",
                    description: "Acceso completo a la gestión de un negocio específico.",
                    permissions: [
                        "dashboard:view",
                        "products:create", "products:edit", "products:delete",
                        "pos:use",
                        "settings:edit",
                        "users:manage" // Nuevo permiso para gestionar usuarios del negocio
                    ]
                },
                "cajero": {
                    name: "Cajero",
                    description: "Acceso limitado al módulo de Punto de Venta (POS).",
                    permissions: [
                        "dashboard:view", // Puede ver un dashboard simplificado
                        "pos:use"
                    ]
                }
            },
            securityDefaults: {
                minSessionDurationMinutes: 5,
                maxSessionDurationMinutes: 1440, // 24 horas
                passwordPolicy: {
                    minLength: 8,
                    requiresUppercase: true,
                    requiresNumber: true
                }
            },
            defaultBusinessSettings: {
                info: {
                    plan: "basico",
                    subscriptionStatus: "trial", // Inician en período de prueba
                    activeModules: ["core", "sga_scm"]
                },
                settings: {
                    localization: {
                        language: "es-VE",
                        country: "VE",
                        timezone: "America/Caracas"
                    },
                    currencies: {
                        base: { code: "VES", symbol: "Bs." },
                        primary: { code: "USD", symbol: "$" }
                    },
                    // ...y otras configuraciones por defecto.
                }
            },

            // --- GESTIÓN DE SERVICIOS EXTERNOS ---
            integrations: {
                bcvApi: {
                    apiUrl: "https://pydolarvenezuela.vercel.app/api/v1/dollar/unit/bcv",
                    // ¡IMPORTANTE! La clave de la API no se guarda aquí directamente por seguridad.
                    // Se guarda en un servicio seguro como Google Secret Manager y se referencia aquí.
                    apiKeySecretName: "BCV_API_KEY"
                },
                googleMaps: {
                    apiKeySecretName: "GOOGLE_MAPS_API_KEY"
                }
            }

            // --- GESTIÓN DE LEGALIDA ---
            templates: {
                email: {
                    newUserWelcome: {
                        subject: "¡Bienvenido a B.U.C.A!",
                        body: "Hola {{userName}}, tu cuenta para el negocio {{businessName}} ha sido creada..."
                    }
                }
            },
            legal: {
                termsOfService: {
                    version: "1.1",
                    url: "https://buca.com/terms"
                },
                privacyPolicy: {
                    version: "1.1",
                    url: "https://buca.com/privacy"
                }
            }
        }
    },

    /**
     * COLECCIÓN RAÍZ: app_releases
     */
    app_releases: {
        "3.1.0": {
            releaseDate: "2025-10-15T10:00:00.000Z",
            title: "Gestión de Clientes (CRM) y Mejoras de Inventario",
            notes: [
                { 
                    type: "new", 
                    text: "¡Lanzamiento del nuevo módulo de Clientes (CRM)!" 
                },
                { 
                    type: "improvement", 
                    text: "Ahora es posible registrar lotes y fechas de vencimiento en los productos." 
                },
                {   
                    type: "fix", 
                    text: "Corregido un error que impedía eliminar categorías en ciertos casos." 
                }
            ]
        },
        "3.0.0": {
            releaseDate: "2025-10-12T...",
            title: "Lanzamiento de la Nueva Arquitectura B.U.C.A 3",
            notes: [
                { type: "new", text: "Refactorización completa a una arquitectura modular y escalable." },
                { type: "new", text: "Implementación de seguridad por roles y gestión de dispositivos." }
            ]
        }
    },

    /**
     * COLECCIÓN RAÍZ: exchange_rates
     * Fuente de verdad para todas las tasas de cambio, AHORA CON HISTORIAL.
     */
    exchange_rates: {
        "USD": {
            name: "Dólar Estadounidense",
            source: "bcv",
            rate: 36.52,
            lastUpdated: "2025-10-12T13:00:00.000Z",
            history: {
                // El ID del documento es la fecha en formato AAAA-MM-DD
                "2025-10-12": { rate: 36.52},
                "2025-10-11": { rate: 36.48}
            }
        },
        "EUR": {
            name: "Euro",
            source: "bcv",
            rate: 39.80,
            lastUpdated: "2025-10-12T13:00:00.000Z",
            history: {
                "2025-10-12": { rate: 39.80},
                "2025-10-11": { rate: 39.75 }
            }
        }
    },

    /**
     * COLECCIÓN RAÍZ: user_directory
     */
    user_directory: {
        "KhQuMAblaAOzdRIdfYzPEK1dG3E3": { businessId: "business_mega_center", role: "admin" },
        "ONpw5ruadGRIazS7dCNx6BiNw3G2": { businessId: "business_mega_center", role: "cajero" },
        "iYRAvDtGUmShQcC26WJROj98NuJ3": { role: "super_admin" }
    },

    /**
     * COLECCIÓN RAÍZ: businesses
     */
    businesses: {
        "business_mega_center": {
            info: {
                name: "Mega Center",
                description: "Tu tienda de confianza en el centro de la ciudad.",
                owner: "Juan Dueño",
                address: "Av. Principal, Nro. 123, San Carlos, Cojedes",
                email: "contacto@megacenter.com",
                phone: "+58-412-1234567",
                plan: "premium",
                subscriptionStatus: "active", // 'active', 'past_due', 'canceled'
                trialEndDate: null,
                activeModules: ["core", "sga_scm", "pos"],
                createdAt: "2024-08-15T10:00:00.000Z"
            },
            settings: {
                localization: {
                    language: "es-VE",
                    country: "VE",
                    timezone: "America/Caracas"
                },
                currencies: {
                    base: { code: "VES", symbol: "Bs." },
                    primary: { code: "USD", symbol: "$" },
                    secondary: [ { code: "EUR", symbol: "€" } ]
                },
                productDefaults: {
                    defaultTaxRatePercentage: 16,
                    displayPricesWithTax: true,
                    calculationMethod: "margin"
                },
                pagination: {
                    itemsPerPage: 10
                },
                security: {
                    sessionDurationMinutes: 240, // 4 horas, dentro del límite global
                    maxLoginAttempts: 5,
                    lockoutDurationMinutes: 15
                }
            },
            users: {
                "KhQuMAblaAOzdRIdfYzPEK1dG3E3": { // juan.dueño@megacenter.com
                    name: "Juan Dueño",
                    email: "juan.dueño@megacenter.com",
                    role: "admin",
                    isActive: true,
                    createdAt: "2024-08-15T10:05:00.000Z",
                    session: {
                        activeDeviceId: "fingerprint_laptop_juan",
                        lastLogin: "2025-10-12T20:15:00.000Z",
                        lastIpAddress: "200.44.33.11"
                    },
                    securitySettings: {
                        sessionMode: "multiple" // El dueño puede tener múltiples sesiones
                    }
                },
                "ONpw5ruadGRIazS7dCNx6BiNw3G2": { // pedro.cajero@megacenter.com
                    name: "Pedro Cajero",
                    email: "pedro.cajero@megacenter.com",
                    role: "cajero",
                    isActive: true,
                    createdAt: "2024-09-01T08:00:00.000Z",
                    session: {
                        activeDeviceId: "fingerprint_pos_caja1",
                        lastLogin: "2025-10-12T19:30:00.000Z",
                        lastIpAddress: "200.44.33.50"
                    },
                    securitySettings: {
                        sessionMode: "single" // El cajero solo puede tener una sesión
                    }
                }
            },
            devices: {
                "fingerprint_laptop_juan": {
                    userId: "KhQuMAblaAOzdRIdfYzPEK1dG3E3",
                    status: "approved",
                    name: "Laptop Oficina",
                    type: "Browser",
                    metadata: { os: "Windows 11", browser: "Chrome 125" },
                    firstSeen: "2024-08-16T11:00:00.000Z",
                    lastSeen: "2025-10-12T20:15:00.000Z",
                    approvedBy: "KhQuMAblaAOzdRIdfYzPEK1dG3E3",
                    approvedAt: "2024-08-16T11:00:00.000Z"
                },
                "fingerprint_pos_caja1": {
                    userId: "ONpw5ruadGRIazS7dCNx6BiNw3G2",
                    status: "approved",
                    name: "POS Caja #1",
                    type: "Browser",
                    metadata: { os: "Windows 10", browser: "Firefox 124" },
                    firstSeen: "2024-09-01T08:01:00.000Z",
                    lastSeen: "2025-10-12T19:30:00.000Z",
                    approvedBy: "KhQuMAblaAOzdRIdfYzPEK1dG3E3",
                    approvedAt: "2024-09-01T08:01:00.000Z"
                }
            },
            products: {
                "prod_17237482": {
                    // ¡IMPORTANTE! El precio del producto SIEMPRE se calcula
                    // y muestra con la tasa actual (la del documento principal de `exchange_rates`).
                    // La vista histórica es solo una simulación temporal en la interfaz.
                    sku: "POL-HP-001",
                    barcode: "7591001001017",
                    name: "Harina P.A.N.",
                    brand: "Empresas Polar",
                    categoryId: "cat_viveres",
                    description: "Harina de maíz blanco precocida, ideal para arepas.",
                    isActive: true,
                    isFeatured: true,
                    images: [ { url: "gs://buca-app/products/pan.jpg", isPrimary: true } ],
                    dimensions: { 
                        weight: 1, 
                        weightUnit: "kg", 
                        width: 15, 
                        height: 20, 
                        depth: 5, 
                        dimensionUnit: "cm" 
                    },
                    stock: { 
                        current: 100, 
                        minThreshold: 10, 
                        warehouseId: "wh_principal" 
                    },
                     // ESTRUCTURA DE PRECIOS MEJORADA
                    pricing: {
                        packageCost: 13.75,
                        unitsPerPackage: 20,
                        taxRatePercentage: 16,
                        priceLists: [
                            { 
                                id: "publico", 
                                name: "Precio Público", 
                                marginPercentage: 20, 
                                unitSellPrice: 0.997, 
                                packageSellPrice: 19.94 
                            },
                            { 
                                id: "mayorista", 
                                name: "Precio Mayorista", 
                                marginPercentage: 12, 
                                unitSellPrice: 0.897, 
                                packageSellPrice: 17.94 
                            }
                        ]
                    },
                    purchaseHistory: [
                        {
                            "date": "2025-08-25T22:45:09.403Z",
                            "quantityAdded": 100,
                            "totalCost": 13.75,
                            "costPerUnit": 0.6875,
                            "supplierId": null
                        }
                    ],
                    createdAt: "2024-08-20T14:00:00.000Z",
                    updatedAt: "2025-10-10T09:00:00.000Z",
                    
                    // SUBCOLECCIÓN PARA INVENTARIO AVANZADO
                    inventory_lots: {
                        "lote_20250825": {
                            quantity: 100,
                            costPerUnit: 0.6875,
                            purchaseDate: "2025-08-25T...",
                            supplierId: "sup_polar",
                            expiryDate: "2026-08-25T...",
                        }
                    }
                }
            },
            sales: {
                "sale_20251012_001": {
                    invoiceNumber: "FAC-001254",
                    customerId: null,
                    userId: "ONpw5ruadGRIazS7dCNx6BiNw3G2", // Vendido por Pedro Cajero
                    deviceId: "fingerprint_pos_caja1",
                    subtotal: 25.00,
                    tax: 4.00,
                    total: 29.00,
                    payment: { method: "cash", amount: 29.00, currency: "USD" },
                    status: "completed",
                    notes: "El cliente pagó con un billete de $50, se dio $21 de vuelto.",
                    createdAt: "2025-10-12T18:30:00.000Z",
                    
                    sale_items: {
                        "item_1": {
                            productId: "prod_17237482",
                            productName: "Harina P.A.N.",
                            quantity: 5,
                            unitPrice: 1.20,
                            totalPrice: 6.00
                        },
                         "item_2": {
                            productId: "prod_17237483",
                            productName: "Coca-Cola 1.5L",
                            quantity: 10,
                            unitPrice: 1.90,
                            totalPrice: 19.00
                        }
                    }
                }
            },
            categories: {
                "cat_viveres": { name: "Víveres", description: "Alimentos no perecederos." },
                "cat_bebidas": { name: "Bebidas", description: "Refrescos, jugos y aguas." }
            },
            suppliers: {
                "sup_polar": { 
                    name: "Empresas Polar", 
                    contactPerson: "Ana Silva",
                    email: "ventas@polar.com",
                    balance: 1200.00, // Les debemos dinero

                    // SUBCOLECCIÓN DE CUENTA CORRIENTE
                    ledger: {
                        "mov_1": {
                            date: "2025-08-25T...",
                            type: "PURCHASE", // 'PURCHASE', 'PAYMENT'
                            amount: 1375.00, // Aumenta nuestra deuda
                            referenceId: "factura_proveedor_123"
                        }
                    }
                }
            }, 
            warehouses: {
                "wh_principal": { // ID único del almacén
                    name: "Almacén Principal",
                    address: "Calle 4, Galpón 5, Zona Industrial, San Carlos",
                    isPrimary: true, // Indica si es el almacén por defecto
                    contact: {
                        person: "Carlos Alfonzo",
                        phone: "+58-412-5551234",
                        email: "almacen.principal@megacenter.com"
                    },
                    createdAt: "2024-08-15T10:10:00.000Z"
                },
                "wh_tienda_centro": {
                    name: "Depósito Tienda Centro",
                    address: "Av. Bolívar, Local 10, Centro de San Carlos",
                    isPrimary: false,
                    contact: {
                        person: "Maria Gimenez",
                        phone: "+58-412-5555678",
                        email: "tienda.centro@megacenter.com"
                    },
                    createdAt: "2024-09-01T11:00:00.000Z"
                }
            },
            customers: {
                "cust_1_rif_V123456789": { // ID único, puede incluir el RIF/CI para evitar duplicados
                    type: "business", // 'business' (jurídico) o 'individual' (natural)
                    legalName: "Inversiones ABC C.A.",
                    taxId: "J-12345678-9", // RIF
                    contact: {
                        primaryContactPerson: "Luisa Fernandez",
                        email: "compras@inversionesabc.com",
                        phone: "+58-212-9998877",
                        address: {
                            fullAddress: "Torre Empresarial, Piso 10, Ofc. 10B, Caracas",
                            city: "Caracas",
                            state: "Distrito Capital",
                            country: "Venezuela"
                        }
                    },
                    
                    // ¡NUEVO! Resumen para acceso rápido sin tener que consultar todas las ventas.
                    purchaseStats: {
                        lastPurchaseDate: "2025-10-10T14:20:00.000Z",
                        totalSpent: 1540.50, // Monto total histórico
                        purchaseCount: 12 // Número de compras
                    },
                    
                    // ¡NUEVO! Para clasificar clientes.
                    tags: ["mayorista", "cliente_frecuente"],
                    balance: -250.75, // Saldo actual

                    // SUBCOLECCIÓN DE CUENTA CORRIENTE
                    ledger: {
                        "mov_1": {
                            date: "2025-10-12T...",
                            type: "SALE",
                            amount: 99.18,
                            referenceId: "sale_20251012_001"
                        }
                    },
                    createdAt: "2024-11-05T15:00:00.000Z"
                },
            },
            activity_log: {
                "id_del_log": {
                    timestamp: "2025-10-12T22:00:00.000Z",
                    type: "AUTH_DEVICE_PENDING",
                    userId: "uid_del_usuario",
                    message: "Intento de acceso desde dispositivo no registrado.",
                    details: {
                        deviceId: "fingerprint_id_del_nuevo_dispositivo",
                        ipAddress: "200.44.33.22"
                    }
                }
            },
            notifications: {
                "notif_id_1": {
                    type: "DEVICE_APPROVAL_REQUEST",
                    fromUserId: "uid_del_usuario_1",
                    toRole: "admin", // Dirigido a todos los admins
                    details: {
                        "deviceId": "fingerprint_id_2",
                        "deviceName": "Teléfono Personal"
                    },
                    isRead: false,
                    createdAt: "2025-10-15T08:00:00.000Z"
                }
            },
        }
    }
};