import * as chalk from 'chalk';
import { existsSync, promises } from 'fs';
import { join } from 'path';
import { AbstractAction } from './abstract.action';
import { MESSAGES } from '../lib/ui';
import { RcFile } from '../interfaces/rc.interface';
import { runFetcher } from '../lib/run-fetcher';
import { BaseException } from '../errors/base.exception';
import { getRepositoryData } from '../fetchers/github/github';

const repo = 'i18-test'; //'locals-test';
const org = 'parsasi';
const token = '';
export class SyncAction extends AbstractAction {
  public async handle({ options }) {
    // console.log(
    //   await getRepositoryData({
    //     org,
    //     token,
    //     repo,
    //   }),
    // );
    try {
      const { fetcher, resolve } = await this.resolveOptions(options);
      const output = await runFetcher(fetcher);
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
    const fetcherOption =
      options && options.find((item) => (item.name = 'fetcher'));
    const resolveOption =
      options && options.find((item) => (item.name = 'resolve'));
    return {
      fetcher: fetcherOption?.value ?? rc.fetcher,
      resolve: resolveOption?.value ?? rc.resolvePath,
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
