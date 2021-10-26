import { useQuery, UseQueryOptions } from 'react-query';
import { request } from 'graphql-request';

const HYPERVIBES_SUBGRAPH_ENDPOINT =
  'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes';

export default (
  queryName: string,
  query: string,
  queryOptions: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>
) => useQuery(queryName, async () => request(HYPERVIBES_SUBGRAPH_ENDPOINT, query), queryOptions);
