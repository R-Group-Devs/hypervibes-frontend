import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import useCreateTenant from '../hooks/useCreateTenant';
import Input from '../components/Input';
import MultiInput from '../components/MultiInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { register, control, formState, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      tokenAddress: '',
      allowedInfusers: [''],
    },
  });

  const { tenant, updateTenant } = useCreateTenant();

  const onSubmit = handleSubmit((data) => {
    updateTenant(data);
    history.push('advanced-settings');
  });

  useEffect(() => {
    console.log('step 3', tenant);
  }, [tenant]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="tokenAddress"
        label="ERC-20 Token Address"
        required
        register={register}
        errors={formState.errors}
      />

      <MultiInput
        name="allowedInfusers"
        label="Allowed infusers"
        register={register}
        control={control}
        errors={formState.errors}
      />

      <SubmitButton>Next</SubmitButton>
    </form>
  );
};
