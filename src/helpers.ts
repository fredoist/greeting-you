import { OptionValues } from 'commander';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import chalk from 'chalk';

export const withAuth =
  (fn: (options: OptionValues, session: Session) => Promise<void>) =>
  async (options: OptionValues) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.log(
        chalk.redBright(
          'You must be logged in to perform this action. Please run `greet login`.'
        )
      );
      return;
    }
    
    return fn(options, session);
  };
