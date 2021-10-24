import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  tenant: {
    name: '',
    description: '',
    admins: [''],
    allowedCollections: [''],
    tokenAddress: '',
    allowedInfusers: [''],
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
    updateTenant: (fields: Record<string, any>) => updateTenant({ ...tenant, ...fields }),
    resetTenant: () => updateTenant(initialState.tenant),
  };
};
