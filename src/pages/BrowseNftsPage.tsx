import { useParams } from 'react-router';
import styled from 'styled-components';
import { BigNumber } from 'ethers';
import { NETWORKS } from '../constants/contracts';
import useListRealmNfts from '../hooks/useListRealmNfts';
import BannerPageHeading from '../components/BannerPageHeading';
import NftGalleryCard from '../components/NftGalleryCard';

interface Params {
  network: string;
  realmId: string;
}

const Container = styled.div``;

const NftList = styled.div`
  margin-top: 210px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

export default () => {
  const { network, realmId } = useParams<Params>();
  const chainId = NETWORKS[network];
  const { data, isLoading, isError } = useListRealmNfts(realmId, chainId);

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
      <BannerPageHeading
        name={data.realm.name}
        tokenUri={data.realm.infusions[0]?.nft.tokenUri}
      />

      <NftList>
        {data.realm.infusions.map(infusion => (
          <NftGalleryCard
            key={infusion.id}
            url={`/${network}/tokens/${infusion.nft.collection.address}/${infusion.nft.tokenId}`}
            chainId={chainId}
            realmId={BigNumber.from(realmId)}
            collection={infusion.nft.collection.address}
            tokenId={BigNumber.from(infusion.nft.tokenId)}
            tokenUri={infusion.nft.tokenUri}
            size="lg"
          />
        ))}
      </NftList>
    </Container>
  );
};
