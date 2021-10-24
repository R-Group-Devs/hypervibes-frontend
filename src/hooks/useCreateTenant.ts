import { createGlobalState } from 'react-hooks-global-state';

export default () => {
  const initialState = { tenant: {} };
  const { useGlobalState } = createGlobalState(initialState);
  const [tenant, updateTenant] = useGlobalState('tenant');

  return {
    tenant,
    updateTenant: (fields: Record<string, any>) => updateTenant({ ...tenant, ...fields }),
  };
};
