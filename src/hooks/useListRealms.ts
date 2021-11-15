import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Realm } from '../types';

interface QueryResult {
  realms: Realm[];
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
