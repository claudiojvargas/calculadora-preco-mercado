// @ts-nocheck
import './pwaRegister.js';
import { PWAInstaller } from './pwaInstaller.js';
import { ThemeToggle } from './theme.js';
import { Toast } from './toast.js';

window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const openButton = document.getElementById('openCalculatorBtn');
  const installer = new PWAInstaller('installBtnLanding', 'inline-flex');

  if (openButton) {
    openButton.addEventListener('click', () => {
      if (installer.isInstalled()) {
        const path = window.location.pathname;
        const newPath = path.substring(0, path.lastIndexOf("/"));
        const appUrl = window.location.origin + newPath;
        // Quando instalado, tenta seguir o fluxo de abertura do app instalado.
        const popup = window.open(appUrl + '/app.html', '_blank', 'noopener');
        if (!popup) {
          Toast.mostrar('A calculadora foi aberta!', 'sucesso');
        }
        return;
      }

      // Sem instalação, abre diretamente a calculadora web.
      window.location.href = 'app.html';
    });
  }

  ThemeToggle.init();
});
