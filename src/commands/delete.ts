import chalk from 'chalk';
import { withAuth } from '../helpers';
import { supabase } from '../supabase';

export const del = withAuth(async ({ id }) => {
  const { data, error } = await supabase.from('greetings').delete().match({ id }).select();

  if (error) {
    console.log(chalk.red(error.message));
    return;
  }

  if (!data.length) {
    console.log(chalk.red(`Unable to delete message ${id}!`));
    return;
  }

  console.log(chalk.green(`Message ${id} deleted!`));
});
