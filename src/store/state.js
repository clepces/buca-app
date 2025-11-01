// ======================================================
// ARCHIVO: src/store/state.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.1.0 - FILE: 1.0.2
// CORRECCIÓN: (Anotación J-2) Estado unificado.
// 1. Se eliminan 'user', 'businessId', 'departmentId' y 'role'
//    para evitar duplicidad. 'state.session' es ahora la única
//    fuente de verdad.
// ======================================================

import { MODULES } from '../services/modules.config.js';

export const getInitialState = () => ({
  isAuthenticated: false, // <-- Obsoleto, pero se mantiene por ahora
  isLoading: false,
  
  // --- SECCIÓN ELIMINADA (Duplicada) ---
  // user: null,
  // businessId: null,
  // departmentId: null,
  // role: null,
  // ------------------------------------

  session: {
    isLoggedIn: false,
    user: null,     // { uid, email, name, role }
    business: null  // { id, departmentId }
  },

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
    appConfig: null,
    exchangeRates: null,
    permissions: null,
  },

  products: [],
  clients: [],
  sales: [],
  
  ui: {
    navContext: MODULES.CORE,
    toast: {
      isVisible: false,
      message: '',
      type: 'info',
    },
  },
});

export const state = getInitialState();