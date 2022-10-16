import * as chalk from 'chalk';
import { readFileSync } from 'fs';
import { platform, release } from 'os';
import osName = require('os-name');
import { join } from 'path';
import { AbstractAction } from './abstract.action';
import { BANNER, MESSAGES } from '../lib/ui';

interface LockfileDependency {
  version: string;
}

interface PackageJsonDependencies {
  [key: string]: LockfileDependency;
}

type Dependencies = Record<string, string>;

interface PackageJson {
  dependencies: Dependencies;
  devDependencies: Dependencies;
  [key: string]: unknown;
}

interface MetristDependency {
  name: string;
  value: string;
}

export class InfoAction extends AbstractAction {
  public async handle() {
    this.displayBanner();
    await this.displaySystemInformation();
    await this.displayMetristInformation();
  }

  private displayBanner() {
    console.info(chalk.red(BANNER));
  }

  private async displaySystemInformation(): Promise<void> {
    console.info(chalk.green('[System Information]'));
    console.info('OS Version     :', chalk.blue(osName(platform(), release())));
    console.info('NodeJS Version :', chalk.blue(process.version));
  }

  async displayMetristInformation(): Promise<void> {
    this.displayCliVersion();
    console.info(chalk.green('[Metrist Platform Information]'));
    await this.displayMetristInformationFromPackage();
  }

  async displayMetristInformationFromPackage(): Promise<void> {
    try {
      const dependencies: PackageJsonDependencies =
        this.readProjectPackageDependencies();
      this.displayMetristVersions(dependencies);
    } catch (err) {
      console.error(
        chalk.red(MESSAGES.METRIST_INFORMATION_PACKAGE_MANAGER_FAILED),
      );
    }
  }

  displayCliVersion(): void {
    console.info(chalk.green('[Metrist CLI]'));
    console.info(
      'Metrist CLI Version :',
      chalk.blue(this.getCliPackageJson().version),
      '\n',
    );
  }

  readProjectPackageDependencies(): PackageJsonDependencies {
    const pack = this.getPackageJson();
    const dependencies = { ...pack.dependencies, ...pack.devDependencies };
    const versionDependencies = {} as PackageJsonDependencies;
    Object.keys(dependencies).forEach((key) => {
      versionDependencies[key] = {
        version: dependencies[key],
      };
    });
    return versionDependencies;
  }

  displayMetristVersions(dependencies: PackageJsonDependencies) {
    this.buildMetristVersionsMessage(dependencies).forEach((dependency) =>
      console.info(dependency.name, chalk.blue(dependency.value)),
    );
  }

  buildMetristVersionsMessage(
    dependencies: PackageJsonDependencies,
  ): MetristDependency[] {
    const metristDependencies = this.collectMetristDependencies(dependencies);
    return this.format(metristDependencies);
  }

  collectMetristDependencies(
    dependencies: PackageJsonDependencies,
  ): MetristDependency[] {
    const metristDependencies: MetristDependency[] = [];
    Object.keys(dependencies).forEach((key) => {
      if (key.indexOf('@metrist') > -1) {
        const depPackagePath = require.resolve(key + '/package.json', {
          paths: [process.cwd()],
        });
        const depPackage = readFileSync(depPackagePath).toString();
        const value = JSON.parse(depPackage).version;
        metristDependencies.push({
          name: `${key.replace(/@metrist\//, '').replace(/@.*/, '')} version`,
          value: value || dependencies[key].version,
        });
      }
    });
    return metristDependencies;
  }

  format(dependencies: MetristDependency[]): MetristDependency[] {
    const sorted = dependencies.sort(
      (dependencyA, dependencyB) =>
        dependencyB.name.length - dependencyA.name.length,
    );
    const length = sorted[0].name.length;
    sorted.forEach((dependency) => {
      if (dependency.name.length < length) {
        dependency.name = this.rightPad(dependency.name, length);
      }
      dependency.name = dependency.name.concat(' :');
      dependency.value = dependency.value.replace(/(\^|\~)/, '');
    });
    return sorted;
  }

  rightPad(name: string, length: number): string {
    while (name.length < length) {
      name = name.concat(' ');
    }
    return name;
  }

  getPackageJson(): PackageJson {
    return JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf8'),
    );
  }

  getCliPackageJson(): PackageJson {
    return JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));
  }
}
