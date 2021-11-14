import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';

interface QueryResult {
  nfts: Array<{
    id: string;
    tokenId: string;
    tokenUri: string | null;
    owner: { id: string; address: string };
    collection: {
      id: string;
      address: string;
      name: string | null;
      symbol: string | null;
    };
    infusions: Array<{
      id: string;
      realm: {
        id: string;
        name: string;
        description: string;
      };
      balance: string;
      lastClaimAtTimestamp: string;
      events: Array<{
        id: string;
        eventType: 'INFUSE' | 'CLAIM';
        msgSender: string;
        target: string;
        createdAtTimestamp: string;
        createdAtTransactionHash: string;
      }>;
    }>;
  }>;
}

export default (collection: string, tokenId: string, chainId?: number) => {
  const res = useHyperVibesSubgraph<QueryResult>(
    `nfts.${collection}.${tokenId}.browseNftDetails`,
    gql`
      query getNftDetails($collection: String!, $tokenId: String!) {
        nfts(where: { collection: $collection, tokenId: $tokenId }) {
          id
          tokenId
          tokenUri
          owner {
            id
            address
          }
          collection {
            id
            address
            name
            symbol
          }
          infusions {
            id
            realm {
              id
              name
              description
            }
            balance
            lastClaimAtTimestamp
            events {
              id
              eventType
              msgSender
              target
              createdAtTimestamp
              createdAtTransactionHash
            }
          }
        }
      }
    `,
    { chainId, variables: { collection, tokenId } }
  );

  console.log(res);

  return res;
};
