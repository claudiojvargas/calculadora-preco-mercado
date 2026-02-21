import { supabase } from './supabase.js';

// Registrar usuário por email
export async function registrarEmail(email, senha) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha
  });
  if (error) console.error("Erro no registro:", error.message);
  return data.user;
}

// Login com email/senha
export async function loginEmail(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });
  if (error) console.error("Erro no login:", error.message);
  return data.user;
}

// Login social (Google)
export async function loginGoogle() {
  const redirectTo = new URL('app.html', window.location.href).toString();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo
    }
  });
  if (error) console.error("Erro no login Google:", error.message);
}

export async function atualizarPerfil(data) {
  const { data: updatedData, error } = await supabase.auth.updateUser(data);
  if (error) {
    console.error('Erro ao atualizar perfil:', error.message);
    return null;
  }
  return updatedData.user || null;
}

// Pegar usuário logado
export async function getUsuarioAtual() {
  const { data } = await supabase.auth.getUser();
  return data.user || null;
}

// Checar sessão ao carregar a aplicação
export async function checarSessao() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Erro ao recuperar sessão:", error.message);
    return null;
  }
  return data.session?.user || null;
}

export function escutarMudancaSessao(callback) {
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      callback(session.user);
    } else {
      callback(null);
    }
  });
}

// Logout
export async function logout() {
  await supabase.auth.signOut();
  alert("Você saiu!");
}
