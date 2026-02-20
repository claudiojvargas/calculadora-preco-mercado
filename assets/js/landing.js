import './pwaRegister.js';
import { PWAInstaller } from './pwaInstaller.js';

window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  new PWAInstaller('installBtnLanding', 'inline-flex');
});
