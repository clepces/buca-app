// ======================================================
// ARCHIVO: src/utils/useListController.js
// PROPÓSITO: Lógica reutilizable para filtrar y paginar listas.
// Reduce código repetido en Views (Companies, Products, etc.)
// ======================================================

export function useListController(options = {}) {
    const {
        itemsPerPage = 10,
        searchKeys = ['name'] // Campos donde buscar texto
    } = options;

    // Estado interno
    let state = {
        allData: [],
        filteredData: [],
        currentPage: 1,
        itemsPerPage: itemsPerPage,
        searchTerm: '',
        filters: {} // Filtros extra (ej: status: 'active')
    };

    // Cargar datos iniciales
    const setData = (data) => {
        state.allData = data;
        applyFilters();
    };

    // Cambiar término de búsqueda
    const setSearch = (term) => {
        state.searchTerm = term.toLowerCase();
        state.currentPage = 1; // Resetear a página 1
        applyFilters();
    };

    // Aplicar filtro específico (ej: status)
    const setFilter = (key, value) => {
        state.filters[key] = value;
        state.currentPage = 1;
        applyFilters();
    };

    // Lógica central de filtrado
    const applyFilters = () => {
        let result = state.allData;

        // 1. Filtrar por propiedades específicas (ej: status)
        Object.keys(state.filters).forEach(key => {
            const filterVal = state.filters[key];
            if (filterVal !== 'all' && filterVal !== null) {
                result = result.filter(item => item[key] === filterVal);
            }
        });

        // 2. Filtrar por texto (Buscador)
        if (state.searchTerm) {
            result = result.filter(item => {
                return searchKeys.some(key => {
                    const val = item[key];
                    return val && String(val).toLowerCase().includes(state.searchTerm);
                });
            });
        }

        state.filteredData = result;
    };

    // Obtener datos para la página actual
    const getPaginatedData = () => {
        const start = (state.currentPage - 1) * state.itemsPerPage;
        return state.filteredData.slice(start, start + state.itemsPerPage);
    };

    // API Pública (lo que usará la Vista)
    return {
        setData,
        setSearch,
        setFilter,
        setPage: (page) => state.currentPage = page,
        setItemsPerPage: (num) => { state.itemsPerPage = num; state.currentPage = 1; },

        // Getters
        get allData() { return state.allData; },
        get paginatedData() { return getPaginatedData(); },
        get totalItems() { return state.filteredData.length; },
        get totalPages() { return Math.ceil(state.filteredData.length / state.itemsPerPage); },
        get currentPage() { return state.currentPage; },
        get itemsPerPage() { return state.itemsPerPage; }
    };
}