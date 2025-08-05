export class Sugestoes {
  constructor(listaProdutosPrincipais) {
    this.lista = listaProdutosPrincipais;
    this.input = document.getElementById('nome-produto');
    this.listaSugestoes = document.getElementById('sugestoes');

    this.input.addEventListener('input', () => this.filtrar());
  }

  filtrar() {
    const termo = this.input.value.toLowerCase();
    this.listaSugestoes.innerHTML = '';

    const filtrados = this.lista.filter(p => p.toLowerCase().startsWith(termo));

    if (termo && filtrados.length > 0) {
      this.listaSugestoes.classList.remove('hidden');
      filtrados.forEach(prod => {
        const li = document.createElement('li');
        li.textContent = prod;
        li.className = 'p-2 cursor-pointer hover:bg-gray-100';
        li.addEventListener('click', () => {
          this.input.value = prod;
          this.listaSugestoes.classList.add('hidden');
        });
        this.listaSugestoes.appendChild(li);
      });
    } else {
      this.listaSugestoes.classList.add('hidden');
    }
  }
}
