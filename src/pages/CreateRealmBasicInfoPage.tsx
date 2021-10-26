import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, { Realm } from '../hooks/useCreateRealmWizard';
import TextInput from '../components/TextInput';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<Realm>({ defaultValues: realm });
  const history = useHistory();

  const onSubmit = methods.handleSubmit((data) => {
    updateRealm(data);
    history.push('select-collections');
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <TextInput name="name" label="Name" required maxLength={30} />
        <TextInput name="description" label="Description" required maxLength={150} />
        <MultiAddressInput name="admins" label="Admin(s)" />

        <SubmitButton>Next</SubmitButton>
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
};
