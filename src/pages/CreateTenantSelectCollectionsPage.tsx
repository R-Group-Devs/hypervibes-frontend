import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import useCreateTenant from '../hooks/useCreateTenant';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { tenant, updateTenant } = useCreateTenant();

  const methods = useForm<FieldValues>({
    defaultValues: tenant,
  });

  const onSubmit = methods.handleSubmit((data) => {
    updateTenant(data);
    history.push('set-up-infusion');
  });

  useEffect(() => {
    console.log('step 2', tenant);
  }, [tenant]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <MultiAddressInput name="allowedCollections" label="Allowed collections" />

        <SubmitButton>Next</SubmitButton>
      </form>
    </FormProvider>
  );
};
