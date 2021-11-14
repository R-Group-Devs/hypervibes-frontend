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
          minInfusionAmount
        }
      }
    `
  );

  const realm = res.data?.realms[0];

  return {
    data: {
      id: realm?.id,
      name: realm?.name,
      description: realm?.description,
      token: realm?.token,
      minInfusionAmount: realm?.minInfusionAmount,
    },
  };
};
