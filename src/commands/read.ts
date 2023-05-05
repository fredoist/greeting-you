import chalk from 'chalk';
import { supabase } from '../supabase';
import { withAuth } from '../helpers';

export const read = withAuth(async ({ id }) => {
  if (id) {
    const { data, error } = await supabase
      .from('greetings')
      .select('id,from,message')
      .eq('id', id)
      .single();

    if (error) {
      console.log(chalk.red(error.message));
      return;
    }

    if (!data) {
      console.log(chalk.red('No message found with that ID'));
      return;
    }

    await supabase.from('greetings').update({ read: true }).eq('id', id);
    console.log(chalk.yellow(`Message from ${data.from}`));
    console.log(chalk.white('-'.repeat(20)));
    console.log(chalk.gray(data.message));
    return;
  }

  const { data, error } = await supabase
    .from('greetings')
    .select('id,from')
    .eq('read', false)
    .limit(10);

  if (error) {
    console.log(chalk.red(error.message));
    return;
  }

  if (data.length === 0) {
    console.log(chalk.green('You have no unread messages!'));
    return;
  }

  console.log(chalk.green(`You have ${data.length} unread messages!`));
  console.log(
    chalk.gray('Run `greet read --id <id>` to read a specific message')
  );
  console.table(data);
});
