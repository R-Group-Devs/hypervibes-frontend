import { useQuery, UseQueryOptions } from 'react-query';
import { request } from 'graphql-request';

// TODO - support mainnet
const HYPERVIBES_SUBGRAPH_ENDPOINT =
  'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-ropsten';

export default <QueryResult>(
  queryName: string,
  query: string,
  queryOptions: Omit<UseQueryOptions<QueryResult, Error>, 'queryKey' | 'queryFn'>
) =>
  useQuery<QueryResult, Error>(
    queryName,
    async () => request(HYPERVIBES_SUBGRAPH_ENDPOINT, query),
    queryOptions
  );
