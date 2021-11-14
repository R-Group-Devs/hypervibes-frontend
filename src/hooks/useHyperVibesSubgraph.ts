import { useQuery, UseQueryOptions } from 'react-query';
import { request } from 'graphql-request';
import { useWallet } from 'use-wallet';

const HYPERVIBES_SUBGRAPH_ENDPOINTS: Record<string, string> = {
  3: 'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-ropsten',
  4: 'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-rinkeby',
  80001:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-mumbai',
};

export default <QueryResult>(
  queryName: string,
  query: string,
  queryOptions?: Omit<
    UseQueryOptions<QueryResult, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  const { chainId = 1 } = useWallet();

  return useQuery<QueryResult, Error>(
    queryName,
    async () => request(HYPERVIBES_SUBGRAPH_ENDPOINTS[chainId], query),
    queryOptions
  );
};
