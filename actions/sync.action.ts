import * as chalk from 'chalk';
import { readFileSync } from 'fs';
import { platform, release } from 'os';
import osName = require('os-name');
import { join } from 'path';
import { AbstractAction } from './abstract.action';
import { BANNER, MESSAGES } from '../lib/ui';

export class SyncAction extends AbstractAction {
  public async handle() {}

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
