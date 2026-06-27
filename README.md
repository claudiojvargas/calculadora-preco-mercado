# Calculadora de Compras

Aplicação Web desenvolvida para auxiliar consumidores no controle de gastos durante compras em supermercados, atacados e estabelecimentos varejistas.

A aplicação permite acompanhar o valor acumulado da compra em tempo real, proporcionando maior previsibilidade financeira e ajudando o usuário a manter seu orçamento durante todo o processo de compra.

Este é um produto desenvolvido para uso real, com foco em simplicidade, desempenho e experiência do usuário. Sua arquitetura foi planejada para permitir evolução contínua, incorporando novas funcionalidades conforme o produto amadurece.

> 🚀 Projeto em desenvolvimento ativo.

---

# 🌐 Demonstração

**Acesse a aplicação**

🔗 https://precomercado.netlify.app

---

# 📖 Sobre o Produto

Controlar os gastos durante uma compra nem sempre é uma tarefa simples. Muitas vezes o consumidor só descobre o valor final ao chegar no caixa.

A Calculadora de Compras nasceu para resolver esse problema de forma prática e intuitiva, permitindo que o usuário acompanhe o valor total da compra em tempo real diretamente pelo navegador ou dispositivo móvel.

A proposta é evoluir continuamente a aplicação, transformando-a em uma plataforma completa para gerenciamento de compras pessoais.

---

# 🎯 Objetivos

- Facilitar o controle financeiro durante compras.
- Evitar gastos acima do orçamento planejado.
- Oferecer uma experiência simples e intuitiva.
- Disponibilizar uma aplicação rápida e acessível.
- Evoluir continuamente o produto com novas funcionalidades.

---

# ✨ Funcionalidades

## Atualmente disponíveis

- ✅ Adição rápida de produtos
- ✅ Cálculo automático do valor total
- ✅ Atualização em tempo real
- ✅ Autenticação de usuários
- ✅ Persistência de dados utilizando Supabase
- ✅ Interface responsiva
- ✅ Tema da aplicação
- ✅ Feedback visual através de notificações (Toast)
- ✅ Progressive Web App (PWA)
- ✅ Instalação em dispositivos móveis

---

# 🛠 Tecnologias Utilizadas

## Front-end

- HTML5
- JavaScript (ES6+)
- Tailwind CSS

## Backend e Serviços

- Supabase
  - Autenticação
  - Banco de Dados

## Recursos

- Progressive Web App (PWA)
- Service Worker
- Local Storage
- Manifest
- Mobile First

---

# 📂 Estrutura do Projeto

```
assets/
│
├── css/
│
├── icon/
│
├── js/
│   ├── auth.js
│   ├── landing.js
│   ├── listaProdutos.js
│   ├── login.js
│   ├── main.js
│   ├── produto.js
│   ├── pwaInstaller.js
│   ├── sugestoes.js
│   ├── supabase.js
│   ├── theme.js
│   ├── toast.js
│   └── ui.js
│
service-worker.js
manifest.json
index.html
```

A organização foi baseada na separação de responsabilidades, facilitando manutenção, evolução e futuras expansões do sistema.

---

# 🏗 Arquitetura

A aplicação foi estruturada de forma modular.

| Arquivo | Responsabilidade |
|---------|------------------|
| auth.js | Autenticação de usuários |
| produto.js | Manipulação dos produtos |
| listaProdutos.js | Gerenciamento da lista |
| supabase.js | Comunicação com banco de dados |
| ui.js | Atualização da interface |
| toast.js | Feedback visual |
| theme.js | Gerenciamento de temas |
| login.js | Fluxo de autenticação |
| landing.js | Página inicial |

Essa separação reduz o acoplamento entre módulos e facilita futuras implementações.

---

# 💡 Decisões Técnicas

Algumas decisões de arquitetura foram tomadas pensando na evolução do produto.

### Arquitetura Modular

Cada responsabilidade foi isolada em módulos independentes, facilitando manutenção, testes e expansão.

### Progressive Web App

A aplicação pode ser instalada em smartphones e utilizada como um aplicativo, proporcionando uma experiência mais próxima de uma aplicação nativa.

### Supabase

Foi adotado como Backend as a Service para disponibilizar autenticação e persistência de dados, permitindo focar na evolução das funcionalidades do produto.

### Mobile First

Como o principal cenário de uso acontece durante compras, toda a interface foi pensada priorizando dispositivos móveis.

### Escalabilidade

A estrutura do projeto foi organizada para permitir o crescimento gradual da aplicação sem necessidade de grandes refatorações.

---

# 🧠 Conceitos Aplicados

Este produto utiliza diversos conceitos comuns no desenvolvimento de aplicações modernas.

- Organização modular
- Separação de responsabilidades
- Persistência de dados
- Autenticação de usuários
- Progressive Web App (PWA)
- Mobile First
- Responsividade
- Feedback visual ao usuário
- Arquitetura escalável
- Evolução incremental

---

# 📸 Capturas de Tela

*As imagens serão adicionadas nas próximas versões do README.*

Sugestão de organização:

```
docs/
    home.png
    lista.png
    login.png
    mobile.png
```

Depois poderão ser exibidas diretamente nesta seção para facilitar a visualização do produto.

---

# 🚧 Roadmap

## Próxima versão

- Editar produtos
- Remover produtos
- Pesquisa rápida

## Em desenvolvimento

- Listas de compras
- Histórico de compras
- Salvamento automático
- Categorias

## Futuras versões

- Dashboard financeiro
- Estatísticas de gastos
- Comparativo mensal
- Compartilhamento de listas
- Sincronização entre dispositivos
- Funcionamento offline completo
- Comparação de preços entre mercados
- Sugestões inteligentes de economia

---

# 🎯 Desafios Técnicos

Durante o desenvolvimento alguns desafios orientaram as decisões de arquitetura:

- Manter a simplicidade da interface.
- Organizar o código de forma modular.
- Preparar a aplicação para crescimento contínuo.
- Garantir boa experiência em dispositivos móveis.
- Utilizar uma arquitetura de fácil manutenção.

---

# 📈 Status do Produto

🟢 **Em desenvolvimento ativo**

Este produto encontra-se em evolução contínua.

Novas funcionalidades são implementadas de forma incremental, buscando manter uma arquitetura organizada, código de fácil manutenção e uma experiência consistente para os usuários.

---

# 🔮 Visão do Produto

A Calculadora de Compras é apenas o primeiro passo.

A visão de longo prazo é transformá-la em uma plataforma completa para gerenciamento de compras pessoais, permitindo ao usuário planejar compras, acompanhar histórico, analisar gastos, comparar preços e tomar decisões mais conscientes sobre seu consumo.

Toda evolução será realizada preservando três princípios:

- Simplicidade
- Performance
- Facilidade de uso

---

# ⚙ Como executar o projeto

Clone o repositório

```bash
git clone https://github.com/claudiojvargas/calculadora-preco-mercado
```

Acesse a pasta

```bash
cd calculadora-preco-mercado
```

Instale as dependências

```bash
npm install
```

Execute o projeto

```bash
npm run dev
```

---

# 🤝 Contribuições

Sugestões, correções e melhorias são sempre bem-vindas.

Caso identifique algum problema ou tenha uma ideia para evolução do produto, fique à vontade para abrir uma *Issue* ou enviar um *Pull Request*.

---

# 📄 Licença

Este projeto é desenvolvido e mantido por **Claudio Vargas**.

O produto encontra-se em desenvolvimento ativo e recebe melhorias contínuas visando entregar uma solução prática, moderna e escalável para o gerenciamento de compras.