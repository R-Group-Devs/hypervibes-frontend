import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, { RealmWizardValues } from '../hooks/useCreateRealmWizard';
import FormContainer from '../components/FormContainer';
import FormHeading from '../components/FormHeading';
import RadioGroup from '../components/RadioGroup';
import RadioButtonCard from '../components/RadioButtonCard';
import MultiAddressInput from '../components/MultiAddressInput';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { CREATE_REALM_STEPS } from '../constants/formSteps';
import heading from '../assets/images/headings/select-collections.svg';
import infuseAnyImage from '../assets/images/infuse-any.png';
import infuseSpecificImage from '../assets/images/infuse-specific.png';

const Container = styled.div``;

export default () => {
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<RealmWizardValues>({ defaultValues: realm });
  const allowAllCollections = methods.watch('allowAllCollections');
  const history = useHistory();

  const onSubmit = methods.handleSubmit((data) => {
    updateRealm(data);
    history.push('set-up-infusion');
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <FormContainer name="Create Realm" steps={CREATE_REALM_STEPS} activeStep={2}>
          <FormHeading src={heading} alt="Select Collections" />

          <form onSubmit={onSubmit}>
            <RadioGroup name="allowAllCollections" label="">
              <RadioButtonCard
                name="allowAllCollections"
                id="yes"
                label="Allow any collection to be infused"
              >
                <img src={infuseAnyImage} alt="Infuse any" />
              </RadioButtonCard>

              <RadioButtonCard
                name="allowAllCollections"
                id="no"
                label="Only allow specific collections to be infused"
              >
                <img src={infuseSpecificImage} alt="Infuse specific" />
              </RadioButtonCard>
            </RadioGroup>

            {allowAllCollections === 'no' && (
              <MultiAddressInput
                name="allowedCollections"
                label="Allowed collections"
                addMoreText="Add more collections"
                required
              />
            )}

            <ButtonGroup>
              <BackButton path="basic-info" />
              <SubmitButton>Next</SubmitButton>
            </ButtonGroup>
          </form>

          <DevTool control={methods.control} />
        </FormContainer>
      </FormProvider>
    </Container>
  );
};
