// @ts-nocheck
// assets/js/pwaInstaller.js
export class PWAInstaller {
  static STORAGE_KEY = 'pwa-installed';

  constructor(buttonId, displayMode = 'block', onInstallStateChange = null) {
    this.button = document.getElementById(buttonId);
    this.deferredPrompt = null;
    this.displayMode = displayMode;
    this.onInstallStateChange = onInstallStateChange;
    this.installed = this.isStandaloneMode() || localStorage.getItem(PWAInstaller.STORAGE_KEY) === 'true';

    if (!this.button) return;

    this.button.style.display = 'none';
    this.notifyInstallStateChange();

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();

      if (this.installed) {
        // Se o evento apareceu, o app está instalável novamente (evita estado antigo no localStorage).
        this.setInstalledState(false);
      }

      this.deferredPrompt = e;
      this.button.style.display = this.displayMode;
      this.button.addEventListener('click', () => this.instalar(), { once: true });
    });

    window.addEventListener('appinstalled', () => {
      console.log('📲 PWA instalada com sucesso!');
      this.setInstalledState(true);
      this.button.style.display = 'none';
      this.deferredPrompt = null;
    });
  }

  isStandaloneMode() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }

  isInstalled() {
    return this.installed;
  }

  notifyInstallStateChange() {
    if (typeof this.onInstallStateChange === 'function') {
      this.onInstallStateChange(this.installed);
    }
  }

  setInstalledState(value) {
    this.installed = value;
    localStorage.setItem(PWAInstaller.STORAGE_KEY, String(value));
    this.notifyInstallStateChange();
  }

  async instalar() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const escolha = await this.deferredPrompt.userChoice;
    if (escolha.outcome !== 'dismissed') {
      this.setInstalledState(true);
      this.button.style.display = 'none';
      this.deferredPrompt = null;
    }
  }
}
