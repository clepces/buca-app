
export function getInitialState() {
    return {
        products: [],
        cart: [],
        settings: {
            store: {
                store_name: 'Business Under Control',
                store_description: 'Business Manager and Price Calculator',
                store_keywords: ['tienda', 'inventario', 'precios'],
                store_owner: '',
                store_address: '',
                store_geocode: '',
                store_email: '',
                store_telephone: '',
                store_fax: ''
            },
            locations: {
                country_id: 232, // Venezuela
                language: 'es',
                length_class_id: 1, // Centímetro
                weight_class_id: 1, // Kilogramo
            },
            currencies: {
                base: { code: "VES", symbol: "Bs." },
                principal: { code: "USD", symbol: "$", rate: 175.06471 },
                secundarias: [
                    { code: "EUR", symbol: "€", rate: 205.38766697 }
                ]
            },
            products: {
                items_per_page: 10,
                tax_rate: 16.0, // 16% IVA
                calculation_method: 'markup',
                display_prices_with_tax: false,
                available_categories: ['Viveres', 'Limpieza', 'Bebidas']
            },
            users: {
                online: true,
                customer_activity: true,
                max_login_attempts: 3
            },
            session: {
                time: 30, // en minutos
                warning_time: 60 // en segundos
            },
            security: {
                lockout_time: 15, // en minutos
                // password: Removido por seguridad - se maneja en Firebase Auth
            },
            appearance: {
                theme: 'light'
            }
        },
        history: {
            history_tasa: [],
            session_history: [],
            activity_log: []
        },
        session: {
            isLoggedIn: false,
            user: null,         // <-- Aquí guardaremos los datos del usuario
            business: null,     // <-- ¡NUEVO! Aquí guardaremos los datos del negocio
            lockUntil: null,
            loginAttempts: 0
        }
    };
}