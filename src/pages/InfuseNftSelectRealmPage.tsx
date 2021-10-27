import RealmList from '../components/RealmList';
import useMyInfusibleRealms from '../hooks/useMyInfusibleRealms';

export default () => {
  const { data } = useMyInfusibleRealms();

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
