declare const lucide: {
  createIcons: () => void;
};

declare module 'https://esm.sh/@supabase/supabase-js@2' {
  export function createClient(url: string, anonKey: string, options?: unknown): any;
}
