import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory, useParams } from 'react-router-dom';
import CollectionList from '../components/CollectionList';
import useRealmCollections from '../hooks/useRealmCollections';
import AddressInput from '../components/AddressInput';
import SubmitButton from '../components/SubmitButton';

interface FormValues {
  collectionAddress: string;
}

interface Params {
  realmId: string;
}

export default () => {
  const methods = useForm<FormValues>();
  const { realmId } = useParams<Params>();
  const history = useHistory();
  const { data } = useRealmCollections(realmId);

  if (!data) {
    return null;
  }

  const onSubmit = methods.handleSubmit(data => {
    history.push(`collection/${data.collectionAddress}/select-token`);
  });

  return (
    <>
      <h2>Select Collection</h2>

      {data.allowAllCollections ? (
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <AddressInput
              name="collectionAddress"
              label="Collection Address"
              required
            />

            <SubmitButton>Next</SubmitButton>
          </form>

          <DevTool control={methods.control} />
        </FormProvider>
      ) : (
        <CollectionList collections={data.collections} />
      )}
    </>
  );
};
