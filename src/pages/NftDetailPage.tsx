import { useParams } from 'react-router';
import styled from 'styled-components';
import { NETWORKS } from '../constants/contracts';
import useBrowseNftDetails from '../hooks/useBrowseNftDetails';
import useMetadata from '../hooks/useMetadata';

interface Params {
  network: string;
  collection: string;
  tokenId: string;
}

const Container = styled.div``;

export default () => {
  const { network, collection, tokenId } = useParams<Params>();
  const chainId = NETWORKS[network];
  const { nft, isLoading, isError } = useBrowseNftDetails(
    collection,
    tokenId,
    chainId
  );

  const { metadata, isLoading: isMetadataLoading } = useMetadata(nft?.tokenUri);

  if (isError) {
    return <p>error fetching realms</p>;
  }

  if (isLoading) {
    return <p>loading nft data...</p>;
  }

  if (isMetadataLoading) {
    return <p>loading metadata...</p>;
  }

  if (nft == null) {
    return null;
  }

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
      <hr />
      <div>
        infusions:
        <br />
        {nft.infusions.map(infusion => (
          <div key={infusion.id}>
            realm {infusion.realm.id}: {infusion.realm.name}
            <br />
            balance: {infusion.balance}
            <br />
            events:
            <br />
            {infusion.events.map(event => (
              <div key={event.id}>
                {event.eventType}: {event.target.address} for {event.amount}
              </div>
            ))}
            <hr />
          </div>
        ))}
      </div>
      <div>{metadata && <pre>{JSON.stringify(metadata, null, 2)}</pre>}</div>
      <hr />
    </Container>
  );
};
