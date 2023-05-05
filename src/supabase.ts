import { createCLISupabaseClient } from 'supabase-auth-helpers-cli';
import { config } from 'dotenv';

config();
const { SUPABASE_URL, SUPABASE_API_KEY } = process.env as {
  SUPABASE_URL: string;
  SUPABASE_API_KEY: string;
};

export const supabase = createCLISupabaseClient(SUPABASE_URL, SUPABASE_API_KEY);
