import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import useRealmWizard, { Realm } from '../hooks/useRealmWizard';
import TextInput from '../components/TextInput';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { realm, updateRealm } = useRealmWizard();
  const methods = useForm<Realm>({ defaultValues: realm });

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
