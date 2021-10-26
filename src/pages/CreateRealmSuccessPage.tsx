import { useEffect } from 'react';
import useRealmWizard from '../hooks/useRealmWizard';

export default () => {
  const { realm } = useRealmWizard();

  useEffect(() => {
    console.log('done', realm);
  }, [realm]);

  return <h2>realm created.</h2>;
};
