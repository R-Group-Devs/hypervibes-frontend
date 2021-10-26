import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import useRealmWizard, { Realm } from '../hooks/useRealmWizard';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import RadioGroup from '../components/RadioGroup';
import RadioButton from '../components/RadioButton';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const history = useHistory();
  const { realm, updateRealm, createRealm, resetRealm } = useRealmWizard();
  const methods = useForm<Realm>({ defaultValues: realm });

  const onSubmit = methods.handleSubmit(async (data) => {
    updateRealm(data);

    await createRealm({
      name: realm.name,
      description: realm.description,
      admins: realm.admins.map((x) => x.value),
      infusers: realm.allowedInfusers.map((x) => x.value),
      collections: realm.allowedCollections.map((x) => x.value),
      config: {
        token: realm.tokenAddress,
        constraints: {
          minDailyRate: (realm.minClaimableTokenRate || 0) * 1e18,
          imaxDailyRate: (realm.maxClaimableTokenRate || 0) * 1e18,
          minInfusionAmount: (realm.minTokenInfusionAmount || 0) * 1e18,
          imaxInfusionAmount: (realm.maxTokenInfusionAmount || 0) * 1e18,
          imaxTokenBalance: (realm.maxInfusibleTokens || 0) * 1e18,
          requireOwnedNft: realm.requireOwnership === 'yes',
          disableMultiInfuse: realm.allowMultiInfusion === 'no',
          requireInfusionWhitelist: true,
          requireCollectionWhitelist: true,
        },
      },
    });

    history.push('success');
    resetRealm();
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
