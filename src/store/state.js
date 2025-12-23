// ======================================================
// ARCHIVO: src/store/state.js
// VERSIÓN: 3.1.0 (Arquitectura Híbrida)
// PROPÓSITO: Fuente única de la verdad (Single Source of Truth).
// ======================================================

import { MODULES } from '../services/modules.config.js';

export const state = getInitialState();

export function getInitialState() {
	return {
		// --- 1. ESTADO DE SESIÓN Y SISTEMA (NO TOCAR) ---
		isAuthenticated: false,
		isLoading: true, // Controla el loader global (src/components/Common/Loader.js)

		session: {
			isLoggedIn: false,
			user: null,      // Datos del usuario logueado { uid, email, name, role }
			business: null   // Datos del negocio seleccionado actual { id, departmentId }
		},

		// --- 2. CONFIGURACIÓN Y APARIENCIA (NO TOCAR) ---
		// Utilizado por MainNav, Header y utilidades de renderizado.
		settings: {
			// Configuración básica de la tienda
			store: {
				store_name: 'Mi Tienda',
				store_description: 'Descripción de la tienda'
			},

			// Configuración traída de Firestore (feature flags, etc.)
			appConfig: {},
			exchangeRates: null,
			permissions: null,

			// Manejo de tasa (Dólar/Bolívar)
			currencies: {
				base: { symbol: 'Bs.', name: 'VES' },
				principal: { symbol: '$', rate: 0 }
			},

			// Configuración de productos
			products: {
				available_categories: ['General', 'Alimentos', 'Bebidas', 'Limpieza', 'cat_viveres'],
				tax_rate: 16,
				calculation_method: 'markup'
			},

			// Tema y apariencia
			appearance: {    // Tema oscuro/claro
				theme: 'light',
				sidebarCollapsed: false,
				header: {
					showFullscreen: true,
					showMessages: true,     // WIP feature
					showNotifications: true,
					showSettings: true,
					showRate: true,         // Tasa BCV
					showLanguage: true      // Selector Idioma
				}
			}
		},

		ui: {
			notifications: [], // Sistema de Toasts
			modalOpen: false,  // (Legacy) Algunos componentes revisan esto

			// --- 2.1. NAVEGACIÓN (NO TOCAR) ---   
			// Controla el contexto de navegación (Módulos, Vistas, etc.)
			navContext: MODULES.CORE,

			// --- 2.2. TOAST (NO TOCAR) ---
			// Sistema de Toasts    
			toast: {
				isVisible: false,
				message: '',
				type: 'info',
			},

			// [NUEVO] Estados de carga por módulo (UX Improvement)
			// Permite mostrar spinners locales en lugar de bloquear toda la app
			loading: {
				products: false,
				sales: false,
				auth: false
			}
		},

		// --- 3. DATOS ESPECÍFICOS (LEGACY / ALTO USO) ---
		// Se mantienen por compatibilidad con ProductsView y PosView actuales.
		products: [],
		clients: [],
		sales: [],

		// --- 4. [NUEVO] GESTIÓN DE VENTA (POS) ---
		// CRÍTICO: Necesario para manejar la venta en curso independientemente del historial.
		checkout: {
			cart: [],           // Array de items en el carrito
			customer: null,     // Cliente asignado a la venta
			discounts: [],      // Descuentos globales aplicados
			totals: {
				subtotal: 0,
				tax: 0,
				total: 0,
				total_currency_principal: 0 // Total en Bs (o moneda principal)
			}
		},

		// --- 5. [NUEVO] CONTENEDOR DE RECURSOS DINÁMICOS ---
		// Aquí se cargarán los módulos genéricos (Roles, Categorías, Unidades).
		// Estructura esperada: { 'business_roles': [...], 'categories': [...] }
		resources: {},

		// ✅ NUEVO: Banderas de control para evitar bucles infinitos
		// Estructura: { 'business_roles': { loading: false, loaded: true, error: null } }
		resourceFlags: {},

		// --- 6. [NUEVO] SINCRONIZACIÓN (OFFLINE FIRST) ---
		// Necesario para saber si hay datos pendientes por subir cuando vuelva el internet
		sync: {
			pendingUploads: 0,
			lastSync: null,
			status: 'idle' // 'idle', 'syncing', 'error'
		}
	};
}