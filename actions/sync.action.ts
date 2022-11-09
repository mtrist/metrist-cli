import * as chalk from 'chalk';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AbstractAction } from './abstract.action';
import { MESSAGES } from '../lib/ui';
import { RcFile } from '../interfaces/rc.interface';
import { readEnv } from '../lib/env/readEnv';

export class SyncAction extends AbstractAction {
  public async handle() {
    console.log(await readEnv());
    try {
      const rcPath = this.getRCFile();
    } catch (e) {
      console.error(chalk.red(MESSAGES.RC_FILE_NOT_FOUND));
    }
  }

  getResolvePath(): string | void {
    const rc = this.getRCFile();
    return rc.resolvePath;
  }

  getRCFile(): RcFile {
    return JSON.parse(readFileSync(join(process.cwd(), '.metristrc'), 'utf8'));
  }
}
