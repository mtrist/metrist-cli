import * as chalk from 'chalk';
import { readFileSync } from 'fs';
import { platform, release } from 'os';
import osName = require('os-name');
import { join } from 'path';
import { AbstractAction } from './abstract.action';
import { BANNER, MESSAGES } from '../lib/ui';
import { RcFile } from '../interfaces/rc.interface';

export class SyncAction extends AbstractAction {
  public async handle() {
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

  //   readProjectPackageDependencies(): PackageJsonDependencies {
  //     const pack = this.getPackageJson();
  //     const dependencies = { ...pack.dependencies, ...pack.devDependencies };
  //     const versionDependencies = {} as PackageJsonDependencies;
  //     Object.keys(dependencies).forEach((key) => {
  //       versionDependencies[key] = {
  //         version: dependencies[key],
  //       };
  //     });
  //     return versionDependencies;
  //   }
}
