// src/components/Modal.js

export function Modal({ title, contentElement, id = 'genericModal' }) { // Quitamos footerElement
    const modalElement = document.createElement('div');
    modalElement.className = 'modal';
    modalElement.id = id;
    modalElement.style.display = 'flex'; // Asegura que esté visible al crearlo

    modalElement.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <!-- {/* El botón 'X' se encarga de cerrar */} -->
                <button class="close" data-action="close-modal" aria-label="Cerrar">&times;</button>
            </div>
            <div class="modal-body custom-scrollbar" id="modal-body-container">
                <!-- {/* El contentElement (ej. ProductForm) irá aquí */} -->
            </div>
            <!-- {/* Contenedor vacío para los botones del pie de página */} -->
            <div class="modal-footer" id="modal-footer-container"></div>
        </div>
    `;

    // Insertamos el contenido principal en el body
    modalElement.querySelector('#modal-body-container').appendChild(contentElement);

    // --- Lógica de Cierre ---
    // Cierra el modal si se hace clic fuera del 'modal-content' o en el botón 'X'
    modalElement.addEventListener('click', (e) => {
        if (e.target === modalElement || e.target.closest('[data-action="close-modal"]')) {
            modalElement.remove();
            // Opcional: Podrías emitir un evento 'modal-closed' si necesitas hacer limpieza
            // document.body.dispatchEvent(new CustomEvent('modal-closed', { detail: { id: id } }));
        }
    });

    // Añadimos una clase al body para prevenir scroll de fondo
    document.body.classList.add('modal-open');

    // Sobreescribimos el método remove para limpiar la clase del body
    const originalRemove = modalElement.remove;
    modalElement.remove = function() {
        originalRemove.call(this);
        // Asegurarnos de quitar la clase solo si no hay otros modales abiertos
        if (!document.querySelector('.modal')) {
             document.body.classList.remove('modal-open');
        }
    };


    return modalElement;
}