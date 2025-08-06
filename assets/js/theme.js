// theme.js
export class ThemeToggle {
  static init() {
    const btn = document.getElementById('btn-tema');
    const html = document.documentElement;

    if (!btn) {
      console.warn('Botão de tema não encontrado!');
      return;
    }

    // Adiciona classes para transição suave (opcional)
    html.classList.add('transition-colors', 'duration-300');

    // Aplica o tema salvo anteriormente
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    if (temaSalvo === 'escuro') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    ThemeToggle.atualizarIcone(temaSalvo);

    // Evento de clique para alternar tema
    btn.addEventListener('click', () => {
      const temaAtual = html.classList.contains('dark') ? 'escuro' : 'claro';
      const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';

      if (novoTema === 'escuro') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }

      localStorage.setItem('tema', novoTema);
      ThemeToggle.atualizarIcone(novoTema);
    });
  }

  static atualizarIcone(tema) {
    const btn = document.getElementById('btn-tema');
    if (!btn) return;
    btn.innerHTML = tema === 'escuro'
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';
    lucide.createIcons();
  }
}
