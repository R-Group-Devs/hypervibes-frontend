import { useQuery, UseQueryOptions } from 'react-query';
import { request } from 'graphql-request';
import { useWallet } from 'use-wallet';
import { NETWORKS } from '../constants/contracts';

const HYPERVIBES_SUBGRAPH_ENDPOINTS: Record<string, string> = {
  [NETWORKS.mainnet]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-mainnet',
  [NETWORKS.matic]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-matic',
  [NETWORKS.ropsten]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-ropsten',
  [NETWORKS.rinkeby]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-rinkeby',
  [NETWORKS.goerli]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-goerli',
  [NETWORKS.mumbai]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-mumbai',
};

interface QueryOptions {
  chainId?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any>;
}

export default <QueryResult>(
  queryName: string,
  query: string,
  queryOptions?: Omit<
    UseQueryOptions<QueryResult, Error>,
    'queryKey' | 'queryFn'
  > &
    QueryOptions
) => {
  const { chainId: connectedChainId } = useWallet();
  const chainId = queryOptions?.chainId ?? connectedChainId ?? 1;

  return useQuery<QueryResult, Error>(
    // including chain id in the cache key to ensure we don't mix cached queries
    // across chains
    `${chainId}:${queryName}`,
    async () =>
      request(
        HYPERVIBES_SUBGRAPH_ENDPOINTS[chainId],
        query,
        queryOptions?.variables
      ),
    queryOptions
  );
};
