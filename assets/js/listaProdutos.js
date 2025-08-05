import { Produto } from './produto.js';

export class ListaDeProdutos {
  constructor(storageKey = 'listaMercado') {
    this.storageKey = storageKey;
    this.produtos = this.carregar() || [];
  }

  adicionar(produto) {
    this.produtos.push(produto);
    this.salvar();
  }

  remover(index) {
    this.produtos.splice(index, 1);
    this.salvar();
  }

  atualizarQuantidade(index, novaQtd) {
    if (novaQtd > 0) {
      this.produtos[index].quantidade = novaQtd;
      this.salvar();
    }
  }

  salvar() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.produtos));
  }

  carregar() {
    const dados = localStorage.getItem(this.storageKey);
    if (dados) {
      return JSON.parse(dados).map(p => new Produto(p.nome, p.valor, p.quantidade));
    }
    return [];
  }

  total() {
    const centavos = this.produtos.reduce((acc, p) => acc + Math.round(p.subtotal() * 100), 0);
    return (centavos / 100).toFixed(2);
  }

  totalItens() {
    return this.produtos.reduce((acc, p) => acc + p.quantidade, 0);
  }
}
