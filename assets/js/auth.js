import { supabase } from './supabase.js';

async function sincronizarPerfil(user) {
  if (!user) return null;

  const payload = {
    id: user.id,
    email: user.email || null,
    full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
    avatar_url: user.user_metadata?.avatar_url || null,
    provider: user.app_metadata?.provider || null
  };

  const { error } = await supabase
    .from('profiles')
    .upsert(payload, { onConflict: 'id' });

  if (error) {
    console.error('Erro ao sincronizar perfil:', error.message);
  }

  return user;
}

// Registrar usuário por email
export async function registrarEmail(email, senha) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha
  });
  if (error) {
    console.error('Erro no registro:', error.message);
    return null;
  }

  if (data.user) {
    await sincronizarPerfil(data.user);
  }

  return data.user;
}

// Login com email/senha
export async function loginEmail(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });
  if (error) {
    console.error('Erro no login:', error.message);
    return null;
  }

  if (data.user) {
    await sincronizarPerfil(data.user);
  }

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
  if (error) console.error('Erro no login Google:', error.message);
}

export async function atualizarPerfil(data) {
  const { data: updatedData, error } = await supabase.auth.updateUser(data);
  if (error) {
    console.error('Erro ao atualizar perfil:', error.message);
    return null;
  }

  if (updatedData.user) {
    await sincronizarPerfil(updatedData.user);
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
    console.error('Erro ao recuperar sessão:', error.message);
    return null;
  }

  if (data.session?.user) {
    await sincronizarPerfil(data.session.user);
  }

  return data.session?.user || null;
}

export function escutarMudancaSessao(callback) {
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      sincronizarPerfil(session.user);
      callback(session.user);
    } else {
      callback(null);
    }
  });
}

// Logout
export async function logout() {
  await supabase.auth.signOut();
  alert('Você saiu!');
}
