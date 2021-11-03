import { NftProvider } from 'use-nft';
import { getDefaultProvider } from '@ethersproject/providers';

interface Props {
  children: React.ReactNode;
}

const ethersConfig = {
  provider: getDefaultProvider('homestead'),
};

export default ({ children }: Props) => (
  <NftProvider fetcher={['ethers', ethersConfig]}>{children}</NftProvider>
);
