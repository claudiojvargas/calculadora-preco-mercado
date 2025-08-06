import { ListaDeProdutos } from './listaProdutos.js';
import { UI } from './ui.js';
import { Sugestoes } from './sugestoes.js';
import { ThemeToggle } from './theme.js';
import './pwaRegister.js';
import { PWAInstaller } from './pwaInstaller.js';

const produtosPrincipais = [
  // Hortifruti
  "Maçã",
  "Melancia",
  "Morango",
  "Abacaxi",
  "Banana",
  "Tomate",
  "Batata",
  "Alface",
  "Cebola",
  "Alho",
  "Cenoura",
  "Laranja",
  "Limão",
  "Repolho",
  "Pepino",

  // Mercearia
  "Arroz",
  "Feijão",
  "Macarrão",
  "Farinha de trigo",
  "Açúcar",
  "Café",
  "Sal",
  "Óleo de soja",
  "Molho de tomate",

  // Frios e Laticínios
  "Leite",
  "Manteiga",
  "Margarina",
  "Queijo",
  "Presunto",
  "Ovos",
  "Iogurte",
  "Requeijão",

  // Carnes
  "Frango",
  "Carne moída",
  "Peito de frango",
  "Linguiça",
  "Bisteca suína",

  // Bebidas
  "Refrigerante",
  "Suco de caixinha",
  "Água mineral",
  "Cerveja",

  // Higiene pessoal
  "Sabonete",
  "Shampoo",
  "Creme dental",
  "Papel higiênico",

  // Limpeza
  "Sabão em barra",
  "Detergente",
  "Desinfetante",
  "Amaciante"
];

window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const lista = new ListaDeProdutos();
  const ui = new UI(lista);

  document.getElementById('btn-adicionar').addEventListener('click', () => ui.adicionarProduto());


  new Sugestoes(produtosPrincipais);
  new PWAInstaller('installBtn');

  // Inicializa tema
  ThemeToggle.init();
});
