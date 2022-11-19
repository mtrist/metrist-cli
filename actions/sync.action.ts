import * as chalk from 'chalk';
import { readFileSync, promises } from 'fs';
import { join } from 'path';
import { AbstractAction } from './abstract.action';
import { MESSAGES } from '../lib/ui';
import { RcFile } from '../interfaces/rc.interface';
import { readEnv } from '../lib/env/readEnv';
import { exec } from 'js-exec';
import { transform } from '@babel/core';
import env from 'babel-preset-env';

export class SyncAction extends AbstractAction {
  public async handle() {
    try {
      const rcFile = this.getRCFile();
      if (rcFile.fetcher) {
        const content = await promises.readFile(
          join(process.cwd(), rcFile.fetcher),
          'utf8',
        );
        let value: any;
        const setValue = (val: any) => (value = val);

        transform(
          content,
          {
            presets: [env],
          },
          (err: Error, results: { code: string }) => {
            // console.log(results.code);
            exec(results.code, {
              onSuccess: () => {
                console.log('the code said: ', value);
              },
              onError: (error) => {
                console.log('error');
                console.error(error);
              },
            })({
              console,
              setContent: setValue,
            });
          },
        );
      }
    } catch (e) {
      console.log(e);
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
