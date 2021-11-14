import { useState } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory, useParams } from 'react-router-dom';
import ClaimTokensContainer from '../components/ClaimTokensContainer';
import FormHeading from '../components/FormHeading';
import NumberInput from '../components/NumberInput';
import SubmitButton from '../components/SubmitButton';
import useErc721OwnerOf from '../hooks/useErc721OwnerOf';
import heading from '../assets/images/headings/select-nft.svg';

interface FormValues {
  tokenId: string;
}

interface Params {
  realmId: string;
  collection: string;
  tokenId: string;
}

const FormErrors = styled.ul`
  margin-top: 2em;
  margin-bottom: 3em;
`;

export default () => {
  const methods = useForm<FormValues>();
  const { collection } = useParams<Params>();
  const history = useHistory();
  const tokenId = methods.watch('tokenId');
  const ownerOf = useErc721OwnerOf(collection, tokenId);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const onSubmit = methods.handleSubmit(data => {
    if (!ownerOf) {
      setFormErrors([...formErrors, 'Enter a valid token ID.']);

      return false;
    }

    history.push(`token/${data.tokenId}`);
  });

  return (
    <ClaimTokensContainer name="Claim Goods">
      <FormHeading src={heading} alt="Select NFT" />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <NumberInput name="tokenId" label="Token ID" required />

          {formErrors.length > 0 && (
            <FormErrors>
              {formErrors.map(formError => (
                <li key={formError}>{formError}</li>
              ))}
            </FormErrors>
          )}

          <SubmitButton>Next</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </ClaimTokensContainer>
  );
};
