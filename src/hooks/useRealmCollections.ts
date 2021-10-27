import { useWallet } from 'use-wallet';
import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Realm } from '../types';

interface QueryResult {
  realms: Realm[];
}

export default (id: string) => {
  const { account } = useWallet();

  const res = useHyperVibesSubgraph<QueryResult>(
    'realmCollections',
    gql`
      query {
        realms(where: { id: "${id}" }) {
          id
          name
          description
          realmCollections {
            id
            collection {
              id
              address
            }
          }
        }
      }
    `,
    { enabled: !!account }
  );

  return {
    data: res.data?.realms[0].realmCollections.map((realmCollection) => realmCollection.collection),
  };
};
