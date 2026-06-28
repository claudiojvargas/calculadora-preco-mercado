export class Produto {
  nome: string;
  valor: number;
  quantidade: number;

  constructor(nome: string, valor: number, quantidade = 1) {
    this.nome = nome;
    this.valor = valor;
    this.quantidade = quantidade;
  }

  subtotal(): number {
    return this.valor * this.quantidade;
  }
}
