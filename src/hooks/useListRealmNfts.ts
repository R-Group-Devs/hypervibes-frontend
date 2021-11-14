import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';

interface QueryResult {
  realm: {
    id: string;
    infusions: Array<{
      id: string;
      nft: {
        tokenId: string;
        collection: {
          id: string;
          address: string;
          name: string | null;
          symbol: string | null;
        };
      };
      balance: string;
      lastClaimTimestamp: string;
      events: Array<{
        id: string;
        eventType: 'INFUSE' | 'CLAIM';
        createdAtTimestamp: string;
        createdAtTransactionHash: string;
        amount: string;
        msgSender: string;
        target: string;
      }>;
    }>;
  };
}

export default (realmId: string, chainId?: number) => {
  const res = useHyperVibesSubgraph<QueryResult>(
    `realm.${realmId}.listRealmNts`,
    gql`
      query getRealmNfts($realmId: String!) {
        realm(id: $realmId) {
          id
          infusions {
            id
            nft {
              id
              tokenId
              collection {
                id
                address
                name
                symbol
              }
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
    { chainId, variables: { realmId } }
  );

  return res;
};
