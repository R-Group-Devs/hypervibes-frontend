import { useCallback } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import { BigNumber } from '@ethersproject/bignumber';
import useHypervibesContract from './useHypervibesContract';
import useERC20Contract from './useERC20Contract';

export interface Realm {
  name: string;
  description: string;
  admins: { value: string }[];
  allowedCollections: { value: string }[];
  tokenAddress: string;
  allowedInfusers: { value: string }[];
  minClaimableTokenRate: number | null;
  maxClaimableTokenRate: number | null;
  minTokenInfusionAmount: number | null;
  maxTokenInfusionAmount: number | null;
  maxInfusibleTokens: number | null;
  requireOwnership: 'yes' | 'no';
  allowMultiInfusion: 'yes' | 'no';
}

const initialState: Record<'realmWizard', Realm> = {
  realmWizard: {
    name: '',
    description: '',
    admins: [{ value: '' }],
    allowedCollections: [{ value: '' }],
    tokenAddress: '',
    allowedInfusers: [{ value: '' }],
    minClaimableTokenRate: null,
    maxClaimableTokenRate: null,
    minTokenInfusionAmount: null,
    maxTokenInfusionAmount: null,
    maxInfusibleTokens: null,
    requireOwnership: 'no',
    allowMultiInfusion: 'yes',
  },
};

const { useGlobalState } = createGlobalState(initialState);

export default () => {
  const [realm, updateRealm] = useGlobalState('realmWizard');
  const hypervibesContract = useHypervibesContract();
  const erc20Contract = useERC20Contract(realm.tokenAddress);

  const createRealm = useCallback(
    async (realm: Realm) => {
      const decimalExponent = await erc20Contract?.decimals();
      const decimals = BigNumber.from(10).pow(decimalExponent);

      return hypervibesContract?.createRealm({
        name: realm.name,
        description: realm.description,
        admins: realm.admins.map((x) => x.value),
        infusers: realm.allowedInfusers.map((x) => x.value),
        collections: realm.allowedCollections.map((x) => x.value),
        config: {
          token: realm.tokenAddress,
          constraints: {
            minDailyRate: BigNumber.from(realm.minClaimableTokenRate || 0).mul(decimals),
            maxDailyRate: BigNumber.from(realm.maxClaimableTokenRate || 0).mul(decimals),
            minInfusionAmount: BigNumber.from(realm.minTokenInfusionAmount || 0).mul(decimals),
            maxInfusionAmount: BigNumber.from(realm.maxTokenInfusionAmount || 0).mul(decimals),
            maxTokenBalance: BigNumber.from(realm.maxInfusibleTokens || 0).mul(decimals),
            requireNftIsOwned: realm.requireOwnership === 'yes',
            allowMultiInfuse: realm.allowMultiInfusion === 'yes',
            allowPublicInfusion: false,
            allowAllCollections: true,
          },
        },
      });
    },
    [hypervibesContract, erc20Contract]
  );

  return {
    realm,
    updateRealm: (fields: Realm) => updateRealm({ ...realm, ...fields }),
    createRealm,
    resetRealm: () => updateRealm(initialState.realmWizard),
  };
};
