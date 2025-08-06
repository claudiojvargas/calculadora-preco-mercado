if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(reg => {
        console.log('Service Worker registrado com sucesso!');

        // Checa se já há uma versão esperando para ser ativada
        if (reg.waiting) {
          notifyUserOfUpdate(reg);
        }

        // Verifica se uma nova versão foi encontrada
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker?.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              notifyUserOfUpdate(reg);
            }
          });
        });
      })
      .catch(err =>
        console.error('Erro ao registrar o Service Worker:', err)
      );
  });
}

function notifyUserOfUpdate(reg) {
  const toast = document.createElement('div');
  toast.innerHTML = `
  <div class="fixed bottom-2 left-4 right-4 mx-auto max-w-md  bg-green-600 text-white p-2 rounded-lg shadow-lg flex justify-between items-center z-50">
    <span>Nova versão disponível!</span>
    <button class="ml-4 bg-white text-green-600 px-3 py-1 rounded" id="btn-reload" >Atualizar</button>
  </div>
`;
  document.body.appendChild(toast);

  lucide.createIcons();

  document.getElementById('btn-reload').onclick = () => {
    reg.waiting?.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  };
}
