import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import useCreateTenant from '../hooks/useCreateTenant';
import MultiInput from '../components/MultiInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { register, control, formState, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      allowedCollections: [''],
    },
  });

  const { tenant, updateTenant } = useCreateTenant();

  const onSubmit = handleSubmit((data) => {
    updateTenant(data);
    history.push('set-up-infusion');
  });

  useEffect(() => {
    console.log('step 2', tenant);
  }, [tenant]);

  return (
    <form onSubmit={onSubmit}>
      <MultiInput
        name="allowedCollections"
        label="Allowed collections"
        register={register}
        control={control}
        errors={formState.errors}
      />

      <SubmitButton>Next</SubmitButton>
    </form>
  );
};
