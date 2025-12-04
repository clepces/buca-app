import { LoginComponent } from '../../components/Auth/Login3.js';

export function LoginView(element, state) {
    element.innerHTML = '';
    element.appendChild(LoginComponent(state));
}