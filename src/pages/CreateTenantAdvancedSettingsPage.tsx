import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import useCreateTenant, { Tenant } from '../hooks/useCreateTenant';
import useHypervibesContract from '../hooks/useHypervibesContract';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import RadioGroup from '../components/RadioGroup';
import RadioButton from '../components/RadioButton';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { tenant, updateTenant, resetTenant } = useCreateTenant();
  const { createTenant } = useHypervibesContract();
  const methods = useForm<Tenant>({ defaultValues: tenant });

  const onSubmit = methods.handleSubmit(async (data) => {
    updateTenant(data);

    createTenant({
      name: tenant.name,
      description: tenant.description,
      admins: tenant.admins.map((x) => x.value),
      infusers: tenant.allowedInfusers.map((x) => x.value),
      collections: tenant.allowedCollections.map((x) => x.value),
      config: {
        token: tenant.tokenAddress,
        constraints: {
          minDailyRate: (tenant.minClaimableTokenRate || 0) * 1e18,
          imaxDailyRate: (tenant.maxClaimableTokenRate || 0) * 1e18,
          minInfusionAmount: (tenant.minTokenInfusionAmount || 0) * 1e18,
          imaxInfusionAmount: (tenant.maxTokenInfusionAmount || 0) * 1e18,
          imaxTokenBalance: (tenant.maxInfusibleTokens || 0) * 1e18,
          requireOwnedNft: tenant.requireOwnership === 'yes',
          disableMultiInfuse: tenant.allowMultiInfusion === 'no',
          requireInfusionWhitelist: true,
          requireCollectionWhitelist: true,
        },
      },
    });

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

        <SubmitButton>Create Realm</SubmitButton>
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
};
