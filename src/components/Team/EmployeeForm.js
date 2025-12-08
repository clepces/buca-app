// ======================================================
// ARCHIVO: src/components/Team/EmployeeForm.js
// PROPÓSITO: Formulario de Empleado con estructura Wizard.
// ======================================================

import { ROLES } from '../../services/roles.config.js';
import { createEmployee, updateEmployee } from '../../services/employee.service.js';
import { showToast } from '../../services/toast.service.js';
import { EmployeeFormWizard } from './EmployeeFormWizard.js'; // Importamos el Wizard que creamos antes
import { diff, fText } from '../../utils/productFormHelpers.js'; // Reutilizamos helpers de formato

export function EmployeeForm(modalElementRef, existingEmployee = null) {
    const element = document.createElement('div');
    element.className = 'product-form-wrapper'; // Reutilizamos clases de ProductForm para estilos consistentes

    const isEditMode = !!existingEmployee;
    let wizardAPI = null;

    // Valores iniciales
    const initialData = {
        name: existingEmployee?.name || '',
        email: existingEmployee?.email || '',
        jobTitle: existingEmployee?.jobTitle || '',
        role: existingEmployee?.role || '',
        isActive: existingEmployee ? existingEmployee.isActive : true
    };

    // --- 1. Estructura HTML del Wizard ---
    element.innerHTML = `
        <div class="wizard-stepper" id="employee-wizard-stepper">
            <div class="step active" data-step="1"><span>Paso 1</span>Identidad</div>
            <div class="step" data-step="2"><span>Paso 2</span>Acceso</div>
            <div class="step" data-step="3"><span>Paso 3</span>Resumen</div>
        </div>

        <div class="wizard-content">
            <form id="employee-form" class="h-100">
                
                <div class="wizard-step" data-step="1" style="display: block;">
                    <div class="summary-card-premium">
                        <div class="card-premium-header">
                            <i class="bi bi-person-vcard"></i> 
                            <span>Información Personal</span>
                        </div>
                        <div class="card-premium-body">
                            <div class="mb-3">
                                <label class="form-label fw-semibold" for="emp-name">Nombre Completo <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white border-end-0"><i class="bi bi-person text-muted"></i></span>
                                    <input type="text" id="emp-name" name="name" class="form-control border-start-0 ps-0" required placeholder="Ej. Juan Pérez" value="${initialData.name}">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-semibold" for="emp-email">Correo Electrónico <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text bg-white border-end-0"><i class="bi bi-envelope text-muted"></i></span>
                                    <input type="email" id="emp-email" name="email" class="form-control border-start-0 ps-0" required placeholder="juan@empresa.com" value="${initialData.email}" ${isEditMode ? 'readonly' : ''}>
                                </div>
                                ${isEditMode ? '<div class="form-text text-muted">El correo no se puede modificar.</div>' : ''}
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-semibold" for="emp-jobtitle">Cargo Público (Job Title)</label>
                                <input type="text" id="emp-jobtitle" name="jobTitle" class="form-control" placeholder="Ej. Cajero Turno Mañana" value="${initialData.jobTitle}">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="wizard-step" data-step="2" style="display: none;">
                    <div class="form-grid-layout" style="grid-template-columns: 1fr;">
                        <div class="summary-card-premium mb-3">
                            <div class="card-premium-header"><i class="bi bi-shield-lock"></i> <span>Seguridad</span></div>
                            <div class="card-premium-body">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold" for="emp-password">${isEditMode ? 'Nueva Contraseña (Opcional)' : 'Contraseña Temporal <span class="text-danger">*</span>'}</label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-white border-end-0"><i class="bi bi-key text-muted"></i></span>
                                        <input type="password" id="emp-password" name="password" class="form-control border-start-0 ps-0" ${isEditMode ? '' : 'required'} minlength="6" placeholder="******">
                                        <button class="btn btn-outline-secondary bg-white border-start-0" type="button" id="toggle-password"><i class="bi bi-eye"></i></button>
                                    </div>
                                    <div class="form-text text-muted small mt-1"><i class="bi bi-info-circle me-1"></i> Mínimo 6 caracteres.</div>
                                </div>
                            </div>
                        </div>

                        <div class="summary-card-premium">
                            <div class="card-premium-header"><i class="bi bi-person-badge-fill"></i> <span>Permisos</span></div>
                            <div class="card-premium-body">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold" for="emp-role">Perfil de Sistema <span class="text-danger">*</span></label>
                                    <select id="emp-role" name="role" class="form-select" required>
                                        <option value="" disabled ${!initialData.role ? 'selected' : ''}>Selecciona un rol...</option>
                                        <option value="${ROLES.CAJERO}" ${initialData.role === ROLES.CAJERO ? 'selected' : ''}>Cajero</option>
                                        <option value="${ROLES.OPERADOR}" ${initialData.role === ROLES.OPERADOR ? 'selected' : ''}>Operador</option>
                                    </select>
                                </div>
                                <div class="form-check form-switch pt-2">
                                    <input class="form-check-input" type="checkbox" id="emp-active" name="isActive" ${initialData.isActive ? 'checked' : ''}>
                                    <label class="form-check-label fw-semibold" for="emp-active">Cuenta Activa</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="wizard-step" data-step="3" style="display: none;">
                    <div id="summary-view"></div>
                </div>

            </form>
        </div>
    `;

    // --- 2. Selectores ---
    const form = element.querySelector('#employee-form');
    const nameInput = element.querySelector('#emp-name');
    const emailInput = element.querySelector('#emp-email');
    const jobTitleInput = element.querySelector('#emp-jobtitle');
    const passInput = element.querySelector('#emp-password');
    const roleSelect = element.querySelector('#emp-role');
    const activeCheck = element.querySelector('#emp-active');
    const togglePassBtn = element.querySelector('#toggle-password');

    // --- 3. Lógica de UI ---

    // Toggle Password
    if (togglePassBtn) {
        togglePassBtn.addEventListener('click', () => {
            const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passInput.setAttribute('type', type);
            togglePassBtn.querySelector('i').className = type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
        });
    }

    // Auto-fill Job Title
    roleSelect.addEventListener('change', (e) => {
        if (!jobTitleInput.value) {
            const selectedOption = e.target.options[e.target.selectedIndex];
            jobTitleInput.value = selectedOption.text;
        }
    });

    // Validaciones
    const validateStep1 = () => {
        if (!nameInput.value.trim() || !emailInput.value.trim()) {
            showToast('Nombre y Correo son obligatorios.', 'warning');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!isEditMode && passInput.value.length < 6) {
            showToast('La contraseña es obligatoria (mín 6 caracteres).', 'warning');
            return false;
        }
        if (!roleSelect.value) {
            showToast('Debes seleccionar un rol.', 'warning');
            return false;
        }
        return true;
    };

    // Renderizar Resumen
    const showSummary = () => {
        const summaryContainer = element.querySelector('#summary-view');

        // Si estamos editando, usamos la lógica 'diff' (como en productos)
        // Si estamos creando, mostramos resumen simple

        let contentHTML = '';

        if (isEditMode) {
            // Comparar datos
            contentHTML = `
                <div class="summary-alert-premium info">
                    <div class="alert-icon"><i class="bi bi-info-circle-fill"></i></div>
                    <div class="alert-content">
                        <div class="alert-title">Revisión de Cambios</div>
                        <div class="alert-subtitle">Confirma los datos antes de actualizar.</div>
                    </div>
                </div>
                <div class="summary-grid-premium">
                    <div class="summary-card-premium">
                        <div class="card-premium-header"><i class="bi bi-person-vcard"></i><span>Datos</span></div>
                        <div class="card-premium-body">
                            ${diff('Nombre', nameInput.value, initialData.name, fText)}
                            ${diff('Email', emailInput.value, initialData.email, fText)}
                            ${diff('Cargo', jobTitleInput.value, initialData.jobTitle, fText)}
                        </div>
                    </div>
                    <div class="summary-card-premium">
                        <div class="card-premium-header"><i class="bi bi-shield-lock"></i><span>Acceso</span></div>
                        <div class="card-premium-body">
                            ${diff('Rol', roleSelect.value, initialData.role, fText)}
                            ${diff('Estado', activeCheck.checked ? 'Activo' : 'Inactivo', initialData.isActive ? 'Activo' : 'Inactivo', fText)}
                            ${passInput.value ? diff('Contraseña', '********', '********', fText) : ''}
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Modo Creación
            contentHTML = `
                <div class="summary-card-premium">
                    <div class="card-premium-header"><i class="bi bi-person-check-fill"></i><span>Confirmar Nuevo Empleado</span></div>
                    <div class="card-premium-body">
                        <div class="d-flex justify-content-between border-bottom py-2"><span>Nombre:</span> <strong>${nameInput.value}</strong></div>
                        <div class="d-flex justify-content-between border-bottom py-2"><span>Email:</span> <strong>${emailInput.value}</strong></div>
                        <div class="d-flex justify-content-between border-bottom py-2"><span>Rol:</span> <strong>${roleSelect.options[roleSelect.selectedIndex].text}</strong></div>
                        <div class="d-flex justify-content-between py-2"><span>Contraseña:</span> <strong>${passInput.value}</strong></div>
                    </div>
                </div>
            `;
        }

        summaryContainer.innerHTML = contentHTML;
        wizardAPI.showStep(3);
    };

    // --- 4. Guardar ---
    const handleSave = async () => {
        if (!validateStep1()) { wizardAPI.showStep(1); return; }
        if (!validateStep2()) { wizardAPI.showStep(2); return; }

        wizardAPI.setSaveButtonBusy(true);

        const employeeData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            role: roleSelect.value,
            jobTitle: jobTitleInput.value.trim() || roleSelect.value,
            isActive: activeCheck.checked
        };

        if (passInput.value) {
            employeeData.password = passInput.value;
        }

        try {
            // Obtener Business ID del estado global
            const { state } = await import('../../store/state.js');
            const businessId = state?.session?.business?.id;

            if (!businessId) throw new Error('No se pudo identificar el negocio.');

            if (isEditMode) {
                // Actualizar
                await updateEmployee(existingEmployee.id, employeeData, businessId);
                showToast(`Datos de ${employeeData.name} actualizados.`, 'success');
            } else {
                // Crear
                await createEmployee(employeeData, businessId);
                showToast(`Empleado ${employeeData.name} creado exitosamente.`, 'success');
            }

            modalElementRef.remove();

        } catch (error) {
            console.error(error);
            showToast(error.message || 'Error al guardar empleado', 'error');
        } finally {
            wizardAPI.setSaveButtonBusy(false);
        }
    };

    // --- 5. Inicializar Wizard ---
    setTimeout(() => {
        const wizardCallbacks = {
            onStepNext: () => {
                const current = wizardAPI.getStep();
                if (current === 1 && validateStep1()) wizardAPI.showStep(2);
                else if (current === 2 && validateStep2()) showSummary();
            },
            onStepPrev: () => {
                const current = wizardAPI.getStep();
                if (current > 1) wizardAPI.showStep(current - 1);
            },
            onCalculate: () => { // "Revisar Datos"
                if (validateStep1() && validateStep2()) showSummary();
            },
            onSubmit: handleSave
        };

        wizardAPI = EmployeeFormWizard({
            modalElementRef,
            wizardStepperEl: element.querySelector('#employee-wizard-stepper'),
            wizardStepsEls: element.querySelectorAll('.wizard-step'),
            isEditMode,
            callbacks: wizardCallbacks,
            texts: { save: 'Crear Usuario', update: 'Actualizar Usuario' }
        });

    }, 50);

    return element;
}