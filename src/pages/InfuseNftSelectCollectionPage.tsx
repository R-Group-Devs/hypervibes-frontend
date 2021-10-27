import { useParams } from 'react-router-dom';
import CollectionList from '../components/CollectionList';
import useRealmCollections from '../hooks/useRealmCollections';

interface Params {
  realmId: string;
}

export default () => {
  const { realmId } = useParams<Params>();
  const { data } = useRealmCollections(realmId);

  if (!data) {
    return null;
  }

  return (
    <>
      <h2>Select Collection</h2>

      <CollectionList collections={data} />
    </>
  );
};
