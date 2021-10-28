import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, { RealmWizardValues } from '../hooks/useCreateRealmWizard';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import RadioGroup from '../components/RadioGroup';
import RadioButton from '../components/RadioButton';
import SubmitButton from '../components/SubmitButton';

const Container = styled.div``;

export default () => {
  const { realm, updateRealm, createRealm, resetRealm } = useCreateRealmWizard();
  const methods = useForm<RealmWizardValues>({ defaultValues: realm });
  const history = useHistory();

  const onSubmit = methods.handleSubmit(async (data) => {
    updateRealm(data);

    // TODO - move this logic to a `useEffect` block that fires on `realm` dependency change
    // check if all `realm` data is valid
    // if invalid, highlight wizard steps which contain invalid inputs
    // if valid, persist `realm` to contract
    await createRealm({ ...realm, ...data });

    // TODO - listen for confirmed transaction in new blocks before showing success message
    history.push('success');
    resetRealm();
  });

  return (
    <Container>
      <h2>Configure Settings</h2>

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
    </Container>
  );
};
