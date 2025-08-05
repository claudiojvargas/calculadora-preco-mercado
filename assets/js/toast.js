export class Toast {
  static mostrar(mensagem, tipo = 'info') {
    const container = document.getElementById('toast-container');

    const config = {
      info: {
        cor: 'border-yellow-500',
        texto: 'Informação',
        icone: 'info',
      },
      sucesso: {
        cor: 'border-green-500',
        texto: 'Sucesso',
        icone: 'check-circle',
      },
      erro: {
        cor: 'border-red-500',
        texto: 'Erro',
        icone: 'x-circle',
      },
    };

    const { cor, texto, icone } = config[tipo] || {
      cor: 'border-gray-400',
      texto: 'Aviso',
      icone: 'alert-circle',
    };

    const toast = document.createElement('div');
    toast.className = `toast bg-white border-l-4 ${cor} shadow-lg rounded-xl p-4 flex items-start gap-3 w-80 animate-slide-in transition-opacity duration-500`;

    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', icone);
    icon.className = `w-5 h-5 mt-1 ${cor.replace('border-', 'text-')}`;

    const content = document.createElement('div');
    content.className = 'flex-1';
    content.innerHTML = `<p class="font-semibold text-gray-800">${texto}</p><p class="text-sm text-gray-600">${mensagem}</p>`;

    const btn = document.createElement('button');
    btn.className = 'text-gray-400 hover:text-gray-700 transition';
    btn.innerHTML = `<i data-lucide="x" class="w-4 h-4"></i>`;
    btn.onclick = () => toast.remove();

    toast.append(icon, content, btn);
    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
}
