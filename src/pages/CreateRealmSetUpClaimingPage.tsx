import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, {
  RealmWizardValues,
} from '../hooks/useCreateRealmWizard';
import CreateRealmContainer from '../components/CreateRealmContainer';
import FormHeading from '../components/FormHeading';
import RadioGroup from '../components/RadioGroup';
import RadioButtonCard from '../components/RadioButtonCard';
import InputGroup from '../components/InputGroup';
import MultiAddressInput from '../components/MultiAddressInput';
import NumberInput from '../components/NumberInput';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { CREATE_REALM_STEPS } from '../constants/formSteps';
import heading from '../assets/images/headings/set-up-claiming.svg';
import allowAnyClaimerImage from '../assets/images/allow-any-claimer.png';
import allowAnyClaimerSelectedImage from '../assets/images/allow-any-claimer-selected.png';
import allowSpecificClaimersImage from '../assets/images/allow-specific-addresses.png';
import allowSpecificClaimersSelectedImage from '../assets/images/allow-specific-addresses-selected.png';

const Container = styled.div``;

const ClaimerOptionImage = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.2s;
`;

const AllowAnyClaimer = styled(ClaimerOptionImage)<{ isSelected: boolean }>`
  background-size: 78%;

  background-image: ${({ isSelected }) =>
    isSelected
      ? `url(${allowAnyClaimerSelectedImage})`
      : `url(${allowAnyClaimerImage})`};

  &:hover {
    background-image: url(${allowAnyClaimerSelectedImage});
  }
`;

const AllowSpecificClaimers = styled(ClaimerOptionImage)<{
  isSelected: boolean;
}>`
  background-size: 41%;

  background-image: ${({ isSelected }) =>
    isSelected
      ? `url(${allowSpecificClaimersSelectedImage})`
      : `url(${allowSpecificClaimersImage})`};

  &:hover {
    background-image: url(${allowSpecificClaimersSelectedImage});
  }
`;

export default () => {
  const { realm, updateRealm, createRealm, resetRealm } =
    useCreateRealmWizard();
  const methods = useForm<RealmWizardValues>({ defaultValues: realm });
  const allowPublicClaiming = methods.watch('allowPublicClaiming');
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
        <CreateRealmContainer
          name="Create Realm"
          steps={CREATE_REALM_STEPS}
          activeStep={4}
        >
          <FormHeading src={heading} alt="Set up Claiming" />
          <form onSubmit={onSubmit}>
            <RadioGroup name="allowPublicClaiming" label="">
              <RadioButtonCard
                name="allowPublicClaiming"
                id="yes"
                label="Allow anyone to claim"
              >
                <AllowAnyClaimer isSelected={allowPublicClaiming === 'yes'} />
              </RadioButtonCard>

              <RadioButtonCard
                name="allowPublicClaiming"
                id="no"
                label="Only allow specific addresses to claim"
              >
                <AllowSpecificClaimers
                  isSelected={allowPublicClaiming === 'no'}
                />
              </RadioButtonCard>
            </RadioGroup>

            {allowPublicClaiming === 'no' && (
              <MultiAddressInput
                name="allowedClaimers"
                label="Allowed claimers"
                addMoreText="Add more claimers"
                required
              />
            )}

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
              <NumberInput
                name="minClaimAmount"
                label="Minimum"
                required
                validate={value =>
                  value <= (realm?.maxInfusibleTokens || 0) ||
                  'Must be less than or equal to maximum infusible tokens defined in the Set up Infusion step.'
                }
              />
            </InputGroup>

            <ButtonGroup>
              <BackButton path="set-up-infusion" />
              <SubmitButton size="lg">Create Realm</SubmitButton>
            </ButtonGroup>
          </form>

          <DevTool control={methods.control} />
        </CreateRealmContainer>
      </FormProvider>
    </Container>
  );
};
