import { loginGoogle, checarSessao, logout, escutarMudancaSessao } from './auth.js';

export class LoginSocial {
  constructor() {
    this.status = document.getElementById("status");
    this.btnLoginGoogle = document.getElementById("btnLoginGoogle");
    this.btnLogout = document.getElementById("btnLogout");

    this.init();
  }

  init() {
    // Botão login Google
    this.btnLoginGoogle.addEventListener("click", async () => {
      const user = await checarSessao();

      if (user) {
        alert("Você já está logado como: " + user.email + ". Saia antes de logar novamente.");
        return;
      }

      await loginGoogle();
    });

    // Botão logout
    this.btnLogout.addEventListener("click", async () => {
      await logout();
      this.atualizarUI(null);
    });

    // Checar sessão inicial
    window.addEventListener("DOMContentLoaded", async () => {
      const user = await checarSessao();
      this.atualizarUI(user);
    });

    // Escutar mudanças de sessão
    escutarMudancaSessao((user) => {
      this.atualizarUI(user);
    });
  }

  atualizarUI(user) {
    if (user) {
      this.status.textContent = "Logado como: " + user.email;
      this.btnLogout.style.display = "inline-block";   // mostra logout
      this.btnLoginGoogle.style.display = "none";      // esconde login
    } else {
      this.status.textContent = "Nenhum usuário logado";
      this.btnLogout.style.display = "none";           // esconde logout
      this.btnLoginGoogle.style.display = "inline-block"; // mostra login
    }
  }
}
