import './pwaRegister.js';
import { PWAInstaller } from './pwaInstaller.js';
import { ThemeToggle } from './theme.js';

window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const openButton = document.getElementById('openCalculatorBtn');
  const installer = new PWAInstaller('installBtnLanding', 'inline-flex');

  if (openButton) {
    openButton.addEventListener('click', (event) => {
      event.preventDefault();

      const targetUrl = openButton.getAttribute('href') || 'app.html';

      if (installer.isInstalled()) {
        // Tenta disparar captura de link do PWA instalado (quando suportado pelo navegador).
        const popup = window.open(targetUrl, '_blank', 'noopener');
        if (!popup) {
          window.location.href = targetUrl;
        }
        return;
      }

      window.location.href = targetUrl;
    });
  }

  ThemeToggle.init();
});
