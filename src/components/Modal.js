// ======================================================
// ARCHIVO: src/components/Modal.js
// MEJORA: Añadido soporte para size: 'fullscreen'
// ======================================================

export function Modal({ title, contentElement, id = 'genericModal', size = 'large' }) {
    const modalElement = document.createElement('div');
    modalElement.className = 'modal';
    modalElement.id = id;
    modalElement.style.display = 'flex';

    // --- ¡INICIO DE CORRECCIÓN! ---
    let sizeClass = 'modal-lg'; // Default
    if (size === 'small') {
        sizeClass = 'modal-sm';
    } else if (size === 'fullscreen') {
        sizeClass = 'modal-fullscreen';
    }
    // --- FIN DE CORRECCIÓN ---

    modalElement.innerHTML = `
        <div class="modal-content ${sizeClass}">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="close" data-action="close-modal" aria-label="Cerrar">&times;</button>
            </div>
            <div class="modal-body custom-scrollbar" id="modal-body-container">
            </div>
            <div class="modal-footer" id="modal-footer-container">
            </div>
        </div>
    `;

    modalElement.querySelector('#modal-body-container').appendChild(contentElement);

    // Evento para cerrar al hacer clic fuera o en la X
    modalElement.addEventListener('click', (e) => {
        if (e.target === modalElement || e.target.closest('[data-action="close-modal"]')) {
            modalElement.remove();
            if (!document.querySelector('.modal')) {
                 document.body.classList.remove('modal-open');
            }
        }
    });

    document.body.classList.add('modal-open');

    const originalRemove = modalElement.remove;
    modalElement.remove = function() {
        originalRemove.call(this);
        if (!document.querySelector('.modal')) {
             document.body.classList.remove('modal-open');
        }
    };

    return modalElement;
}