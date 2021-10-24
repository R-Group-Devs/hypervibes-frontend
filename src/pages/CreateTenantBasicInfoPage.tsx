import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import useCreateTenant from '../hooks/useCreateTenant';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import MultiInput from '../components/MultiInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { register, control, formState, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      admins: [''],
    },
  });

  const { tenant, updateTenant } = useCreateTenant();

  const onSubmit = handleSubmit((data) => {
    updateTenant(data);
    history.push('select-collections');
  });

  useEffect(() => {
    console.log('step 1', tenant);
  }, [tenant]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="name"
        label="Name"
        required
        maxLength={30}
        register={register}
        errors={formState.errors}
      />
      <Textarea
        name="description"
        label="Description"
        required
        maxLength={150}
        register={register}
        errors={formState.errors}
      />
      <MultiInput
        name="admins"
        label="Admins"
        register={register}
        control={control}
        errors={formState.errors}
      />

      <SubmitButton>Next</SubmitButton>
    </form>
  );
};
