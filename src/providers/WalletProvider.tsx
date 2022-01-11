import { UseWalletProvider } from 'use-wallet';
import { RPC_URLS } from '../constants/rpc';

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => (
  <UseWalletProvider
    connectors={{
      walletconnect: {
        rpc: RPC_URLS,
      },
    }}
  >
    {children}
  </UseWalletProvider>
);
