import * as chalk from 'chalk';
import { EMOJIS } from './emojis';

// METRIST_INFORMATION_PACKAGE_MANAGER_FAILED: `${EMOJIS.SMIRK}  cannot read your project package.json file, are you inside your project directory?`,
export const MESSAGES = {
  COULD_NOT_FIND_FETCHER: 'Could not find the fetcher file.',
  COULD_NOT_PARSE_FETCHER: 'Could not parse the output of your fetcher file.',
  RC_FILE_NOT_FOUND: 'No .metristrc file found.',
  COULD_NOT_READ_ENV_FILE: 'Could not read .env file',
  DEFAULT: `Something went wrong ${EMOJIS.POOP}`,
};
