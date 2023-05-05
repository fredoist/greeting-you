import chalk from 'chalk';
import { withAuth } from '../helpers';
import { supabase } from '../supabase';

export const send = withAuth(
  async ({ user, message = 'Greetings!' }, session) => {
    if (!user) {
      console.log(chalk.red('Please provide a user to send a message to!'));
      return;
    }

    if (user === session.user.email) {
      console.log(chalk.red('You cannot send a message to yourself!'));
      return;
    }

    const { error } = await supabase
      .from('greetings')
      .insert({ to: user, from: session.user.email, message });

    if (error) {
      console.log(chalk.red(error.message));
      return;
    }

    console.log(chalk.green(`Message sent to ${user}!`));
  }
);
