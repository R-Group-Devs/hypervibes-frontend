import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import useCreateTenant from '../hooks/useCreateTenant';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import RadioGroup from '../components/RadioGroup';
import RadioButton from '../components/RadioButton';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { tenant, updateTenant, resetTenant } = useCreateTenant();

  const { register, formState, handleSubmit } = useForm<FieldValues>({
    defaultValues: tenant,
  });

  const onSubmit = handleSubmit((data) => {
    updateTenant(data);

    setTimeout(() => {
      history.push('success');
      resetTenant();
    }, 200);
  });

  useEffect(() => {
    console.log('step 4', tenant);
  }, [tenant]);

  return (
    <form onSubmit={onSubmit}>
      <InputGroup label="Claimable Token Rate">
        <NumberInput
          name="minClaimableTokenRate"
          label="Minimum"
          required
          register={register}
          errors={formState.errors}
        />

        <NumberInput
          name="maxClaimableTokenRate"
          label="Maximum"
          required
          register={register}
          errors={formState.errors}
        />
      </InputGroup>

      <InputGroup label="Token Infusion Amount">
        <NumberInput
          name="minTokenInfusionAmount"
          label="Minimum"
          required
          register={register}
          errors={formState.errors}
        />

        <NumberInput
          name="maxTokenInfusionAmount"
          label="Maximum"
          required
          register={register}
          errors={formState.errors}
        />
      </InputGroup>

      <NumberInput
        name="maxInfusibleTokens"
        label="Maximum Infusible Tokens"
        required
        register={register}
        errors={formState.errors}
      />

      <RadioGroup name="requireOwnership" label="Require NFT ownership?" errors={formState.errors}>
        <RadioButton name="requireOwnership" id="yes" label="Yes" required register={register} />
        <RadioButton name="requireOwnership" id="no" label="No" required register={register} />
      </RadioGroup>

      <RadioGroup
        name="allowMultiInfusion"
        label="Allow infusing tokens into the same NFT more than once?"
        errors={formState.errors}
      >
        <RadioButton name="allowMultiInfusion" id="yes" label="Yes" required register={register} />
        <RadioButton name="allowMultiInfusion" id="no" label="No" required register={register} />
      </RadioGroup>

      <SubmitButton>Create Tenant</SubmitButton>
    </form>
  );
};
