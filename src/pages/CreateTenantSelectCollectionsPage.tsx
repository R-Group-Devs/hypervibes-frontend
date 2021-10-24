import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import useCreateTenant, { Tenant } from '../hooks/useCreateTenant';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { tenant, updateTenant } = useCreateTenant();
  const methods = useForm<Tenant>({ defaultValues: tenant });

  const onSubmit = methods.handleSubmit((data) => {
    updateTenant(data);
    history.push('set-up-infusion');
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <MultiAddressInput name="allowedCollections" label="Allowed collections" />

        <SubmitButton>Next</SubmitButton>
      </form>
    </FormProvider>
  );
};
