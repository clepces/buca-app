// ARCHIVO CORREGIDO Y FINAL: src/components/Modal.js

export function Modal({ title, contentElement, footerElement = null, id = 'genericModal' }) {
    const modalElement = document.createElement('div');
    modalElement.className = 'modal';
    modalElement.id = id;
    modalElement.style.display = 'flex';

    modalElement.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="close" data-action="close-modal">&times;</button>
            </div>
            <div class="modal-body" id="modal-body-container">
            </div>
        </div>
    `;

    modalElement.querySelector('#modal-body-container').appendChild(contentElement);

    if (footerElement) {
        modalElement.querySelector('.modal-content').appendChild(footerElement);
    }

    modalElement.addEventListener('click', (e) => {
        if (e.target === modalElement || e.target.closest('[data-action="close-modal"]')) {
            modalElement.remove();
        }
    });

    return modalElement;
}