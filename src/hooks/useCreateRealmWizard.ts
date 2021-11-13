import { useCallback } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import { BigNumber } from '@ethersproject/bignumber';
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
    claimableTokenRate: null,
    minTokenInfusionAmount: null,
    maxInfusibleTokens: null,
    minClaimAmount: null,
    requireOwnership: 'no',
    allowMultiInfusion: 'yes',
    allowAllCollections: 'yes',
    allowPublicInfusion: 'yes',
  },
};

export interface RealmWizardValues {
  name: string;
  description: string;
  admins: { value: string }[];
  allowedCollections: { value: string }[];
  tokenAddress: string;
  allowedInfusers: { value: string }[];
  claimableTokenRate: number | null;
  minTokenInfusionAmount: number | null;
  maxInfusibleTokens: number | null;
  minClaimAmount: number | null;
  requireOwnership: 'yes' | 'no';
  allowMultiInfusion: 'yes' | 'no';
  allowAllCollections: 'yes' | 'no';
  allowPublicInfusion: 'yes' | 'no';
}

const { useGlobalState } = createGlobalState(initialState);

export default () => {
  const [realm, updateRealm] = useGlobalState('realmWizard');
  const hyperVibesContract = useHyperVibesContract();
  const erc20Contract = useErc20Contract(realm.tokenAddress);

  const createRealm = useCallback(
    async (realm: RealmWizardValues) => {
      const decimalExponent = await erc20Contract?.decimals();
      const decimals = BigNumber.from(10).pow(decimalExponent);

      return hyperVibesContract?.createRealm({
        name: realm.name,
        description: realm.description,
        admins: realm.admins.map(x => x.value).filter(Boolean),
        infusers:
          realm.allowPublicInfusion === 'yes'
            ? []
            : realm.allowedInfusers.map(x => x.value).filter(Boolean),
        // TODO: need a wizard step to allow realm creator the ability to
        // specify an allowlist of claimers
        claimers: [],
        collections:
          realm.allowAllCollections === 'yes'
            ? []
            : realm.allowedCollections.map(x => x.value).filter(Boolean),
        config: {
          token: realm.tokenAddress,
          dailyRate: BigNumber.from(realm.claimableTokenRate).mul(decimals),
          constraints: {
            minInfusionAmount: BigNumber.from(
              realm.minTokenInfusionAmount || 0
            ).mul(decimals),
            maxTokenBalance: BigNumber.from(realm.maxInfusibleTokens || 0).mul(
              decimals
            ),
            minClaimAmount: BigNumber.from(realm.minClaimAmount || 0).mul(
              decimals
            ),
            requireNftIsOwned: realm.requireOwnership === 'yes',
            allowMultiInfuse: realm.allowMultiInfusion === 'yes',
            allowAllCollections: realm.allowAllCollections === 'yes',
            allowPublicInfusion: realm.allowPublicInfusion === 'yes',
            // TODO: need a wizard option to decide if public claiming is allowed
            allowPublicClaiming: true,
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
