import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NETWORKS } from '../constants/contracts';
import useListRealmNfts from '../hooks/useListRealmNfts';
import useMetadata from '../hooks/useMetadata';

interface Params {
  network: string;
  realmId: string;
}

const Container = styled.div``;

const NftName: React.FunctionComponent<{ tokenUri: string }> = props => {
  // eslint-disable-next-line react/prop-types
  const { metadata } = useMetadata(props.tokenUri);
  if (!metadata) {
    return <>...</>;
  }
  return <>{metadata.name}</>;
};

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
            <Link
              to={`/${network}/tokens/${infusion.nft.collection.address}/${infusion.nft.tokenId}`}
            >
              {infusion.nft.collection.name} ({infusion.nft.collection.symbol}),
              tokenId={infusion.nft.tokenId},{' '}
              <NftName tokenUri={infusion.nft.tokenUri} />
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};
