import { useCallback } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import { utils } from 'ethers';
import useHyperVibesContract from './useHyperVibesContract';
import useErc20Contract from './useErc20Contract';

interface GlobalState {
  realmWizard: RealmWizardValues;
}

const initialState: GlobalState = {
  realmWizard: {
    name: '',
    description: '',
    admins: [{ value: '' }],
    allowedCollections: [{ value: '' }],
    tokenAddress: '',
    allowedInfusers: [{ value: '' }],
    allowedClaimers: [{ value: '' }],
    claimableTokenRate: null,
    minTokenInfusionAmount: null,
    maxInfusibleTokens: null,
    minClaimAmount: null,
    requireOwnership: 'no',
    allowMultiInfusion: 'yes',
    allowAllCollections: 'yes',
    allowPublicInfusion: 'yes',
    allowPublicClaiming: 'yes',
  },
};

export interface RealmWizardValues {
  name: string;
  description: string;
  admins: { value: string }[];
  allowedCollections: { value: string }[];
  tokenAddress: string;
  allowedInfusers: { value: string }[];
  allowedClaimers: { value: string }[];
  claimableTokenRate: string | null;
  minTokenInfusionAmount: string | null;
  maxInfusibleTokens: string | null;
  minClaimAmount: string | null;
  requireOwnership: 'yes' | 'no';
  allowMultiInfusion: 'yes' | 'no';
  allowAllCollections: 'yes' | 'no';
  allowPublicInfusion: 'yes' | 'no';
  allowPublicClaiming: 'yes' | 'no';
}

const { useGlobalState } = createGlobalState(initialState);

export default () => {
  const [realm, updateRealm] = useGlobalState('realmWizard');
  const hyperVibesContract = useHyperVibesContract();
  const erc20Contract = useErc20Contract(realm.tokenAddress);

  const createRealm = useCallback(
    async (realm: RealmWizardValues) => {
      const decimalExponent = await erc20Contract?.decimals();

      return hyperVibesContract?.createRealm({
        name: realm.name,
        description: realm.description,
        admins: realm.admins.map(x => x.value).filter(Boolean),
        infusers:
          realm.allowPublicInfusion === 'yes'
            ? []
            : realm.allowedInfusers.map(x => x.value).filter(Boolean),
        claimers:
          realm.allowPublicClaiming === 'yes'
            ? []
            : realm.allowedClaimers.map(x => x.value).filter(Boolean),
        collections:
          realm.allowAllCollections === 'yes'
            ? []
            : realm.allowedCollections.map(x => x.value).filter(Boolean),
        config: {
          token: realm.tokenAddress,
          dailyRate: utils.parseUnits(
            realm.claimableTokenRate || '0',
            decimalExponent
          ),
          constraints: {
            minInfusionAmount: utils.parseUnits(
              realm.minTokenInfusionAmount || '0',
              decimalExponent
            ),
            maxTokenBalance: utils.parseUnits(
              realm.maxInfusibleTokens || '0',
              decimalExponent
            ),
            minClaimAmount: utils.parseUnits(
              realm.minClaimAmount || '0',
              decimalExponent
            ),
            requireNftIsOwned: realm.requireOwnership === 'yes',
            allowMultiInfuse: realm.allowMultiInfusion === 'yes',
            allowAllCollections: realm.allowAllCollections === 'yes',
            allowPublicInfusion: realm.allowPublicInfusion === 'yes',
            allowPublicClaiming: realm.allowPublicClaiming === 'yes',
          },
        },
      });
    },
    [hyperVibesContract, erc20Contract]
  );

  return {
    realm,
    updateRealm: (fields: RealmWizardValues) =>
      updateRealm({ ...realm, ...fields }),
    createRealm,
    resetRealm: () => updateRealm(initialState.realmWizard),
  };
};
