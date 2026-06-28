// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://lqwzapmfvzpflhxnhipv.supabase.co';   // da dashboard
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxd3phcG1mdnpwZmxoeG5oaXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMTQyOTMsImV4cCI6MjA4NjY5MDI5M30.MRs90nYqNgZvoq9JRbiOpa1DUkFBo9s8QWWI0YZ96Ns';        // da dashboard

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
