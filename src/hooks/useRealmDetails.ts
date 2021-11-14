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
          requireNftIsOwned
          allowPublicInfusion
          realmInfusers {
            account {
              id
              address
            }
          }
        }
      }
    `
  );

  const realm = res.data?.realms[0];
  const infusers = realm?.realmInfusers.map(infuser => infuser.account.address);

  return {
    data: {
      id: realm?.id,
      name: realm?.name,
      description: realm?.description,
      token: realm?.token,
      minInfusionAmount: realm?.minInfusionAmount,
      requireNftIsOwned: realm?.requireNftIsOwned,
      allowPublicInfusion: realm?.allowPublicInfusion,
      infusers,
    },
  };
};
