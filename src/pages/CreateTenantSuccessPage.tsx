import { useEffect } from 'react';
import useCreateTenant from '../hooks/useCreateTenant';

export default () => {
  const { tenant } = useCreateTenant();

  useEffect(() => {
    console.log('done', tenant);
  }, [tenant]);

  return <h2>tenant created.</h2>;
};
