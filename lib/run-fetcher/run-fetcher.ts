import { executeCommand } from '../utils/execute-command';
import { extractJson } from '../utils/extract-json';
import type { RcFile } from '../../interfaces/rc.interface';
import type { LanguageDictionary } from '../../interfaces/phrase.interface';
import { ParseFetcherException } from '../../errors/parse-fetcher.error';

export const runFetcher = async (
  fetcherCommand: RcFile['fetcher'],
): Promise<LanguageDictionary | never> => {
  const fetcherRawOutput = await executeCommand(fetcherCommand);
  const extracted = extractJson(fetcherRawOutput);
  if (extracted) {
    return extracted;
  }
  throw new ParseFetcherException();
};
