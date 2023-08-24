// var produtos = [];
var produtos = [
];
var proximoNumeroProduto = 1;

function adicionarProduto() {
  var nomeProduto = document.getElementById("nome-produto").value;
  var valorProduto = parseFloat(document.getElementById("valor-produto").value);

  if (nomeProduto.trim() === "") {
    nomeProduto = "Produto #" + proximoNumeroProduto;
  }

  var quantidadeProduto = 1;

  if (quantidadeProduto > 1) {
    quantidadeProduto = produto.quantidade;
  }

  produtos.push({
    id: proximoNumeroProduto,
    nome: nomeProduto,
    valor: valorProduto,
    quantidade: quantidadeProduto
  });

  atualizarListaProdutos();
  atualizarTotal();
  atualizarContagemItens();

  document.getElementById("nome-produto").value = "";
  document.getElementById("valor-produto").value = "";

  proximoNumeroProduto++;
}

function removerProduto(id) {
  produtos = produtos.filter(function (produto) {
    return produto.id !== id;
  });

  atualizarListaProdutos();
  atualizarTotal();
  atualizarContagemItens();
}

function atualizarListaProdutos() {
  var lista = document.getElementById("produtos-list");
  lista.innerHTML = "";

  for (var i = 0; i < produtos.length; i++) {
    var produto = produtos[i];
    var item = document.createElement("li");
    item.className = "produto-item";
    item.innerHTML = `
      <span class="produto-nome">${i + 1}. ${produto.nome}</span>
      <div class="produto-info">
        <span class="produto-valor">R$ ${produto.valor.toFixed(2)}</span>
        <input type="number" class="quantidade-produto" value="${produto.quantidade}" onchange="atualizarQuantidade(${i}, this.value)">
        <button class="fa-solid fa-trash btn-remover" onclick="removerProduto(${produto.id})"></button>
      </div>
    `;
    lista.appendChild(item);
  }
}

function atualizarQuantidade(index, quantidade) {
  if (quantidade <= 0 || isNaN(quantidade)) {
    quantidade = 1;
  }

  produtos[index].quantidade = quantidade;
  atualizarTotal();
  atualizarContagemItens()
}

function atualizarTotal() {
  var total = 0;

  for (var i = 0; i < produtos.length; i++) {
    total += produtos[i].valor * produtos[i].quantidade;
  }

  document.getElementById("total").innerText = "R$ " + total.toFixed(2);
}

function atualizarContagemItens() {
  var contagem = 0;

  for (var i = 0; i < produtos.length; i++) {
    contagem += parseInt(produtos[i].quantidade);
  }

  var contagemItensElemento = document.getElementById("contagem-itens");
  contagemItensElemento.innerText = contagem + (contagem === 1 ? " item" : " itens");

}