import { supabase } from './supabase';
import chalk from 'chalk';

export const withAuth = (fn: any) => {
  return async (...args: any) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.log(chalk.red('You must be logged in to run this command'));
      return;
    }

    return fn.apply(fn, args);
  };
};
