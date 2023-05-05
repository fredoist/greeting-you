import chalk from 'chalk';
import { supabase } from '../supabase';

export const logout = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log(chalk.red('You are not logged in!'));
    return;
  }

  await supabase.auth.signOut();
  console.log(chalk.green('Logged out successfully!'));
};
