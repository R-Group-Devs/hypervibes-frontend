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
import MultiAddressInput from '../components/MultiAddressInput';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { CREATE_REALM_STEPS } from '../constants/formSteps';
import heading from '../assets/images/headings/select-collections.svg';
import allowAnyCollectionImage from '../assets/images/allow-any-collection.png';
import allowAnyCollectionSelectedImage from '../assets/images/allow-any-collection-selected.png';
import allowSpecificCollectionsImage from '../assets/images/allow-specific-collections.png';
import allowSpecificCollectionsSelectedImage from '../assets/images/allow-specific-collections-selected.png';

const Container = styled.div``;

const CollectionOptionImage = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.2s;
`;

const AllowAnyCollection = styled(CollectionOptionImage)<{
  isSelected: boolean;
}>`
  background-size: 45%;

  background-image: ${({ isSelected }) =>
    isSelected
      ? `url(${allowAnyCollectionSelectedImage})`
      : `url(${allowAnyCollectionImage})`};

  &:hover {
    background-image: url(${allowAnyCollectionSelectedImage});
  }
`;

const AllowSpecificCollections = styled(CollectionOptionImage)<{
  isSelected: boolean;
}>`
  background-size: 23%;

  background-image: ${({ isSelected }) =>
    isSelected
      ? `url(${allowSpecificCollectionsSelectedImage})`
      : `url(${allowSpecificCollectionsImage})`};

  &:hover {
    background-image: url(${allowSpecificCollectionsSelectedImage});
  }
`;

export default () => {
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<RealmWizardValues>({ defaultValues: realm });
  const allowAllCollections = methods.watch('allowAllCollections');
  const history = useHistory();

  const onSubmit = methods.handleSubmit(data => {
    updateRealm(data);
    history.push('set-up-infusion');
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <CreateRealmContainer
          name="Create Realm"
          steps={CREATE_REALM_STEPS}
          activeStep={2}
        >
          <FormHeading src={heading} alt="Select Collections" />

          <form onSubmit={onSubmit}>
            <RadioGroup name="allowAllCollections" label="">
              <RadioButtonCard
                name="allowAllCollections"
                id="yes"
                label="Allow any collection to be infused"
              >
                <AllowAnyCollection
                  isSelected={allowAllCollections === 'yes'}
                />
              </RadioButtonCard>

              <RadioButtonCard
                name="allowAllCollections"
                id="no"
                label="Only allow specific collections to be infused"
              >
                <AllowSpecificCollections
                  isSelected={allowAllCollections === 'no'}
                />
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
        </CreateRealmContainer>
      </FormProvider>
    </Container>
  );
};
