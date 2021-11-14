import { useParams } from 'react-router';
import styled from 'styled-components';
import { NETWORKS } from '../constants/contracts';
import useBrowseNftDetails from '../hooks/useBrowseNftDetails';

interface Params {
  network: string;
  collection: string;
  tokenId: string;
}

const Container = styled.div``;

export default () => {
  const { network, collection, tokenId } = useParams<Params>();
  const chainId = NETWORKS[network];
  const { data, isLoading, isError } = useBrowseNftDetails(
    collection,
    tokenId,
    chainId
  );

  if (isError) {
    return <p>error fetching realms</p>;
  }

  if (isLoading) {
    return <p>loading realms...</p>;
  }

  if (data == null) {
    return null;
  }

  const [nft] = data.nfts;

  return (
    <Container>
      <h1>
        {nft.collection.name} ({nft.collection.symbol}) - #{nft.tokenId}
      </h1>
      <div>
        network: {network}
        <br />
        collection: {nft.collection.address}
        <br />
        token uri: {nft.tokenUri}
        <br />
        owner: {nft.owner.address}
        <br />
      </div>
      <div>
        infusions:
        <br />
        {nft.infusions.map(infusion => (
          <div key={infusion.id}>
            realm: {infusion.realm.id}: {infusion.realm.name}
            <br />
            balance: {infusion.balance}
            <br />
          </div>
        ))}
      </div>
    </Container>
  );
};
