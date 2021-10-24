import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import useCreateTenant from '../hooks/useCreateTenant';
import NumberInput from '../components/NumberInput';
import RadioGroup from '../components/RadioGroup';
import RadioButton from '../components/RadioButton';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { register, formState, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      minClaimableTokenRate: null,
      maxClaimableTokenRate: null,
      minTokenInfusionAmount: null,
      maxTokenInfusionAmount: null,
      maxInfusibleTokens: null,
      requireOwnership: 'no',
      allowMultiInfusion: 'yes',
    },
  });

  const { tenant, updateTenant } = useCreateTenant();

  const onSubmit = handleSubmit((data) => {
    updateTenant(data);
    history.push('success');
  });

  useEffect(() => {
    console.log('step 4', tenant);
  }, [tenant]);

  return (
    <form onSubmit={onSubmit}>
      <NumberInput
        name="minClaimableTokenRate"
        label="Minimum Claimable Token Rate"
        required
        register={register}
        errors={formState.errors}
      />

      <NumberInput
        name="maxClaimableTokenRate"
        label="Maximum Claimable Token Rate"
        required
        register={register}
        errors={formState.errors}
      />

      <NumberInput
        name="minTokenInfusionAmount"
        label="Minimum Token Infusion Amount"
        required
        register={register}
        errors={formState.errors}
      />

      <NumberInput
        name="maxTokenInfusionAmount"
        label="Maximum Token Infusion Amount"
        required
        register={register}
        errors={formState.errors}
      />

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

      <SubmitButton>Next</SubmitButton>
    </form>
  );
};
