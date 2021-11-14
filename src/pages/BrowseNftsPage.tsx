import { useParams } from 'react-router';
import styled from 'styled-components';
import { NETWORKS } from '../constants/contracts';
import useListRealmNfts from '../hooks/useListRealmNfts';

interface Params {
  network: string;
  realmId: string;
}

const Container = styled.div``;

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
      <h1>
        browse nfts - {network}, realmId={realmId}
      </h1>
      <div>
        {data.realm.infusions.map(infusion => (
          <div key={infusion.id}>
            {infusion.nft.collection.name} ({infusion.nft.collection.symbol}),
            tokenId={infusion.nft.tokenId}
          </div>
        ))}
      </div>
    </Container>
  );
};
