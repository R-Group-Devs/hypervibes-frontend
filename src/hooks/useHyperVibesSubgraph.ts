import { useQuery, UseQueryOptions } from 'react-query';
import { request } from 'graphql-request';
import { useWallet } from 'use-wallet';

const HYPERVIBES_SUBGRAPH_ENDPOINTS: Record<string, string> = {
  // TODO: replace w/ mainnet URL
  1: 'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-ropsten',
  3: 'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-ropsten',
};

export default <QueryResult>(
  queryName: string,
  query: string,
  queryOptions?: Omit<UseQueryOptions<QueryResult, Error>, 'queryKey' | 'queryFn'>
) => {
  const { chainId = 1 } = useWallet();

  return useQuery<QueryResult, Error>(
    queryName,
    async () => request(HYPERVIBES_SUBGRAPH_ENDPOINTS[chainId], query),
    queryOptions
  );
};
