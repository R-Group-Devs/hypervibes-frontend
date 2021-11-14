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
          allowAllCollections
          allowPublicInfusion
          allowMultiInfuse
          realmInfusers {
            account {
              id
              address
            }
          }
          realmCollections {
            collection {
              address
            }
          }
          realmClaimers {
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
  const collections = realm?.realmCollections.map(
    collection => collection.collection.address
  );
  const claimers = realm?.realmClaimers.map(claimer => claimer.account.address);

  return {
    data: {
      id: realm?.id,
      name: realm?.name,
      description: realm?.description,
      token: realm?.token,
      minInfusionAmount: realm?.minInfusionAmount,
      requireNftIsOwned: realm?.requireNftIsOwned,
      allowAllCollections: realm?.allowAllCollections,
      allowPublicInfusion: realm?.allowPublicInfusion,
      // TODO: add to subgraph request
      allowPublicClaiming: true,
      allowMultiInfuse: realm?.allowMultiInfuse,
      infusers,
      collections,
      claimers,
    },
  };
};
