import styled from 'styled-components';
import { BigNumber } from 'ethers';
import { useQuery } from 'react-query';
import { getLoaders } from '../hypervibes/dataloaders';
import DecimalNumber from './DecimalNumber';

interface Props {
  chainId: number;
  collection: string;
  tokenId: BigNumber;
  realmId: BigNumber;
}

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 300;
`;

const ClaimableAmount = styled(DecimalNumber)`
  color: #17ffe3;
`;

const TokenSymbol = styled.div`
  margin-left: 0.5em;
`;

export default ({ chainId, realmId, collection, tokenId }: Props) => {
  const loaders = getLoaders(chainId);

  // fetch data from the chain and the graph simul
  const { data, isError } = useQuery([realmId, collection, tokenId], async () =>
    Promise.all([
      loaders.tokenData.load({
        realmId,
        collection: collection,
        tokenId,
      }),
      loaders.indexedInfusion.load({ collection: collection, tokenId }),
    ])
  );

  if (isError) {
    return null;
  } else if (data === undefined) {
    return null;
  }

  const [tokenData, infusionData] = data;

  if (tokenData.view === null) {
    return null;
  }

  const infusion = infusionData.infusions.find(i => i.realm.id.eq(realmId));

  if (!infusion) {
    return null;
  }

  const { realm } = infusion;

  return (
    <Container>
      <div>
        <ClaimableAmount
          value={BigNumber.from(0)}
          decimals={realm.token.decimals}
          interpolation={{
            dailyRate: realm.dailyRate,
            sampledAt: tokenData.view.lastClaimAt,
            max: tokenData.view.balance,
          }}
          minimumFractionDigits={3}
        />{' '}
        /{' '}
        <DecimalNumber
          value={tokenData.view.balance}
          decimals={realm.token.decimals}
          maximumFractionDigits={3}
        />
      </div>
      <TokenSymbol>{realm.token.symbol}</TokenSymbol>
    </Container>
  );
};
