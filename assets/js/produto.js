export class Produto {
    nome;
    valor;
    quantidade;
    constructor(nome, valor, quantidade = 1) {
        this.nome = nome;
        this.valor = valor;
        this.quantidade = quantidade;
    }
    subtotal() {
        return this.valor * this.quantidade;
    }
}
