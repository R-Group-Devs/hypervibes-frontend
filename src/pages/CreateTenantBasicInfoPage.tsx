import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import useCreateTenant, { Tenant } from '../hooks/useCreateTenant';
import TextInput from '../components/TextInput';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { tenant, updateTenant } = useCreateTenant();
  const methods = useForm<Tenant>({ defaultValues: tenant });

  const onSubmit = methods.handleSubmit((data) => {
    updateTenant(data);
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
    </FormProvider>
  );
};
