import { LoginComponent } from '../components/Login.js';

export function LoginView(element, state) {
    element.innerHTML = '';
    element.appendChild(LoginComponent(state)); 
}