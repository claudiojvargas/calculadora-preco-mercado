import './pwaRegister.js';
import { PWAInstaller } from './pwaInstaller.js';
import { ThemeToggle } from './theme.js';

window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const openButton = document.getElementById('openCalculatorBtn');

  const installer = new PWAInstaller('installBtnLanding', 'inline-flex', (isInstalled) => {
    if (!openButton) return;
    openButton.dataset.installed = String(isInstalled);
  });

  if (openButton) {
    openButton.addEventListener('click', (event) => {
      event.preventDefault();

      const targetUrl = openButton.getAttribute('href') || 'app.html';

      if (installer.isInstalled()) {
        window.location.assign(targetUrl);
        return;
      }

      window.location.href = targetUrl;
    });
  }

  ThemeToggle.init();
});
