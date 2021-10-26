import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import useCreateRealmWizard, { Realm } from '../hooks/useCreateRealmWizard';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<Realm>({ defaultValues: realm });

  const onSubmit = methods.handleSubmit((data) => {
    updateRealm(data);
    history.push('set-up-infusion');
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <MultiAddressInput name="allowedCollections" label="Allowed collections" />

        <SubmitButton>Next</SubmitButton>
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
};
