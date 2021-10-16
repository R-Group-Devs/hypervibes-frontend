import { ReactNode } from 'react';
import { getDefaultProvider } from '@ethersproject/providers';
import { NftProvider as Provider } from 'use-nft';

interface Props {
  children: ReactNode;
}

const ethersConfig = {
  provider: getDefaultProvider('homestead'),
};

const NftProvider = ({ children }: Props) => (
  <Provider fetcher={['ethers', ethersConfig]}>{children}</Provider>
);

export default NftProvider;
