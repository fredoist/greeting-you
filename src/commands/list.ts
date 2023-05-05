import chalk from 'chalk';
import { withAuth } from '../helpers';
import { supabase } from '../supabase';

export const list = withAuth(async ({ page = 1 }) => {
  const start = page === 1 ? 0 : page * 10;
  const { data, error, count } = await supabase
    .from('greetings')
    .select('id, from, message, read')
    .range(start, 10)
    .limit(10);

  if (error) {
    console.log(chalk.red(error.message));
    return;
  }

  if (!data.length) {
    console.log(chalk.red('No messages found!'));
    return;
  }

  console.log(chalk.green(`Found ${count} messages!`));
  console.log(chalk.green(`Showing page ${page}!`));
  console.log(chalk.gray('Use --page <page> to show more messages!'));
  console.table(data);
});
