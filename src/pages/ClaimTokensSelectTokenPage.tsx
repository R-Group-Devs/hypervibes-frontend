import { useState } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory, useParams } from 'react-router-dom';
import ClaimTokensContainer from '../components/ClaimTokensContainer';
import FormHeading from '../components/FormHeading';
import Card from '../components/Card';
import SubmitButton from '../components/SubmitButton';
import useErc721OwnerOf from '../hooks/useErc721OwnerOf';
import useMyInfusedNfts from '../hooks/useMyInfusedNfts';
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
  const { realmId, collection } = useParams<Params>();
  const history = useHistory();
  const tokenId = methods.watch('tokenId');
  const ownerOf = useErc721OwnerOf(collection, tokenId);
  const {
    data: { infusedNfts },
  } = useMyInfusedNfts();
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const infusedNftsInCurrentRealm = infusedNfts?.filter(nft =>
    nft.infusions.find(infusion => infusion.realm.id === realmId)
  );

  console.log(infusedNftsInCurrentRealm);

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

      {infusedNftsInCurrentRealm?.length === 0 && (
        <>You own no infused NFTs in this realm.</>
      )}

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          {infusedNftsInCurrentRealm?.map(nft => (
            <Card
              key={nft.tokenId}
              name={nft.tokenId}
              url={`collection/${nft.collection.address}/token/${nft.tokenId}`}
            />
          ))}

          {formErrors.length > 0 && (
            <FormErrors>
              {formErrors.map(formError => (
                <li key={formError}>{formError}</li>
              ))}
            </FormErrors>
          )}

          {infusedNftsInCurrentRealm?.length > 0 && (
            <SubmitButton>Next</SubmitButton>
          )}
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </ClaimTokensContainer>
  );
};
