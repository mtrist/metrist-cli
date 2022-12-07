import * as chalk from 'chalk';
import { existsSync, promises } from 'fs';
import { join } from 'path';
import { AbstractAction } from './abstract.action';
import { MESSAGES } from '../lib/ui';
import { RcFile } from '../interfaces/rc.interface';
import { runFetcher } from '../lib/run-fetcher';
import { ParseFetcherException } from '../errors/parse-fetcher.error';

export interface SyncParams {
  fetcher?: string;
  resolve?: string;
}

export class SyncAction extends AbstractAction {
  public async handle({ options }) {
    try {
      const { fetcher, resolve } = await this.resolveOptions(options);
      const output = await runFetcher(fetcher);
      console.log(output);
    } catch (e) {
      console.log(e);
      if (e instanceof ParseFetcherException) {
      }

      console.error(chalk.red(MESSAGES.RC_FILE_NOT_FOUND));
    }
  }

  async resolveOptions(options) {
    const rc = await this.getRCFile();
    const fetcherOption = options.find((item) => (item.name = 'fetcher'));
    const resolveOption = options.find((item) => (item.name = 'resolve'));
    return {
      fetcher: fetcherOption?.value ?? rc.fetcher,
      resolve: resolveOption?.value ?? rc.resolve,
    };
  }

  async getRCFile(): Promise<RcFile> {
    const rcPath = join(process.cwd(), '.metristrc');
    if (existsSync(rcPath)) {
      return JSON.parse(await promises.readFile(rcPath, 'utf8'));
    }
    return;
  }
}
