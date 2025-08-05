import { Produto } from './produto.js';
import { Toast } from './toast.js';

export class UI {
  constructor(lista) {
    this.lista = lista;
    this.nomeInput = document.getElementById('nome-produto');
    this.valorInput = document.getElementById('valor-produto');
    this.produtosList = document.getElementById('produtos-list');
    this.totalDisplay = document.getElementById('total');
    this.contagemItensDisplay = document.getElementById('contagem-itens');

    this.renderizar();
  }

  formatarValor(valor) {
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  renderizar() {
    this.produtosList.innerHTML = '';
    this.lista.produtos.forEach((produto, index) => {
      const li = this.criarElementoProduto(produto, index);
      this.produtosList.appendChild(li);
    });
    this.atualizarResumo();
  }

  atualizarResumo() {
    this.totalDisplay.textContent = this.formatarValor(this.lista.total());
    this.contagemItensDisplay.textContent = `${this.lista.totalItens()} item(s)`;
  }

  criarElementoProduto(produto, index) {
    const li = document.createElement('li');
    li.className = 'flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl shadow-md gap-4';

    const nome = document.createElement('div');
    nome.textContent = produto.nome;
    nome.className = 'font-medium text-gray-800';

    const valor = document.createElement('span');
    valor.textContent = this.formatarValor(produto.valor);
    valor.className = 'text-sm text-gray-600 font-semibold';

    const inputQtd = document.createElement('input');
    inputQtd.type = 'number';
    inputQtd.value = produto.quantidade;
    inputQtd.className = 'w-16 px-2 py-1 border border-gray-300 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-green-500';
    inputQtd.addEventListener('change', (e) => {
      const novaQtd = parseInt(e.target.value);
      this.lista.atualizarQuantidade(index, novaQtd);
      this.renderizar();
    });

    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerHTML = '<i data-lucide="trash-2"></i>';
    botaoExcluir.className = 'p-2 rounded-md hover:bg-red-100 text-red-500 transition';
    botaoExcluir.addEventListener('click', () => {
      this.lista.remover(index);
      this.renderizar();
      Toast.mostrar('Produto removido', 'info');
    });

    const acoes = document.createElement('div');
    acoes.className = 'flex items-center gap-3';
    acoes.append(valor, inputQtd, botaoExcluir);

    li.append(nome, acoes);
    lucide.createIcons();
    return li;
  }

  adicionarProduto() {
    const nome = this.nomeInput.value.trim();
    const valor = parseFloat(this.valorInput.value.replace(',', '.'));

    if (!nome || isNaN(valor) || valor <= 0) {
      Toast.mostrar('Informe um produto válido', 'erro');
      return;
    }

    const produto = new Produto(nome, valor);
    this.lista.adicionar(produto);
    this.nomeInput.value = '';
    this.valorInput.value = '';
    this.renderizar();
    Toast.mostrar('Produto adicionado!', 'sucesso');
  }
}
