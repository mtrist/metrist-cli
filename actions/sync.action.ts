import * as chalk from 'chalk';
import { existsSync, promises } from 'fs';
import { join } from 'path';
import { AbstractAction } from './abstract.action';
import { RcFile } from '../interfaces/rc.interface';
import { runFetcher } from '../lib/run-fetcher';
import { BaseException } from '../errors/base.exception';

export class SyncAction extends AbstractAction {
  public async handle({ options }) {
    try {
      const { fetcher, resolve, fetcherParams, envPath } =
        await this.resolveOptions(options);
      const output = await runFetcher(fetcher, fetcherParams, envPath);
    } catch (e) {
      if (e instanceof BaseException) {
        console.error(chalk.red(e.getMessage));
      } else {
        throw e;
      }
    }
  }

  async resolveOptions(options) {
    const rc = await this.getRCFile();

    return {
      fetcher: options?.fetcher ?? rc.fetcher,
      resolve: options?.resolve ?? rc.resolvePath,
      envPath: options?.env ?? rc.envPath,
      fetcherParams: rc.fetcherParams ?? {},
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
