import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://izmzxqzcsnaykofpcjjh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6bXp4cXpjc25heWtvZnBjampoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NzEzODQsImV4cCI6MjA0OTM0NzM4NH0.YSiOEG-y0c26vau_VCiZ8H2_8kM8WjmNJsKr3KYE1mo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Initialize storage bucket reference
export const storageBucket = supabase.storage.from('demands');