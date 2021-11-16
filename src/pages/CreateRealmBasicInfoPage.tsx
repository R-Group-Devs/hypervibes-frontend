import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, {
  RealmWizardValues,
} from '../hooks/useCreateRealmWizard';
import CreateRealmContainer from '../components/CreateRealmContainer';
import FormHeading from '../components/FormHeading';
import TextInput from '../components/TextInput';
import MultiAddressInput from '../components/MultiAddressInput';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { CREATE_REALM_STEPS } from '../constants/formSteps';
import heading from '../assets/images/headings/create-your-realm.svg';

const Container = styled.div``;

export default () => {
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<RealmWizardValues>({ defaultValues: realm });
  const history = useHistory();

  const onSubmit = methods.handleSubmit(data => {
    updateRealm(data);
    history.push('select-collections');
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <CreateRealmContainer
          name="Create Realm"
          steps={CREATE_REALM_STEPS}
          activeStep={1}
        >
          <FormHeading src={heading} alt="Create Your Realm" />

          <form onSubmit={onSubmit}>
            <TextInput
              name="name"
              label="Name Your Realm"
              required
              maxLength={30}
            />
            <TextInput
              name="description"
              label="Description"
              required
              maxLength={150}
            />
            <MultiAddressInput
              name="admins"
              label="Admin(s)"
              description="A list of addresses allowed to modify this realm."
              addMoreText="Add more admins"
            />

            <ButtonGroup>
              <BackButton path="/" />
              <SubmitButton>Next</SubmitButton>
            </ButtonGroup>
          </form>
        </CreateRealmContainer>
      </FormProvider>
    </Container>
  );
};
