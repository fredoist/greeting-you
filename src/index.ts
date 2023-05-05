#!/bin/env node
import { Command } from 'commander';
const program = new Command();
import { login, logout, read, send, del, list } from './commands';

program
  .name('greet')
  .description('Send greetings to your friends!')
  .version('1.0.0');

program
  .command('login')
  .description('Log in or sign up to your account')
  .action(login);
program.command('logout').description('Log out of your account').action(logout);
program
  .command('read')
  .description('Check if you have any unread messages')
  .option('-i, --id <id>', 'Read a specific message')
  .action(read);
program
  .command('send')
  .description('Send a message to a user')
  .option('-u, --user <email>', 'User to send the message to')
  .option('-m, --message <message>', 'Message to send')
  .action(send);
program
  .command('delete')
  .description('Delete a message')
  .option('-i, --id <id>', 'Delete a specific message')
  .action(del);
program.command('list').description('List all messages').action(list);

program.parse(process.argv);
