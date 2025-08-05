if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(() => console.log('✅ Service Worker registrado com sucesso!'))
      .catch(err => console.error('❌ Erro ao registrar o Service Worker:', err));
  });
}