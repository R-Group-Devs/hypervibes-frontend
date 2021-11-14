import { useQuery, UseQueryOptions } from 'react-query';
import { request } from 'graphql-request';
import { useWallet } from 'use-wallet';
import { NETWORKS } from '../constants/contracts';

const HYPERVIBES_SUBGRAPH_ENDPOINTS: Record<string, string> = {
  [NETWORKS.eth]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes',
  [NETWORKS.ropsten]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-ropsten',
  [NETWORKS.rinkeby]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-rinkeby',
  [NETWORKS.mumbai]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-mumbai',
};

export default <QueryResult>(
  queryName: string,
  query: string,
  queryOptions?: Omit<
    UseQueryOptions<QueryResult, Error>,
    'queryKey' | 'queryFn'
  > & { chainId?: number }
) => {
  const { chainId: connectedChainId } = useWallet();
  const chainId = queryOptions?.chainId ?? connectedChainId ?? 1;

  return useQuery<QueryResult, Error>(
    // including chain id in the cache key to ensure we don't mix cached queries
    // across chains
    `${chainId}:${queryName}`,
    async () => request(HYPERVIBES_SUBGRAPH_ENDPOINTS[chainId], query),
    queryOptions
  );
};
