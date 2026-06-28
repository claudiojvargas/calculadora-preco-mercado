// @ts-nocheck
import {
  loginGoogle,
  checarSessao,
  logout,
  escutarMudancaSessao,
  loginEmail,
  registrarEmail,
  atualizarPerfil
} from './auth.js';

const DEFAULT_AVATAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>`;

export class LoginSocial {
  constructor() {
    this.btnAbrirModal = document.getElementById('btnAbrirLoginModal');
    this.modal = document.getElementById('loginModal');
    this.modalOverlay = document.getElementById('loginModalOverlay');
    this.btnFecharModal = document.getElementById('btnFecharLoginModal');

    this.formLogin = document.getElementById('loginForm');
    this.campoEmail = document.getElementById('emailLogin');
    this.campoSenha = document.getElementById('senhaLogin');
    this.btnRegistrar = document.getElementById('btnCriarConta');
    this.btnLoginGoogle = document.getElementById('btnLoginGoogle');

    this.menuContainer = document.getElementById('userMenuContainer');
    this.btnAvatar = document.getElementById('btnAvatar');
    this.avatarImage = document.getElementById('avatarImage');
    this.avatarFallback = document.getElementById('avatarFallback');
    this.menuDropdown = document.getElementById('userDropdown');
    this.btnEditarPerfil = document.getElementById('btnEditarPerfil');
    this.btnLogout = document.getElementById('btnLogout');

    this.nomeUsuario = document.getElementById('nomeUsuario');
    this.emailUsuario = document.getElementById('emailUsuario');

    this._unsubAuth = null;

    this.init();
  }

  init() {
    this.btnAbrirModal.addEventListener('click', () => this.abrirModal());
    this.btnFecharModal.addEventListener('click', () => this.fecharModal());
    this.modalOverlay.addEventListener('click', () => this.fecharModal());

    this.formLogin.addEventListener('submit', async (event) => {
      event.preventDefault();
      await this.loginComEmail();
    });

    this.btnRegistrar.addEventListener('click', async () => {
      await this.criarConta();
    });

    this.btnLoginGoogle.addEventListener('click', async () => {
      await loginGoogle();
    });

    this.btnAvatar.addEventListener('click', () => {
      const expanded = this.btnAvatar.getAttribute('aria-expanded') === 'true';
      this.btnAvatar.setAttribute('aria-expanded', String(!expanded));
      this.menuDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
      if (!this.menuContainer.contains(event.target)) {
        this.menuDropdown.classList.add('hidden');
        this.btnAvatar.setAttribute('aria-expanded', 'false');
      }
    });

    this.btnEditarPerfil.addEventListener('click', async () => {
      await this.editarPerfil();
    });

    this.btnLogout.addEventListener('click', async () => {
      await logout();
      this.menuDropdown.classList.add('hidden');
      this.atualizarUI(null);
    });

    this.sincronizarSessaoInicial();

    // Mantém a UI sincronizada com mudanças de sessão (login/logout/oauth callback)
    this._unsubAuth = escutarMudancaSessao((user) => {
      this.atualizarUI(user);
    });
  }

  async sincronizarSessaoInicial() {
    const user = await checarSessao();
    this.atualizarUI(user);
  }

  abrirModal() {
    this.modal.classList.remove('hidden');
    this.campoEmail.focus();
  }

  fecharModal() {
    this.modal.classList.add('hidden');
  }

  async loginComEmail() {
    const email = this.campoEmail.value.trim();
    const senha = this.campoSenha.value.trim();

    if (!email || !senha) {
      alert('Preencha email e senha para entrar.');
      return;
    }

    const user = await loginEmail(email, senha);
    if (!user) {
      alert('Não foi possível fazer login. Verifique seus dados.');
      return;
    }

    this.fecharModal();
  }

  async criarConta() {
    const email = this.campoEmail.value.trim();
    const senha = this.campoSenha.value.trim();

    if (!email || !senha) {
      alert('Preencha email e senha para criar sua conta.');
      return;
    }

    const user = await registrarEmail(email, senha);
    if (!user) {
      alert('Não foi possível criar sua conta.');
      return;
    }

    alert('Conta criada com sucesso. Verifique seu email para confirmar, se necessário.');
  }

  async editarPerfil() {
    const user = await checarSessao();
    if (!user) return;

    const nomeAtual = user.user_metadata?.full_name || user.user_metadata?.name || '';
    const novoNome = prompt('Digite seu nome para exibir no perfil:', nomeAtual);
    if (novoNome === null) return;

    const nomeTratado = novoNome.trim();

    const atualizado = await atualizarPerfil({
      data: { full_name: nomeTratado }
    });

    if (!atualizado) {
      alert('Não foi possível atualizar o perfil.');
      return;
    }

    this.atualizarUI(atualizado);
    this.menuDropdown.classList.add('hidden');
  }

  atualizarUI(user) {
    if (user) {
      this.btnAbrirModal.classList.remove('inline-flex');
      this.btnAbrirModal.classList.add('hidden');
      this.menuContainer.classList.remove('hidden');

      this.nomeUsuario.textContent =
        user.user_metadata?.full_name || user.user_metadata?.name || 'Usuário';

      this.emailUsuario.textContent = user.email || '';

      const foto =
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        null;

      if (foto) {
        this.avatarImage.src = foto;
        this.avatarImage.classList.remove('hidden');
        this.avatarFallback.classList.add('hidden');
      } else {
        this.avatarImage.classList.add('hidden');
        this.avatarFallback.classList.remove('hidden');
        this.avatarFallback.innerHTML = DEFAULT_AVATAR;
      }

      this.fecharModal();
    } else {
      this.btnAbrirModal.classList.remove('hidden');
      this.menuContainer.classList.add('hidden');
      this.menuDropdown.classList.add('hidden');
      this.btnAvatar.setAttribute('aria-expanded', 'false');

      this.formLogin.reset();
      this.avatarImage.removeAttribute('src');
      this.avatarImage.classList.add('hidden');
      this.avatarFallback.classList.remove('hidden');
      this.avatarFallback.innerHTML = DEFAULT_AVATAR;

      this.nomeUsuario.textContent = 'Não autenticado';
      this.emailUsuario.textContent = 'Faça login para continuar';
    }
  }
}