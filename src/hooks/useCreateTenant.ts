import { createGlobalState } from 'react-hooks-global-state';

const initialState = { tenant: {} };
const { useGlobalState } = createGlobalState(initialState);

export default () => {
  const [tenant, updateTenant] = useGlobalState('tenant');

  return {
    tenant,
    updateTenant: (fields: Record<string, any>) => updateTenant({ ...tenant, ...fields }),
  };
};
