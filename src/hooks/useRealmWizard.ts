import { createGlobalState } from 'react-hooks-global-state';
import useHypervibesContract from './useHypervibesContract';

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
  const { createRealm } = useHypervibesContract();

  return {
    realm,
    updateRealm: (fields: Realm) => updateRealm({ ...realm, ...fields }),
    createRealm,
    resetRealm: () => updateRealm(initialState.realmWizard),
  };
};
