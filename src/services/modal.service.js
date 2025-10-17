import { Modal } from '../components/Modal.js';

export function showConfirmationModal(title, message, onConfirm) {
    const content = document.createElement('div');
    content.innerHTML = `<p>${message}</p>`;

    const confirmButton = document.createElement('button');
    confirmButton.className = 'btn-danger';
    confirmButton.innerHTML = '<i class="fas fa-check"></i> Sí, continuar';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn-secondary';
    cancelButton.innerHTML = '<i class="fas fa-times"></i> Cancelar';

    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    footer.append(cancelButton, confirmButton);

    const modal = Modal({
        title: `<i class="fas fa-exclamation-triangle"></i> ${title}`,
        contentElement: content,
        footerElement: footer,
        id: 'confirmation-modal'
    });

    const closeModal = () => modal.remove();

    cancelButton.addEventListener('click', closeModal);
    confirmButton.addEventListener('click', () => {
        onConfirm();
        closeModal();
    });

    document.body.appendChild(modal);
}