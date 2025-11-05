// ======================================================
// ARCHIVO: src/store/state.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.1 - FILE: 1.0.3
// CORRECCIÓN: (Bug de Datos - Categoría)
// 1. Se añade 'cat_viveres' a 'available_categories'
//    para que los productos antiguos se muestren
//    correctamente en el formulario de edición.
// ======================================================

import { MODULES } from '../services/modules.config.js';

export const getInitialState = () => ({
	isAuthenticated: false, // <-- Obsoleto, pero se mantiene por ahora
	isLoading: false,
  
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
				symbol: '$', rate: 1},
				base: { symbol: 'Bs.'}
			},
		products: {
			available_categories: ['General', 'Alimentos', 'Bebidas', 'Limpieza', 'cat_viveres'],
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