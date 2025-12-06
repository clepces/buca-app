// ======================================================
// ARCHIVO: src/views/Tea,/TeamView.js
// REGISTRO: Nueva Gestion de empleado
// ======================================================
import { EmptyState } from '../../components/Common/EmptyState.js';
import { Logger } from '../../services/logger.service.js';
import { createEmployee } from '../../services/employee.service.js';
import { ROLES } from '../../services/roles.config.js';
import { Toast } from '../../services/toast.service.js';

export function TeamView(element, state) {
    try {
        // Lógica de renderizado normal
        element.innerHTML = `
        <div class="view-panel-content">

            <div class="view-header align-items-start mb-4">
                <div>
                    <h2 class="view-title">
                        <i class="bi bi-people-fill"></i> Mi Equipo
                    </h2>
                    <p class="text-muted">Gestiona el acceso de tus empleados</p>
                </div>
                <div class="ms-auto text-end">
                    <button class="btn-primary"><i class="bi bi-plus-lg"></i> Nuevo Empleado</button>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6">
                    <div class="card shadow-sm">
                        <div class="card-header bg-white">
                            <h5 class="mb-0">+-</h5>
                        </div>
                        <div class="card-body">
                            <form id="create-employee-form">
                                <div class="form-group mb-3">
                                    <label class="form-label">Nombre Completo</label>
                                    <input type="text" name="name" class="form-control" required placeholder="Ej. Juan Pérez">
                                </div>

                                <div class="form-group mb-3">
                                    <label class="form-label">Correo Electrónico</label>
                                    <input type="email" name="email" class="form-control" required placeholder="juan@empresa.com">
                                </div>

                                <div class="form-group mb-3">
                                    <label class="form-label">Contraseña Temporal</label>
                                    <input type="password" name="password" class="form-control" required minlength="6" placeholder="******">
                                    <small class="text-muted">Mínimo 6 caracteres</small>
                                </div>

                                <div class="form-group mb-4">
                                    <label class="form-label">Cargo / Rol</label>
                                    <select name="role" class="form-select" required>
                                        <option value="" disabled selected>Selecciona un rol...</option>
                                        <option value="${ROLES.CAJERO}">Cajero (Ventas y Clientes)</option>
                                        <option value="${ROLES.OPERADOR}">Operador (Inventario)</option>
                                    </select>
                                </div>

                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary" id="btn-save-employee">
                                        <i class="bi bi-person-plus-fill"></i> Crear Empleado
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            ${EmptyState({
            icon: 'bi-cart', // Usando icono Bootstrap
            message: 'La interfaz de caja se construirá aquí.'
        })}
        </div>
        `;

        // Lógica del componente (Mount)
        setTimeout(() => {
            const form = document.getElementById('create-employee-form');
            const btnSave = document.getElementById('btn-save-employee');

            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    // 1. Recoger datos
                    const formData = new FormData(form);
                    const employeeData = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        password: formData.get('password'),
                        role: formData.get('role')
                    };

                    // 2. Estado de carga
                    const originalText = btnSave.innerHTML;
                    btnSave.disabled = true;
                    btnSave.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Creando...`;

                    try {
                        // 3. Llamar al servicio
                        await createEmployee(employeeData);

                        Toast.success(`¡${employeeData.name} ha sido registrado exitosamente!`);
                        form.reset(); // Limpiar formulario

                    } catch (error) {
                        console.error(error);
                        Toast.error(error.message || 'No se pudo crear el empleado');
                    } finally {
                        // 4. Restaurar botón
                        btnSave.disabled = false;
                        btnSave.innerHTML = originalText;
                    }
                });
            }
        }, 0);


        // Retornar limpieza
        return () => {
            Logger.info('Limpiando Team...');
        };

    } catch (error) {
        Logger.error('[Team] Error de renderizado:', error);
        element.innerHTML = `
            <div class="alert alert-danger m-4">
                Error al cargar el Gestion de empleado: ${error.message}
            </div>
        `;
        return () => { };
    }
}