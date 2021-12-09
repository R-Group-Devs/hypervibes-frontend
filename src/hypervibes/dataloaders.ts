import 'setimmediate';
import memoize from 'lodash/memoize';
import Dataloader from 'dataloader';
import { batchGetTokenData, GetTokenViewInput } from './contract';
import { batchGetIndexedInfusions, GetIndexedInfusionsInput } from './subgraph';

const options = {
  // serialize object keys
  cacheKeyFn: JSON.stringify,
};

export const getLoaders = memoize((chainId: number) => {
  return {
    tokenData: new Dataloader(
      (keys: readonly GetTokenViewInput[]) =>
        batchGetTokenData([...keys], chainId),
      options
    ),
    indexedInfusion: new Dataloader(
      (keys: readonly GetIndexedInfusionsInput[]) =>
        batchGetIndexedInfusions([...keys], chainId),
      options
    ),
  };
});
