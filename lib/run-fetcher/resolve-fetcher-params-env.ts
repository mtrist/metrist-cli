import { RcFile } from '../../interfaces/rc.interface';
import { readEnv } from '../env/readEnv';

export const resolveFetcherParamsWithEnv = (
  fetcherParams: RcFile['fetcherParams'],
  envPath?: string,
): RcFile['fetcherParams'] => {
  let environment;
  return Object.entries(fetcherParams).reduce(
    (transformedParams, [key, fetcherParamValue]) => {
      if (typeof fetcherParamValue === 'string') {
        if (fetcherParamValue.startsWith('env.')) {
          if (!environment) {
            environment = readEnv(envPath);
          }
          const paramWithoutEnv = fetcherParamValue.replace('env.', '');
          if (environment[paramWithoutEnv]) {
            transformedParams[key] = environment[paramWithoutEnv];
          }
        } else {
          return transformedParams;
        }
      }
      transformedParams[key] = fetcherParamValue;
      return transformedParams;
    },
  );
};
