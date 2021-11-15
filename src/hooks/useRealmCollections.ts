import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Realm } from '../types';

interface QueryResult {
  realms: Realm[];
}

export default (id: string) => {
  const res = useHyperVibesSubgraph<QueryResult>(
    `realm.${id}.realmCollections`,
    gql`
      query {
        realms(where: { id: "${id}" }) {
          id
          name
          description
          allowAllCollections
          realmCollections {
            id
            collection {
              id
              name
              address
              nfts {
                tokenUri
              }
            }
          }
        }
      }
    `
  );

  return {
    data: {
      id: res.data?.realms[0]?.id,
      name: res.data?.realms[0]?.name,
      description: res.data?.realms[0]?.description,
      allowAllCollections: res.data?.realms[0]?.allowAllCollections,
      collections:
        res.data?.realms[0]?.realmCollections.map(
          realmCollection => realmCollection.collection
        ) || [],
    },
  };
};
