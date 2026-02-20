import './pwaRegister.js';
import { PWAInstaller } from './pwaInstaller.js';
import { ThemeToggle } from './theme.js';

window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  new PWAInstaller('installBtnLanding', 'inline-flex');
  ThemeToggle.init();
});
