/**
 * Reusable Button Component
 * @param {object} props
 * @param {string} props.text - Button label
 * @param {string} [props.variant='primary'] - Bootstrap variant (primary, secondary, outline-danger, etc.)
 * @param {string} [props.size=''] - Bootstrap size (sm, lg) or empty
 * @param {string} [props.icon=''] - Bootstrap icon class (e.g., 'bi-save')
 * @param {string} [props.iconPosition='start'] - 'start' or 'end'
 * @param {function} [props.onClick] - Click handler
 * @param {string} [props.type='button'] - Button type (button, submit, reset)
 * @param {string} [props.classes=''] - Extra classes
 * @param {boolean} [props.loading=false] - Initial loading state
 * @param {boolean} [props.disabled=false] - Initial disabled state
 * @param {string} [props.id=''] - ID attribute
 * @returns {HTMLButtonElement}
 */
export function Button({
    text,
    variant = 'primary',
    size = '',
    icon = '',
    iconPosition = 'start',
    onClick,
    type = 'button',
    classes = '',
    loading = false,
    disabled = false,
    id = ''
} = {}) {
    const btn = document.createElement('button');
    btn.type = type;
    if (id) btn.id = id;

    // Base classes
    const sizeClass = size ? `btn-${size}` : '';
    btn.className = `btn btn-${variant} ${sizeClass} ${classes}`.trim();

    if (disabled || loading) {
        btn.disabled = true;
    }

    // Helper to render content
    const renderContent = (isLoading) => {
        if (isLoading) {
            btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>${text}`;
            return;
        }

        const iconHtml = icon ? `<i class="bi ${icon} ${iconPosition === 'start' ? 'me-2' : 'ms-2'}"></i>` : '';

        if (iconPosition === 'start') {
            btn.innerHTML = `${iconHtml}${text}`;
        } else {
            btn.innerHTML = `${text}${iconHtml}`;
        }
    };

    renderContent(loading);

    // Event Listeners
    if (onClick) {
        btn.addEventListener('click', onClick);
    }

    // Public method to toggle loading state
    btn.setLoading = (isLoading) => {
        btn.disabled = isLoading;
        renderContent(isLoading);
    };

    return btn;
}
