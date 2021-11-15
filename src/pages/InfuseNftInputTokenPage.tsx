import { useState } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import InfuseNftContainer from '../components/InfuseNftContainer';
import FormHeading from '../components/FormHeading';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import { useLazyErc721OwnerOf } from '../hooks/useErc721OwnerOf';
import heading from '../assets/images/headings/select-nft.svg';

interface FormValues {
  tokenId: string;
}

interface Params {
  realmId: string;
  collection: string;
}

const FormErrors = styled.ul`
  margin-top: 2em;
  margin-bottom: 3em;
`;

export default () => {
  const methods = useForm<FormValues>();
  const history = useHistory();
  const { realmId, collection } = useParams<Params>();
  const getErc721OwnerOf = useLazyErc721OwnerOf(collection);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const onSubmit = methods.handleSubmit(async data => {
    try {
      const ownerOf = await getErc721OwnerOf(data.tokenId);

      if (!ownerOf) {
        throw new Error();
      }
    } catch (e) {
      setFormErrors([...formErrors, 'Enter a valid token ID.']);

      return false;
    }

    history.push(`token/${data.tokenId}`);
  });

  return (
    <InfuseNftContainer name="Infusion Chamber">
      <FormHeading src={heading} alt="Select NFT" />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <InputGroup
            label="NFT Token ID"
            description="The token ID of the NFT in the collection."
          >
            <NumberInput name="tokenId" label="Token ID" required />
          </InputGroup>

          {formErrors.length > 0 && (
            <FormErrors>
              {formErrors.map(formError => (
                <li key={formError}>{formError}</li>
              ))}
            </FormErrors>
          )}

          <ButtonGroup>
            <BackButton path="../../select-collection" />
            <SubmitButton>Next</SubmitButton>
          </ButtonGroup>
        </form>
      </FormProvider>
    </InfuseNftContainer>
  );
};
