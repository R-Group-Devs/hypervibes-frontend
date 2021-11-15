import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Realm } from '../types';

interface QueryResult {
  realm: Realm;
}

export default (realmId: string, chainId?: number) => {
  const res = useHyperVibesSubgraph<QueryResult>(
    `realm.${realmId}.listRealmNts`,
    gql`
      query getRealmNfts($realmId: String!) {
        realm(id: $realmId) {
          id
          name
          infusions {
            id
            nft {
              id
              tokenId
              tokenUri
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
              createdAtTimestamp
              createdAtTransactionHash
              msgSender {
                id
                address
              }
              target {
                id
                address
              }
              amount
            }
          }
        }
      }
    `,
    { chainId, variables: { realmId } }
  );

  return res;
};
