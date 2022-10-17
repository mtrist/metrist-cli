import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';

export class SyncCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('sync')
      .alias('s')
      .description('Syncs phrases with remote')
      .option('-p, --project [project]', 'Project in which to generate files.')
      .action(async () => {
        await this.action.handle();
      });
  }
}
