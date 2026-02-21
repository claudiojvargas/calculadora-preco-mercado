import './pwaRegister.js';
import { PWAInstaller } from './pwaInstaller.js';
import { ThemeToggle } from './theme.js';

window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const openButton = document.getElementById('openCalculatorBtn');
  const installer = new PWAInstaller('installBtnLanding', 'inline-flex');

  if (openButton) {
    openButton.addEventListener('click', () => {
      if (installer.isInstalled()) {
        // Quando instalado, tenta seguir o fluxo de abertura do app instalado.
        const popup = window.open(window.location.origin, '_blank', 'noopener');
        if (!popup) {
          window.location.href = window.location.origin;
        }
        return;
      }

      // Sem instalação, abre diretamente a calculadora web.
      window.location.href = 'app.html';
    });
  }

  ThemeToggle.init();
});
