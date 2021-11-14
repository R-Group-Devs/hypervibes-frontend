import { useQuery, UseQueryOptions } from 'react-query';
import { request } from 'graphql-request';
import { useWallet } from 'use-wallet';

const HYPERVIBES_SUBGRAPH_ENDPOINTS: Record<string, string> = {
  // TODO: add mainnet URL
  1: 'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-rinkeby',
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
  // TODO: don't default to chain, instead make query condiitonal on chainId
  // handle cases where no wallet is connected
  const { chainId = 1 } = useWallet();

  return useQuery<QueryResult, Error>(
    queryName,
    async () => request(HYPERVIBES_SUBGRAPH_ENDPOINTS[chainId], query),
    queryOptions
  );
};
