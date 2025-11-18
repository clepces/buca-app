// ======================================================
// ARCHIVO NUEVO: src/components/Settings/CategoryManager.js
// PROPÓSITO: UI moderna para gestionar categorías como "tags".
// ======================================================

import { sanitizeHTML } from '../../utils/sanitize.js';

export function CategoryManager(initialCategories = []) {
    
    // Estado local del componente
    let categories = [...initialCategories];
    const element = document.createElement('div');
    element.className = 'category-manager';

    // --- Renderiza un solo tag ---
    function renderTag(category) {
        const tag = document.createElement('div');
        tag.className = 'category-tag';
        tag.dataset.value = category;
        
        const text = document.createElement('span');
        text.textContent = category;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-tag';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.dataset.action = 'delete-category';
        
        tag.appendChild(text);
        tag.appendChild(deleteBtn);
        return tag;
    }

    // --- Renderiza el componente completo ---
    function render() {
        const tagsHTML = categories.map(cat => renderTag(cat).outerHTML).join('');
        
        element.innerHTML = `
            <div class="category-tag-list custom-scrollbar">
                ${tagsHTML.length > 0 ? tagsHTML : '<span class="no-tags-placeholder">No hay categorías añadidas.</span>'}
            </div>
            <div class="category-input-group">
                <input type="text" id="new-category-input" class="form-control" placeholder="Escribe un nombre...">
                <button type="button" class="btn-primary" id="btn-add-category">
                    <i class="bi bi-plus-lg"></i> Añadir
                </button>
            </div>
        `;
    }

    // --- Lógica para añadir ---
    function handleAddCategory() {
        const input = element.querySelector('#new-category-input');
        if (!input) return;
        
        const newCategory = sanitizeHTML(input.value.trim());
        
        if (newCategory && !categories.find(c => c.toLowerCase() === newCategory.toLowerCase())) {
            categories.push(newCategory);
            input.value = '';
            render(); // Re-renderizar todo
            bindEvents(); // Re-enlazar eventos
        }
    }

    // --- Lógica para eliminar ---
    function handleDeleteCategory(e) {
        const deleteBtn = e.target.closest('[data-action="delete-category"]');
        if (!deleteBtn) return;
        
        const tag = deleteBtn.closest('.category-tag');
        const categoryValue = tag.dataset.value;
        
        categories = categories.filter(c => c !== categoryValue);
        render(); // Re-renderizar
        bindEvents(); // Re-enlazar
    }

    // --- Enlazar eventos ---
    function bindEvents() {
        const addButton = element.querySelector('#btn-add-category');
        const addInput = element.querySelector('#new-category-input');
        const list = element.querySelector('.category-tag-list');

        if (addButton) {
            addButton.addEventListener('click', handleAddCategory);
        }
        if (addInput) {
            addInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCategory();
                }
            });
        }
        if (list) {
            list.addEventListener('click', handleDeleteCategory);
        }
    }

    // Renderizado inicial
    render();
    bindEvents();

    // API pública del componente
    return {
        element,
        getCategories: () => categories // Devuelve la lista actual de categorías
    };
}