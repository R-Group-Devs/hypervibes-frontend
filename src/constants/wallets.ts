import metaMaskIconUrl from '../assets/images/metamask.png';
import walletConnectIconUrl from '../assets/images/walletconnect.png';

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
  walletconnect: {
    name: 'WalletConnect',
    connector: 'walletconnect',
    iconURL: walletConnectIconUrl,
    description: 'Connect to wallets with QR code scanning or deep linking.',
  },
};
