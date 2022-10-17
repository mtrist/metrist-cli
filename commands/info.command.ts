import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';

export class InfoCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('info')
      .alias('i')
      .description('Display a details about Metrist in a project.')
      .action(async () => {
        await this.action.handle();
      });
  }
}
