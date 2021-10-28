import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Realm } from '../types';

interface QueryResult {
  realms: Realm[];
}

export default (id: string) => {
  const res = useHyperVibesSubgraph<QueryResult>(
    `realm.${id}.realmDetails`,
    gql`
      query {
        realms(where: { id: "${id}" }) {
          id
          name
          description
          token
        }
      }
    `
  );

  return {
    data: {
      id: res.data?.realms[0].id,
      name: res.data?.realms[0].name,
      description: res.data?.realms[0].description,
      token: res.data?.realms[0].token,
    },
  };
};
