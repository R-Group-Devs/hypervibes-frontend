import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';

interface QueryResult {
  realms: Array<{
    id: string;
    name: string;
    description: string;
    createdAtTimestamp: string;
    token: {
      id: string;
      address: string;
      name: string | null;
      symbol: string | null;
      decimals: number | null;
    };
    infusions: Array<{
      id: string;
      nft: {
        id: string;
        tokenId: string;
        tokenUri: string;
        collection: {
          id: string;
          address: string;
        };
      };
    }>;
  }>;
}

export default (chainId?: number) => {
  const res = useHyperVibesSubgraph<QueryResult>(
    `realms.list`,
    gql`
      query {
        realms {
          id
          name
          description
          createdAtTimestamp
          token {
            id
            address
            name
            symbol
            decimals
          }
          infusions(first: 1) {
            id
            nft {
              id
              tokenId
              tokenUri
              collection {
                id
                address
              }
            }
          }
        }
      }
    `,
    { chainId }
  );

  return res;
};
