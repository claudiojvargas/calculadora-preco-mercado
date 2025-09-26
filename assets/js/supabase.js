import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://rphgunqnxfghlzyknibb.supabase.co';   // da dashboard
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwaGd1bnFueGZnaGx6eWtuaWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2ODIzOTksImV4cCI6MjA3MzI1ODM5OX0.Y5hctdSXVI38leBhPf_b5gHDrBZ6XfMSVniK0aW8EQ4';        // da dashboard

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
