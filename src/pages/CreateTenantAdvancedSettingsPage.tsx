import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import useCreateTenant, { Tenant } from '../hooks/useCreateTenant';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import RadioGroup from '../components/RadioGroup';
import RadioButton from '../components/RadioButton';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { tenant, updateTenant, resetTenant } = useCreateTenant();
  const methods = useForm<Tenant>({ defaultValues: tenant });

  const onSubmit = methods.handleSubmit(async (data) => {
    updateTenant(data);

    // TODO - replace with react-query mutation to call contract w/ tenant payload
    await new Promise((resolve) => setTimeout(resolve, 500));

    history.push('success');
    resetTenant();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <InputGroup label="Claimable Token Rate">
          <NumberInput name="minClaimableTokenRate" label="Minimum" required />
          <NumberInput name="maxClaimableTokenRate" label="Maximum" required />
        </InputGroup>

        <InputGroup label="Token Infusion Amount">
          <NumberInput name="minTokenInfusionAmount" label="Minimum" required />
          <NumberInput name="maxTokenInfusionAmount" label="Maximum" required />
        </InputGroup>

        <NumberInput name="maxInfusibleTokens" label="Maximum Infusible Tokens" required />

        <RadioGroup name="requireOwnership" label="Require NFT ownership?">
          <RadioButton name="requireOwnership" id="yes" label="Yes" required />
          <RadioButton name="requireOwnership" id="no" label="No" required />
        </RadioGroup>

        <RadioGroup
          name="allowMultiInfusion"
          label="Allow infusing tokens into the same NFT more than once?"
        >
          <RadioButton name="allowMultiInfusion" id="yes" label="Yes" required />
          <RadioButton name="allowMultiInfusion" id="no" label="No" required />
        </RadioGroup>

        <SubmitButton>Create Tenant</SubmitButton>
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
};
