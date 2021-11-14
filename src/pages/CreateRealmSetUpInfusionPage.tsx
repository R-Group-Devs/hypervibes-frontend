import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, {
  RealmWizardValues,
} from '../hooks/useCreateRealmWizard';
import CreateRealmContainer from '../components/CreateRealmContainer';
import FormHeading from '../components/FormHeading';
import RadioGroup from '../components/RadioGroup';
import RadioButtonCard from '../components/RadioButtonCard';
import AddressInput from '../components/AddressInput';
import MultiAddressInput from '../components/MultiAddressInput';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import SwitchGroup from '../components/SwitchGroup';
import Switch from '../components/Switch';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { CREATE_REALM_STEPS } from '../constants/formSteps';
import heading from '../assets/images/headings/set-up-infusion.svg';
import allowAnyInfuserImage from '../assets/images/allow-any-infuser.png';
import allowAnyInfuserSelectedImage from '../assets/images/allow-any-infuser-selected.png';
import allowSpecificInfusersImage from '../assets/images/allow-specific-addresses.png';
import allowSpecificInfusersSelectedImage from '../assets/images/allow-specific-addresses-selected.png';

const Container = styled.div``;

const InfusionOptionImage = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.2s;
`;

const AllowAnyInfuser = styled(InfusionOptionImage)<{ isSelected: boolean }>`
  background-size: 70%;

  background-image: ${({ isSelected }) =>
    isSelected
      ? `url(${allowAnyInfuserSelectedImage})`
      : `url(${allowAnyInfuserImage})`};

  &:hover {
    background-image: url(${allowAnyInfuserSelectedImage});
  }
`;

const AllowSpecificInfusers = styled(InfusionOptionImage)<{
  isSelected: boolean;
}>`
  background-size: 41%;

  background-image: ${({ isSelected }) =>
    isSelected
      ? `url(${allowSpecificInfusersSelectedImage})`
      : `url(${allowSpecificInfusersImage})`};

  &:hover {
    background-image: url(${allowSpecificInfusersSelectedImage});
  }
`;

export default () => {
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<RealmWizardValues>({ defaultValues: realm });
  const allowPublicInfusion = methods.watch('allowPublicInfusion');
  const history = useHistory();

  const onSubmit = methods.handleSubmit(data => {
    updateRealm(data);
    history.push('set-up-claiming');
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <CreateRealmContainer
          name="Create Realm"
          steps={CREATE_REALM_STEPS}
          activeStep={3}
        >
          <FormHeading src={heading} alt="Set up Infusion" />
          <form onSubmit={onSubmit}>
            <AddressInput
              name="tokenAddress"
              label="Token Address"
              description="The ERC-20 contract address of the token you want to infuse."
              required
              showTokenSymbol
            />

            <RadioGroup name="allowPublicInfusion" label="">
              <RadioButtonCard
                name="allowPublicInfusion"
                id="yes"
                label="Allow anyone to infuse"
              >
                <AllowAnyInfuser isSelected={allowPublicInfusion === 'yes'} />
              </RadioButtonCard>

              <RadioButtonCard
                name="allowPublicInfusion"
                id="no"
                label="Only allow specific addresses to infuse"
              >
                <AllowSpecificInfusers
                  isSelected={allowPublicInfusion === 'no'}
                />
              </RadioButtonCard>
            </RadioGroup>

            {allowPublicInfusion === 'no' && (
              <MultiAddressInput
                name="allowedInfusers"
                label="Allowed infusers"
                addMoreText="Add more infusers"
                required
              />
            )}

            <InputGroup
              label="Minimum Token Infusion Amount"
              description="The minimum number of tokens that can be infused at one time by an infuser."
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

            <SwitchGroup
              name="requireOwnership"
              label="Require NFT ownership to infuse tokens?"
            >
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
              <BackButton path="select-collections" />
              <SubmitButton>Next</SubmitButton>
            </ButtonGroup>
          </form>
        </CreateRealmContainer>
      </FormProvider>
    </Container>
  );
};
