import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, { RealmWizardValues } from '../hooks/useCreateRealmWizard';
import useErc20TokenDetails from '../hooks/useErc20TokenDetails';
import FormContainer from '../components/FormContainer';
import FormHeading from '../components/FormHeading';
import RadioGroup from '../components/RadioGroup';
import RadioButtonCard from '../components/RadioButtonCard';
import AddressInput from '../components/AddressInput';
import MultiAddressInput from '../components/MultiAddressInput';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { CREATE_REALM_STEPS } from '../constants/formSteps';
import heading from '../assets/images/headings/set-up-infusion.svg';
import allowAnyInfuserImage from '../assets/images/allow-any-infuser.svg';
import infuseSpecificImage from '../assets/images/infuse-specific.svg';

const Container = styled.div`
  position: relative;
`;

const TokenSymbol = styled.div`
  position: absolute;
  top: 7.5em;
  right: 8em;
`;

export default () => {
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<RealmWizardValues>({ defaultValues: realm });
  const allowPublicInfusion = methods.watch('allowPublicInfusion');
  const tokenAddress = methods.watch('tokenAddress');
  const { symbol } = useErc20TokenDetails(tokenAddress);
  const history = useHistory();

  const onSubmit = methods.handleSubmit((data) => {
    updateRealm(data);
    history.push('advanced-settings');
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <FormContainer steps={CREATE_REALM_STEPS} activeStep={3}>
          <FormHeading src={heading} alt="Select Collections" />
          <form onSubmit={onSubmit}>
            <AddressInput name="tokenAddress" label="ERC-20 Token Address" required />
            <TokenSymbol>{symbol}</TokenSymbol>

            <RadioGroup name="allowPublicInfusion" label="">
              <RadioButtonCard name="allowPublicInfusion" id="yes" label="Allow anyone to infuse">
                <img src={allowAnyInfuserImage} alt="Infuse any" />
              </RadioButtonCard>

              <RadioButtonCard
                name="allowPublicInfusion"
                id="no"
                label="Only allow specific addresses to infuse"
              >
                <img src={infuseSpecificImage} alt="Infuse specific" />
              </RadioButtonCard>
            </RadioGroup>

            {allowPublicInfusion === 'no' && (
              <MultiAddressInput name="allowedInfusers" label="Allowed infusers" required />
            )}

            <ButtonGroup>
              <BackButton path="select-collections" />
              <SubmitButton>Next</SubmitButton>
            </ButtonGroup>
          </form>

          <DevTool control={methods.control} />
        </FormContainer>
      </FormProvider>
    </Container>
  );
};
