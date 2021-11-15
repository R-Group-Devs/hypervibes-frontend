import { useForm, FormProvider } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import ClaimTokensContainer from '../components/ClaimTokensContainer';
import FormHeading from '../components/FormHeading';
import Card from '../components/Card';
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

export default () => {
  const methods = useForm<FormValues>();
  const { realmId } = useParams<Params>();
  const history = useHistory();
  const {
    data: { infusedNfts },
  } = useMyInfusedNfts();

  const infusedNftsInCurrentRealm = infusedNfts?.filter(nft =>
    nft.infusions.find(infusion => infusion.realm.id === realmId)
  );

  const onSubmit = methods.handleSubmit(data => {
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
        </form>
      </FormProvider>
    </ClaimTokensContainer>
  );
};
