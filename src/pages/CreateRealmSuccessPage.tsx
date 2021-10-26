import { useEffect } from 'react';
import useCreateRealmWizard from '../hooks/useCreateRealmWizard';

export default () => {
  const { realm } = useCreateRealmWizard();

  useEffect(() => {
    console.log('done', realm);
  }, [realm]);

  return <h2>realm created.</h2>;
};
