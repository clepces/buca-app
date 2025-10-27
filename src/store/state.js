// store/state.js
import { MODULES } from '../services/modules.config.js'; // importar MODULES!

/**
 * Genera el estado inicial de la aplicación.
 * Se usa para inicializar y para resetear (ej. al hacer logout).
 */
export const getInitialState = () => ({
  // Estado de autenticación y sesión
  isAuthenticated: false,
  isLoading: false, // Controla el estado de carga global (ej. login)
  user: null, // Almacenará { uid, email, name }
  
  // --- Cajones para la sesión ---
  businessId: null,   // Almacenará el ID del negocio activo
  departmentId: null, // Almacenará el ID del departamento del usuario
  role: null,         // Almacenará el rol del usuario (ej. 'owner', 'seller')
  // ------------------------------------

  // Estructura de sesión (usada por App.js)
  session: {
    isLoggedIn: false,
    user: null,
    business: null
  },

  // Configuración global de la app (cargada al inicio)
  settings: {
    store: {
      store_name: 'Mi Tienda',
      store_description: 'Descripción de la tienda'
    },
    currencies: {
      principal: {
        symbol: '$',
        rate: 1
      },
      base: {
        symbol: 'Bs.'
      }
    },
    products: {
      available_categories: ['General', 'Alimentos', 'Bebidas', 'Limpieza'],
      tax_rate: 16,
      calculation_method: 'markup'
    },
    appConfig: null, // Viene de la colección 'app_config'
    exchangeRates: null, // Viene de 'exchange_rates'
    permissions: null, // Basado en el rol
  },

  // Datos del negocio (se cargan después del login)
  products: [],
  clients: [],
  sales: [],
  // ... otros almacenes de datos ...
  
  // Estado de la UI
  ui: {
    navContext: MODULES.CORE, // Antes era main', 'inventory', 'pos', 'clients', etc.
    modal: {
      isOpen: false,
      content: null, // 'productForm', 'clientForm', etc.
      props: {},
    },
    toast: {
      isVisible: false,
      message: '',
      type: 'info', // 'info', 'success', 'error'
    },
  },
});

/**
 * El estado global de la aplicación (NO reactivo).
 * Es un simple objeto de JavaScript.
 * NO MODIFICAR DIRECTAMENTE. Usar acciones o servicios.
 */
export const state = getInitialState();