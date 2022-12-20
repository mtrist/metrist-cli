import { executeFetcher } from '../utils/execute-fetcher';
import { extractJson } from '../utils/extract-json';
import { ParseFetcherException } from '../../errors/parse-fetcher.exception';
import { builtInFetchers } from '../../fetchers';
import { resolveFetcherParamsWithEnv } from './resolve-fetcher-params-env';
import type { RcFile } from '../../interfaces/rc.interface';
import type { LanguageDictionary } from '../../interfaces/phrase.interface';

export const runFetcher = async (
  fetcher: RcFile['fetcher'],
  fetcherParams?: RcFile['fetcherParams'],
  envPath?: RcFile['envPath'],
): Promise<LanguageDictionary | never> => {
  if (builtInFetchers[fetcher]) {
    const fetcherParamsWithResolvedEnv = resolveFetcherParamsWithEnv(
      fetcherParams,
      envPath,
    );
    return builtInFetchers[fetcher](fetcherParamsWithResolvedEnv);
  } else {
    const fetcherCommandRawOutput = await executeFetcher(fetcher);
    const extracted = extractJson(fetcherCommandRawOutput);
    if (extracted) {
      return extracted;
    }
  }
  throw new ParseFetcherException();
};
