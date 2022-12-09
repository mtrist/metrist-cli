import { Exception } from '../interfaces/exception.interface';
import { MESSAGES } from '../lib/ui';

const default_message = 'DEFAULT';

export abstract class BaseException extends Error implements Exception {
  MESSAGE_TITLE = default_message;

  getMessage() {
    const message = MESSAGES[this.MESSAGE_TITLE];
    return message ?? MESSAGES[default_message];
  }
}
