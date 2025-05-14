window.onload = () => {
  lucide.createIcons();
}

tailwind.config = {
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(100%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
    },
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const nomeInput = document.getElementById('nome-produto');
  const valorInput = document.getElementById('valor-produto');
  const totalDisplay = document.getElementById('total');
  const contagemItensDisplay = document.getElementById('contagem-itens');
  const produtosList = document.getElementById('produtos-list');

  let produtos = [];

  function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  
  }

  function atualizarResumo() {
    const total = produtos.reduce((acc, p) => acc + p.valor * p.quantidade, 0);
    const quantidadeItens = produtos.reduce((acc, p) => acc + p.quantidade, 0);

    totalDisplay.textContent = formatarValor(total);
    contagemItensDisplay.textContent = `${quantidadeItens} item(s)`;
  }

function criarElementoProduto(produto, index) {
  const li = document.createElement('li');
  li.className = 'flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl shadow-md gap-4';

  // Nome do produto (sem índice)
  const nome = document.createElement('div');
  nome.className = 'font-medium text-gray-800';
  nome.textContent = produto.nome;

  // Valor formatado
  const valor = document.createElement('span');
  valor.textContent = formatarValor(produto.valor);
  valor.className = 'text-sm text-gray-600 font-semibold';

  // Campo de quantidade
  const inputQtd = document.createElement('input');
  inputQtd.type = 'number';
  inputQtd.value = produto.quantidade;
  inputQtd.min = '1';
  inputQtd.className = 'w-16 px-2 py-1 border border-gray-300 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-green-500';
  inputQtd.addEventListener('change', (e) => {
    const novaQtd = parseInt(e.target.value);
    if (!isNaN(novaQtd) && novaQtd > 0) {
      produtos[index].quantidade = novaQtd;
      atualizarResumo();
    }
  });

  // Botão de excluir
  const botaoExcluir = document.createElement('button');
  botaoExcluir.innerHTML = '<i data-lucide="trash-2"></i>';
  botaoExcluir.className = 'p-2 rounded-md hover:bg-red-100 text-red-500 transition';
  botaoExcluir.addEventListener('click', () => {
    produtos.splice(index, 1);
    renderizarProdutos();
    mostrarToast('Produto removido.', 'info');
  });

  // Área de ações
  const acoes = document.createElement('div');
  acoes.className = 'flex items-center gap-3';
  acoes.append(valor, inputQtd, botaoExcluir);

  li.append(nome, acoes);
  lucide.createIcons();
  return li;
}

  function renderizarProdutos() {
    produtosList.innerHTML = '';
    produtos.forEach((produto, index) => {
      const li = criarElementoProduto(produto, index);
      produtosList.appendChild(li);
    });
    atualizarResumo();
  }

  window.adicionarProduto = () => {
    const nome = nomeInput.value.trim();
    const valor = parseFloat(valorInput.value.replace(',', '.'));

    if (!nome || isNaN(valor) || valor <= 0) {
      mostrarToast('Informe um produto valido.', 'erro');
      return;
    }

    produtos.push({ nome, valor, quantidade: 1 });
    nomeInput.value = '';
    valorInput.value = '';
    renderizarProdutos();
    mostrarToast('Produto adicionado com sucesso!', 'sucesso');
  };
});

