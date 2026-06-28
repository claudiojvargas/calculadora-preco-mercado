import { Produto } from './produto.js';

type ProdutoPersistido = Pick<Produto, 'nome' | 'valor' | 'quantidade'>;

export class ListaDeProdutos {
  storageKey: string;
  produtos: Produto[];

  constructor(storageKey = 'listaMercado') {
    this.storageKey = storageKey;
    this.produtos = this.carregar();
  }

  adicionar(produto: Produto): void {
    this.produtos.push(produto);
    this.salvar();
  }

  remover(index: number): void {
    this.produtos.splice(index, 1);
    this.salvar();
  }

  atualizarQuantidade(index: number, novaQtd: number): void {
    if (novaQtd > 0 && this.produtos[index]) {
      this.produtos[index].quantidade = novaQtd;
      this.salvar();
    }
  }

  salvar(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.produtos));
  }

  carregar(): Produto[] {
    const dados = localStorage.getItem(this.storageKey);
    if (dados) {
      return (JSON.parse(dados) as ProdutoPersistido[]).map(
        (p) => new Produto(p.nome, p.valor, p.quantidade)
      );
    }
    return [];
  }

  total(): string {
    const centavos = this.produtos.reduce((acc, p) => acc + Math.round(p.subtotal() * 100), 0);
    return (centavos / 100).toFixed(2);
  }

  totalItens(): number {
    return this.produtos.reduce((acc, p) => acc + p.quantidade, 0);
  }
}
