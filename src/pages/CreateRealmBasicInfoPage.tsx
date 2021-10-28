import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, { RealmWizardValues } from '../hooks/useCreateRealmWizard';
import FormContainer from '../components/FormContainer';
import TextInput from '../components/TextInput';
import MultiAddressInput from '../components/MultiAddressInput';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import heading from '../assets/images/headings/create-your-realm.svg';

const Container = styled.div``;

const PageHeading = styled.img`
  margin-bottom: 3em;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 4em;
  margin-top: 3em;
`;

export default () => {
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<RealmWizardValues>({ defaultValues: realm });
  const history = useHistory();

  const onSubmit = methods.handleSubmit((data) => {
    updateRealm(data);
    history.push('select-collections');
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <FormContainer
          steps={['Basic Info', 'Select Collections', 'Set up Infusion', 'Configure Settings']}
          activeStep={1}
        >
          <PageHeading src={heading} alt="Choose Your Path" />

          <form onSubmit={onSubmit}>
            <TextInput name="name" label="Name Your Realm" required maxLength={30} />
            <TextInput name="description" label="Description" required maxLength={150} />
            <MultiAddressInput
              name="admins"
              label="Admin(s)"
              description="A list of addresses and ENS names with permission to configure this realm"
              addMoreText="Add more admins"
            />

            <ButtonGroup>
              <BackButton path="/app" />
              <SubmitButton>Next</SubmitButton>
            </ButtonGroup>
          </form>
        </FormContainer>

        <DevTool control={methods.control} />
      </FormProvider>
    </Container>
  );
};