function mostrarToast(mensagem, tipo = 'info') {
  const container = document.getElementById('toast-container');

  const config = {
    info: {
      cor: 'border-yellow-500',
      texto: 'Informação',
      icone: 'info',
    },
    info2: {
      cor: 'border-blue-500',
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

  // Criação do toast
  const toast = document.createElement('div');
  toast.className = `toast bg-white border-l-4 ${cor} shadow-lg rounded-xl p-4 flex items-start gap-3 w-80 animate-slide-in transition-opacity duration-500`;

  // Ícone
  const icon = document.createElement('i');
  icon.setAttribute('data-lucide', icone);
  icon.className = `w-5 h-5 mt-1 ${cor.replace('border-', 'text-')}`;

  // Conteúdo
  const content = document.createElement('div');
  content.className = 'flex-1';
  content.innerHTML = `
    <p class="font-semibold text-gray-800">${texto}</p>
    <p class="text-sm text-gray-600">${mensagem}</p>
  `;

  // Botão de fechar
  const btn = document.createElement('button');
  btn.className = 'text-gray-400 hover:text-gray-700 transition';
  btn.innerHTML = `<i data-lucide="x" class="w-4 h-4"></i>`;
  btn.onclick = () => toast.remove();

  // Monta o toast
  toast.appendChild(icon);
  toast.appendChild(content);
  toast.appendChild(btn);
  container.appendChild(toast);
  lucide.createIcons();

  // Remoção automática
  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Lista principal usada pela calculadora
  let produtos = [];

// Lista de produtos principais
  const produtosFallback = [
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

  // Lista padrão embutida (fallback se o usuário não montar nada)
  /*const produtosPrincipais = produtosFallback.map(produto => ({
  nome: produto,
  valor: 0,
  quantidade: 1
}));*/

  //lista de compra produtos 
let listaPredefinida = [];

function usarListaPadrao() {
  produtos = [...produtosFallback];
  mostrarToast('Lista padrão carregada.', 'success');

  // Esconde o botão porque já está usando a padrão
  document.getElementById('btn-usar-padrao').classList.add('hidden');
}

function abrirPopupLista() {
  document.getElementById('popup-lista').classList.remove('hidden');
}

function fecharPopupLista() {
  document.getElementById('popup-lista').classList.add('hidden');
}

function adicionarItemLista() {
  const nome = document.getElementById('nome-produto-lista').value.trim();
  const valor = parseFloat(document.getElementById('valor-produto-lista').value);

  if (!nome) {
    mostrarToast('Preencha nome e valor válidos.', 'error');
    return;
  }

  listaPredefinida.push(nome);
  atualizarListaNoPopup();

  document.getElementById('nome-produto-lista').value = '';
  document.getElementById('valor-produto-lista').value = '';
}

function atualizarListaNoPopup() {
  const ul = document.getElementById('itens-lista');
  ul.innerHTML = '';

  listaPredefinida.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center py-1';
    li.innerHTML = `
      <span>${item}</span>
      <button onclick="removerItemLista(${index})" class="text-red-500 hover:text-red-700">Remover</button>
    `;
    ul.appendChild(li);
  });
}

function removerItemLista(index) {
  listaPredefinida.splice(index, 1);
  atualizarListaNoPopup();
}

function usarListaNaCalculadora() {
  produtos = [...listaPredefinida];
  fecharPopupLista();
  mostrarToast('Lista personalizada carregada.', 'success');

  // Mostrar botão de "voltar" para padrão
  document.getElementById('btn-usar-padrao').classList.remove('hidden');
}


window.addEventListener('DOMContentLoaded', () => {
  if (produtos.length === 0) {
    usarListaPadrao(); // Carrega a padrão na primeira visita
  }
});

// Função para filtrar e exibir sugestões
function filtrarProdutos() {
  const input = document.getElementById('nome-produto');
  const listaSugestoes = document.getElementById('sugestoes');
  const termoBusca = input.value.toLowerCase();

  // Limpar sugestões anteriores
  listaSugestoes.innerHTML = '';

  // Filtra os produtos
  const produtosFiltrados = produtos.filter(produto => 
    produto.toLowerCase().startsWith(termoBusca)
  );

  // Exibe as sugestões ou oculta a lista
  if (termoBusca.length > 0 && produtosFiltrados.length > 0) {
    listaSugestoes.classList.remove('hidden');
    produtosFiltrados.forEach(produto => {
      const li = document.createElement('li');
      li.className = 'p-2 cursor-pointer hover:bg-gray-100';
      li.textContent = produto;
      
      // Ao clicar, preenche o input com o nome do produto
      li.addEventListener('click', () => {
        input.value = produto;
        listaSugestoes.classList.add('hidden');
      });

      listaSugestoes.appendChild(li);
    });
  } else {
    listaSugestoes.classList.add('hidden');
  }
}



//Adiciona o botão de intalar PWA
document.addEventListener('DOMContentLoaded', () => {
  const installButton = document.getElementById('installBtn');
  let deferredInstallPrompt = null;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;

    installButton.style.display = 'block';

    const handleInstallClick = async () => {
      try {
        deferredInstallPrompt.prompt();

        const choiceResult = await deferredInstallPrompt.userChoice;
        console.log('Instalação:', choiceResult.outcome);

        if (choiceResult.outcome === 'accepted' || choiceResult.outcome === 'dismissed') {
          installButton.style.display = 'none';
          deferredInstallPrompt = null;
        }
      } catch (error) {
        console.error('Erro ao tentar instalar a PWA:', error);
      }
    };

    installButton.addEventListener('click', handleInstallClick, { once: true });
  });
});