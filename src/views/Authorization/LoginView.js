import { LoginComponent } from '../../components/Auth/Login.js';

export function LoginView(element, state) {
    element.innerHTML = '';
    element.appendChild(LoginComponent(state)); 
}