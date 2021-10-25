import { createGlobalState } from 'react-hooks-global-state';

export interface Tenant {
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

const initialState: Record<'tenant', Tenant> = {
  tenant: {
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
  const [tenant, updateTenant] = useGlobalState('tenant');

  return {
    tenant,
    updateTenant: (fields: Tenant) => updateTenant({ ...tenant, ...fields }),
    resetTenant: () => updateTenant(initialState.tenant),
  };
};
