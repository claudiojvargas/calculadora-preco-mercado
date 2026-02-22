import { supabase } from './supabase.js';

/**
 * Retorna a URL absoluta do app.html no mesmo diretório do projeto,
 * evitando carregar query/hash da página atual.
 */
function getAppRedirectUrl() {
  const path = window.location.pathname;
  const baseDir = path.endsWith('/')
    ? path
    : path.substring(0, path.lastIndexOf('/') + 1);

  return `${window.location.origin}${baseDir}app.html`;
}

function limparParametrosOAuthDaUrl() {
  const url = new URL(window.location.href);

  // Remove parâmetros comuns do OAuth / errors
  url.searchParams.delete('code');
  url.searchParams.delete('error');
  url.searchParams.delete('error_code');
  url.searchParams.delete('error_description');

  // Remove o hash (caso implicit flow)
  url.hash = '';

  window.history.replaceState({}, document.title, url.toString());
}

function extrairTokensDoHash() {
  const hash = window.location.hash?.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash;

  if (!hash) return null;

  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');

  if (!accessToken || !refreshToken) return null;

  return {
    access_token: accessToken,
    refresh_token: refreshToken
  };
}

/**
 * Hidrata sessão retornando do OAuth.
 * - Suporta PKCE/code flow: ?code=...
 * - Fallback para implicit flow: #access_token=...
 */
export async function hidratarSessaoDaUrl() {
  try {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    // 1) PKCE / Authorization Code Flow
    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error('Erro ao trocar code por sessão:', error.message);
        limparParametrosOAuthDaUrl();
        return null;
      }

      limparParametrosOAuthDaUrl();
      return data.session?.user || null;
    }

    // 2) Implicit Flow (tokens no hash)
    const tokens = extrairTokensDoHash();
    if (!tokens) return null;

    const { data, error } = await supabase.auth.setSession(tokens);
    if (error) {
      console.error('Erro ao hidratar sessão do hash:', error.message);
      limparParametrosOAuthDaUrl();
      return null;
    }

    limparParametrosOAuthDaUrl();
    return data.session?.user || null;
  } catch (err) {
    console.error('Erro inesperado ao hidratar sessão:', err);
    limparParametrosOAuthDaUrl();
    return null;
  }
}

// --------------------------------------------
// IMPORTANTE
// Profiles serão criados pelo TRIGGER no banco.
// Não faça upsert no client (evita 401).
// --------------------------------------------

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

  // NÃO sincroniza profiles aqui (DB trigger faz isso)
  return data.user || null;
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

  // NÃO sincroniza profiles aqui (evita 401)
  return data.user || null;
}

// Login social (Google)
export async function loginGoogle() {
  const redirectTo = getAppRedirectUrl();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo }
  });

  if (error) {
    console.error('Erro no login Google:', error.message);
    return null;
  }

  return true;
}

export async function atualizarPerfil(data) {
  const { data: updatedData, error } = await supabase.auth.updateUser(data);

  if (error) {
    console.error('Erro ao atualizar perfil:', error.message);
    return null;
  }

  // Se você quiser refletir mudanças no profiles,
  // faça isso no banco (trigger on update) ou via RPC/Edge Function.
  return updatedData.user || null;
}

// Pegar usuário logado
export async function getUsuarioAtual() {
  const { data } = await supabase.auth.getUser();
  return data.user || null;
}

// Checar sessão ao carregar a aplicação
export async function checarSessao() {
  // 1) Se veio de OAuth callback, hidrata sessão
  const userDaUrl = await hidratarSessaoDaUrl();
  if (userDaUrl) return userDaUrl;

  // 2) Se já existe sessão salva no browser
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Erro ao recuperar sessão:', error.message);
    return null;
  }

  return data.session?.user || null;
}

/**
 * Escuta mudanças de sessão.
 * Retorna uma função para "desinscrever".
 */
export function escutarMudancaSessao(callback) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });

  return () => data.subscription.unsubscribe();
}

// Logout
export async function logout() {
  await supabase.auth.signOut();
  alert('Você saiu!');
}