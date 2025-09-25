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
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google', 
    options: {
      redirectTo: "http://localhost/calculadora-preco-mercado/"  // volta para sua PWA após login
    }
  });
  if (error) console.error("Erro no login Google:", error.message);
}

// Pegar usuário logado
export async function getUsuarioAtual() {
  const { data } = await supabase.auth.getUser();
  return data.user || null;
}

// Logout
export async function logout() {
  await supabase.auth.signOut();
  alert("Você saiu!");
}
