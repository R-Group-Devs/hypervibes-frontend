import metaMaskIconUrl from '../assets/images/metamask.png';

interface WalletInfo {
  name: string;
  connector: string;
  iconURL: string;
  description: string;
}

export const SUPPORTED_WALLETS: Record<string, WalletInfo> = {
  injected: {
    name: 'MetaMask',
    connector: 'injected',
    iconURL: metaMaskIconUrl,
    description: 'Easy-to-use browser extension.',
  },
};
