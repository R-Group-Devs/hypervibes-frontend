import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, {
  RealmWizardValues,
} from '../hooks/useCreateRealmWizard';
import FormContainer from '../components/FormContainer';
import FormHeading from '../components/FormHeading';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import SwitchGroup from '../components/SwitchGroup';
import Switch from '../components/Switch';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { CREATE_REALM_STEPS } from '../constants/formSteps';
import heading from '../assets/images/headings/advanced-settings.svg';

const Container = styled.div``;

export default () => {
  const { realm, updateRealm, createRealm, resetRealm } =
    useCreateRealmWizard();
  const methods = useForm<RealmWizardValues>({ defaultValues: realm });
  const history = useHistory();

  const onSubmit = methods.handleSubmit(async data => {
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
      <FormProvider {...methods}>
        <FormContainer
          name="Create Realm"
          steps={CREATE_REALM_STEPS}
          activeStep={4}
        >
          <FormHeading src={heading} alt="Select Collections" />
          <form onSubmit={onSubmit}>
            <InputGroup
              label="Token Infusion Amount"
              description="The minimum and maximum number of tokens that can be infused at one time by an infuser."
            >
              <NumberInput
                name="minTokenInfusionAmount"
                label="Minimum"
                required
              />
            </InputGroup>

            <InputGroup
              label="Maximum Infusible Tokens"
              description="The maximum number of tokens that can be infused in total into an NFT."
            >
              <NumberInput name="maxInfusibleTokens" label="Maximum" required />
            </InputGroup>

            <InputGroup
              label="Claimable Token Rate"
              description="The daily rate that infused tokens are made claimable by the NFT holder."
            >
              <NumberInput
                name="claimableTokenRate"
                label="Daily Rate"
                required
              />
            </InputGroup>

            <InputGroup
              label="Minimum Claimable Token Amount"
              description="The minimum number of tokens that can be claimed at one time by an NFT holder."
            >
              <NumberInput name="minClaimAmount" label="Minimum" required />
            </InputGroup>

            <SwitchGroup name="requireOwnership" label="Require NFT ownership?">
              <Switch name="requireOwnership" id="yes" label="Yes" />
              <Switch name="requireOwnership" id="no" label="No" />
            </SwitchGroup>

            <SwitchGroup
              name="allowMultiInfusion"
              label="Allow infusing tokens into the same NFT more than once?"
            >
              <Switch name="allowMultiInfusion" id="yes" label="Yes" />
              <Switch name="allowMultiInfusion" id="no" label="No" />
            </SwitchGroup>

            <ButtonGroup>
              <BackButton path="set-up-infusion" />
              <SubmitButton size="lg">Create Realm</SubmitButton>
            </ButtonGroup>
          </form>

          <DevTool control={methods.control} />
        </FormContainer>
      </FormProvider>
    </Container>
  );
};
