import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import useCreateTenant, { Tenant } from '../hooks/useCreateTenant';
import AddressInput from '../components/AddressInput';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { tenant, updateTenant } = useCreateTenant();

  const methods = useForm<Tenant>({
    defaultValues: tenant,
  });

  const onSubmit = methods.handleSubmit((data) => {
    updateTenant(data);
    history.push('advanced-settings');
  });

  useEffect(() => {
    console.log('step 3', tenant);
  }, [tenant]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <AddressInput name="tokenAddress" label="ERC-20 Token Address" required />
        <MultiAddressInput name="allowedInfusers" label="Allowed infusers" />

        <SubmitButton>Next</SubmitButton>
      </form>
    </FormProvider>
  );
};
