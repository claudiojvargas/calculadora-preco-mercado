// assets/js/pwaInstaller.js
export class PWAInstaller {
  constructor(buttonId) {
    this.button = document.getElementById(buttonId);
    this.deferredPrompt = null;

    if (!this.button) return;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.button.style.display = 'block';
      this.button.addEventListener('click', () => this.instalar(), { once: true });
    });

    window.addEventListener('appinstalled', () => {
      console.log('📲 PWA instalada com sucesso!');
      this.button.style.display = 'none';
      this.deferredPrompt = null;
    });
  }

  async instalar() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const escolha = await this.deferredPrompt.userChoice;
    if (escolha.outcome !== 'dismissed') {
      this.button.style.display = 'none';
      this.deferredPrompt = null;
    }
  }
}
