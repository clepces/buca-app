// ... (imports si los hubiera) ...

export function Footer(state) {
    const year = new Date().getFullYear();
    
    const appConfig = state.settings.appConfig;
    const storeName = appConfig?.system?.metadata?.appNameSimplify || 
                      state.settings.store.store_name || 
                      'Tu Tienda';

    return `
        <footer class="footer">
            <div class="footer-content">
                <div class="site-footer-row is-start">
                    <a href="" target="_blank">
                        Estado <div class="status-active"></div>
                    </a>
                    <div class="footer-separator"></div>
                    <a href="" rel="noopener" target="_blank">
                        Support
                    </a>
                    <div class="footer-separator"></div>
                    <a href="" rel="noopener" target="_blank">
                        Docs
                    </a>
                </div>

                <div class="footer-copyright">
                    <span>&copy;${year}</span>
                    <a href="#">${storeName}</a>
                    <span>. Todos los derechos reservados.</span>
                </div>
                <div class="site-footer-row is-end">
                    <a href="" rel="noopener" target="_blank">
                        About Clepces
                    </a>
                    <div class="footer-separator"></div>
                    <a href="" rel="noopener" target="_blank">
                        Terms
                    </a>
                    <div class="footer-separator"></div>
                    <a href="" rel="noopener" target="_blank">
                        Privacy
                    </a>
                </div>
            </div>
        </footer>
    `;
}