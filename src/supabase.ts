import { createCLISupabaseClient } from 'supabase-auth-helpers-cli';
import { supabaseUrl, supabaseKey } from './supabase.json';

export const supabase = createCLISupabaseClient(supabaseUrl, supabaseKey);
