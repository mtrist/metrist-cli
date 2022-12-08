import { executeFetcher } from '../utils/execute-fetcher';
import { extractJson } from '../utils/extract-json';
import type { RcFile } from '../../interfaces/rc.interface';
import type { LanguageDictionary } from '../../interfaces/phrase.interface';
import { ParseFetcherException } from '../../errors/parse-fetcher.error';

export const runFetcher = async (
  fetcher: RcFile['fetcher'],
): Promise<LanguageDictionary | never> => {
  const fetcherRawOutput = await executeFetcher(fetcher);
  const extracted = extractJson(fetcherRawOutput);
  if (extracted) {
    return extracted;
  }
  throw new ParseFetcherException();
};
