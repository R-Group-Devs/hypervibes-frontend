import RealmList from '../components/RealmList';
import useRealms from '../hooks/useRealms';

export default () => {
  const { data } = useRealms();

  if (!data) {
    return null;
  }

  return (
    <>
      <h2>Select Realm</h2>

      <RealmList realms={data} />
    </>
  );
};
