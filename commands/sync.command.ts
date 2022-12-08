import { CommanderStatic, Command } from 'commander';
import commander = require('commander');
import { AbstractCommand } from './abstract.command';

export class SyncCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('sync')
      .alias('s')
      .description('Syncs phrases with remote')
      .option('-r, --resolve [path]', 'Resolve path for the JSON files.')
      .option('-f, --fetcher [command]', 'Fetcher command for the project.')
      .action(async (input: string, command: Command) => {
        await this.action.handle({ options: command?.option });
      });
  }
}
