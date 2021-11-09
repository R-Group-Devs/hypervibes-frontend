import { UseWalletProvider } from 'use-wallet';

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => (
  <UseWalletProvider>{children}</UseWalletProvider>
);
