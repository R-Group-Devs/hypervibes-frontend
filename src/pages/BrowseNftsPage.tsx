import { useParams } from 'react-router';
import styled from 'styled-components';
import { NETWORKS } from '../constants/contracts';
import useListRealmNfts from '../hooks/useListRealmNfts';
import useMetadata from '../hooks/useMetadata';
import NftGalleryCard from '../components/NftGalleryCard';

interface Params {
  network: string;
  realmId: string;
}

const Container = styled.div``;

const PageHeading = styled.h1`
  text-align: center;
`;

export default () => {
  const { network, realmId } = useParams<Params>();
  const { data, isLoading, isError } = useListRealmNfts(
    realmId,
    NETWORKS[network]
  );

  const chainId = NETWORKS[network];
  if (chainId == null) {
    return <p>invalid network</p>;
  }

  if (isLoading) {
    return <p>loading realm nfts...</p>;
  }

  if (isError) {
    return <p>error fetching nfts</p>;
  }

  if (data == null) {
    return null;
  }

  return (
    <Container>
      <PageHeading>{data.realm.name}</PageHeading>

      {data.realm.infusions.map(infusion => (
        <NftGalleryCard
          key={infusion.id}
          url={`/${network}/tokens/${infusion.nft.collection.address}/${infusion.nft.tokenId}`}
          tokenUri={infusion.nft.tokenUri}
        />
      ))}
    </Container>
  );
};
