export function showToast(message, type = 'info', duration = 3000) {
    const toastElement = document.createElement('div');
    toastElement.className = `toast toast-${type} show`;
    toastElement.textContent = message;
    document.body.appendChild(toastElement);
    setTimeout(() => {
        toastElement.classList.remove('show');
        toastElement.addEventListener('transitionend', () => {
            toastElement.remove();
        });
    }, duration);
}