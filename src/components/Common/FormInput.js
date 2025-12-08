/**
 * Reusable FormInput Component
 * Validates and encapsulates the standard "Label + InputGroup + Helper" pattern.
 * @param {object} props
 * @param {string} props.label - Label text
 * @param {string} props.name - Input name attribute
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.id] - Input ID (defaults to props.name if not set)
 * @param {string} [props.value=''] - Initial value
 * @param {string} [props.placeholder=''] - Placeholder text
 * @param {string} [props.icon=''] - Icon class for input group addon (e.g. 'bi-person')
 * @param {boolean} [props.required=false] - Is required
 * @param {boolean} [props.readonly=false] - Is readonly
 * @param {string} [props.helperText=''] - Helper text below input
 * @param {function} [props.onChange] - Change event handler
 * @param {object} [props.options] - For 'select' type: array of {value, label, selected}
 * @returns {HTMLDivElement} - The wrapper div containing the form group
 */
export function FormInput({
    label,
    name,
    type = 'text',
    id,
    value = '',
    placeholder = '',
    icon = '',
    required = false,
    readonly = false,
    helperText = '',
    onChange,
    options = []
} = {}) {
    const wrapper = document.createElement('div');
    wrapper.className = 'mb-3'; // Standard spacing

    const inputId = id || `input-${name}-${Math.random().toString(36).substr(2, 9)}`;
    const requiredStar = required ? '<span class="text-danger">*</span>' : '';

    // Label
    const labelEl = document.createElement('label');
    labelEl.className = 'form-label fw-semibold';
    labelEl.htmlFor = inputId;
    labelEl.innerHTML = `${label} ${requiredStar}`;
    wrapper.appendChild(labelEl);

    // Input Group
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    // Icon Addon
    if (icon) {
        const span = document.createElement('span');
        span.className = 'input-group-text bg-white border-end-0';
        span.innerHTML = `<i class="bi ${icon} text-muted"></i>`;
        inputGroup.appendChild(span);
    }

    // Input Element
    let inputEl;
    if (type === 'select') {
        inputEl = document.createElement('select');
        inputEl.className = 'form-select';

        // Add placeholder option if placeholder is set
        if (placeholder) {
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.disabled = true;
            defaultOpt.selected = !value;
            defaultOpt.textContent = placeholder;
            inputEl.appendChild(defaultOpt);
        }

        options.forEach(opt => {
            const optionEl = document.createElement('option');
            optionEl.value = opt.value;
            optionEl.textContent = opt.label;
            if (opt.selected || opt.value === value) {
                optionEl.selected = true;
            }
            inputEl.appendChild(optionEl);
        });

    } else {
        inputEl = document.createElement('input');
        inputEl.type = type;
        inputEl.className = `form-control ${icon ? 'border-start-0 ps-0' : ''}`;
        inputEl.placeholder = placeholder;
        if (value !== undefined && value !== null) inputEl.value = value;
    }

    // Common attributes
    inputEl.id = inputId;
    inputEl.name = name;
    if (required) inputEl.required = true;
    if (readonly) inputEl.readOnly = true;

    // Password Toggle special case
    if (type === 'password') {
        inputEl.className += ' border-end-0'; // Make room for toggle button
    }

    inputGroup.appendChild(inputEl);

    // Password Toggle Button
    if (type === 'password') {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn btn-outline-secondary bg-white border-start-0';
        toggleBtn.type = 'button';
        toggleBtn.innerHTML = '<i class="bi bi-eye"></i>';
        toggleBtn.addEventListener('click', () => {
            const isPassword = inputEl.type === 'password';
            inputEl.type = isPassword ? 'text' : 'password';
            toggleBtn.querySelector('i').classList.toggle('bi-eye');
            toggleBtn.querySelector('i').classList.toggle('bi-eye-slash');
        });
        inputGroup.appendChild(toggleBtn);
    }

    wrapper.appendChild(inputGroup);

    // Helper Text
    if (helperText) {
        const helper = document.createElement('div');
        helper.className = 'form-text text-muted small mt-1';
        helper.textContent = helperText;
        wrapper.appendChild(helper);
    }

    // Listeners
    if (onChange) {
        inputEl.addEventListener('change', onChange);
        inputEl.addEventListener('input', onChange);
    }

    return wrapper;
}
