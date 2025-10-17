import { rolesConfig, PERMISSIONS } from './roles.config.js';

let currentUserPermissions = new Set();

export function loadUserPermissions(userRoles = []) {
    currentUserPermissions.clear();
    userRoles.forEach(roleName => {
        const role = rolesConfig[roleName];
        if (role) {
            role.permissions.forEach(permission => currentUserPermissions.add(permission));
        } else {
            console.warn(`⚠️ Rol ${roleName} no encontrado en la configuración`);
        }
    });
}

export function can(permissionToCheck) {
    return currentUserPermissions.has(permissionToCheck);
}