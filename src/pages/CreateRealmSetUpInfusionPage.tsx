import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import useRealmWizard, { Realm } from '../hooks/useRealmWizard';
import AddressInput from '../components/AddressInput';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { realm, updateRealm } = useRealmWizard();
  const methods = useForm<Realm>({ defaultValues: realm });

  const onSubmit = methods.handleSubmit((data) => {
    updateRealm(data);
    history.push('advanced-settings');
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <AddressInput name="tokenAddress" label="ERC-20 Token Address" required />
        <MultiAddressInput name="allowedInfusers" label="Allowed infusers" />

        <SubmitButton>Next</SubmitButton>
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
};
