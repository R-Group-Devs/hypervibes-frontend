import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import useCreateTenant from '../hooks/useCreateTenant';
import TextInput from '../components/TextInput';
import MultiInput from '../components/MultiInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { tenant, updateTenant } = useCreateTenant();

  const { register, control, formState, handleSubmit } = useForm<FieldValues>({
    defaultValues: tenant,
  });

  const onSubmit = handleSubmit((data) => {
    updateTenant(data);
    history.push('select-collections');
  });

  useEffect(() => {
    console.log('step 1', tenant);
  }, [tenant]);

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        name="name"
        label="Name"
        required
        maxLength={30}
        register={register}
        errors={formState.errors}
      />
      <TextInput
        name="description"
        label="Description"
        required
        maxLength={150}
        register={register}
        errors={formState.errors}
      />
      <MultiInput
        name="admins"
        label="Admin(s)"
        register={register}
        control={control}
        errors={formState.errors}
      />

      <SubmitButton>Next</SubmitButton>
    </form>
  );
};
