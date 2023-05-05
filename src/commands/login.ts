import inquirer from 'inquirer';
import chalk from 'chalk';
import { supabase } from '../supabase';

export const login = async () => {
  const {
    data: { session: currentSession },
  } = await supabase.auth.getSession();

  if (currentSession) {
    console.log(chalk.green('You are already logged in!'));
    return
  }

  const { email } = await inquirer.prompt([
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email:',
    },
  ]);

  const { error } = await supabase.auth.signInWithOtp({ email });

  if (error) {
    console.log(chalk.red(error.message));
    return
  }

  const { token } = await inquirer.prompt([
    {
      type: 'input',
      name: 'token',
      message: 'Enter the OTP code sent to your email:',
    },
  ]);

  const { data: { session }, error: otpError } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });

  if (otpError) {
    console.log(chalk.red(otpError.message));
    return
  }

  console.log(chalk.green(`Logged in as ${session?.user.email}!`));
};
