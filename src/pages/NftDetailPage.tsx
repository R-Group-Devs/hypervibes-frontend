import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { BigNumber } from 'ethers';
import NftCard from '../components/NftCard';
import NftGalleryCard from '../components/NftGalleryCard';
import InfusionTicker from '../components/InfusionTicker';
import { getLoaders } from '../hypervibes/dataloaders';
import useBrowseNftDetails from '../hooks/useBrowseNftDetails';
import useCollectionInfusions from '../hooks/useCollectionInfusions';
import useMetadata from '../hooks/useMetadata';
import { NETWORKS } from '../constants/contracts';

interface Params {
  network: string;
  collection: string;
  tokenId: string;
}

const Container = styled.div``;

const NftDetails = styled.div`
  display: flex;
`;

const NftCardContainer = styled.div`
  width: 550px;
  height: 550px;
  flex-shrink: 0;
`;

const Details = styled.div`
  min-width: 450px;
  margin-left: 80px;
  word-break: break-word;
`;

const Name = styled.div`
  font-size: 42px;
  font-weight: 600;
`;

const Description = styled.div`
  margin-top: 0.5em;
  margin-bottom: 4em;
  font-size: 12px;
  line-height: 20px;
  color: #bcff67;
`;

const Field = styled.div`
  margin-bottom: 2em;
`;

const Label = styled.div`
  margin-bottom: 0.5em;
  font-size: 18px;
  font-weight: 600;
`;

const Value = styled.div`
  font-size: 14px;
`;

const LargeValue = styled.div`
  font-size: 32px;
  color: #bcff67;
`;

const Metrics = styled.div`
  margin: 2.5em 0 3em;
  padding-top: 3em;
  padding-bottom: 1em;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

const OtherNftsHeading = styled.div`
  margin: 80px 0 60px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const InfusionsTable = styled.table`
  margin-top: 1.5em;
`;

const RealmNameRow = styled.td`
  padding: 0.5em 2em 0.5em 0;
  width: 40%;
`;

const RealmName = styled.div`
  width: 99%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ClaimableAmountRow = styled.td`
  width: 80%;
`;

export default () => {
  const { network, collection, tokenId } = useParams<Params>();
  const chainId = NETWORKS[network];
  const { nft, isLoading, isError } = useBrowseNftDetails(
    collection,
    tokenId,
    chainId
  );
  const { data: collectionInfusions } = useCollectionInfusions(collection);

  const { metadata, isLoading: isMetadataLoading } = useMetadata(nft?.tokenUri);

  const infusionDataQuery = useQuery([network, collection, tokenId], () =>
    getLoaders(chainId).indexedInfusion.load({
      collection: collection,
      tokenId: BigNumber.from(tokenId),
    })
  );

  if (isError) {
    return <p>error fetching realms</p>;
  }

  if (isLoading || isMetadataLoading || nft == null) {
    return null;
  }

  const realmsInfusedIn = new Set(
    nft.infusions.map(infusion => infusion.realm.id)
  ).size;

  const totalClaims = nft.infusions
    .map(infusion =>
      infusion.events.map(event => {
        if (event.eventType === 'CLAIM') {
          return event;
        }
      })
    )
    .flat()
    .filter(Boolean).length;

  const otherCollectionInfusions = collectionInfusions?.nfts.filter(
    nft => nft.tokenId !== tokenId
  );

  return (
    <Container>
      <NftDetails>
        <NftCardContainer>
          <NftCard name="" image={metadata?.image} />
        </NftCardContainer>

        <Details>
          {metadata && (
            <>
              <Name>{metadata?.name}</Name>
              <Description>{metadata?.description}</Description>
            </>
          )}

          <Field>
            <Label>Infusions</Label>
            <Value>
              {infusionDataQuery.data && (
                <InfusionsTable>
                  <tbody>
                    {infusionDataQuery.data.infusions.map(infusion => (
                      <tr key={infusion.id}>
                        <RealmNameRow>
                          <RealmName>{infusion.realm.name}</RealmName>
                        </RealmNameRow>

                        <ClaimableAmountRow>
                          <InfusionTicker
                            chainId={chainId}
                            collection={collection}
                            realmId={infusion.realm.id}
                            tokenId={BigNumber.from(tokenId)}
                          />
                        </ClaimableAmountRow>
                      </tr>
                    ))}
                  </tbody>
                </InfusionsTable>
              )}
            </Value>
          </Field>

          <Metrics>
            <Field>
              <Label>Total Infusions</Label>
              <LargeValue>{nft.infusions.length}</LargeValue>
            </Field>

            <Field>
              <Label>Realms Infused In</Label>
              <LargeValue>{realmsInfusedIn}</LargeValue>
            </Field>

            <Field>
              <Label>Total Claims</Label>
              <LargeValue>{totalClaims}</LargeValue>
            </Field>
          </Metrics>

          <Field>
            <Label>Network</Label>
            <Value>{network}</Value>
          </Field>

          <Field>
            <Label>Collection</Label>
            <Value>{nft.collection.address}</Value>
          </Field>

          <Field>
            <Label>Owner</Label>
            <Value>{nft.owner.address}</Value>
          </Field>
        </Details>
      </NftDetails>

      {otherCollectionInfusions && otherCollectionInfusions.length > 0 && (
        <>
          <OtherNftsHeading>
            Other infused NFTs in this collection
          </OtherNftsHeading>

          {otherCollectionInfusions.map(nft => (
            <NftGalleryCard
              key={`${nft.collection} ${nft.tokenId}`}
              url={`/${network}/tokens/${nft.collection.address}/${nft.tokenId}`}
              tokenUri={nft.tokenUri}
              size="lg"
              showClaimableAmount={false}
            />
          ))}
        </>
      )}
    </Container>
  );
};
