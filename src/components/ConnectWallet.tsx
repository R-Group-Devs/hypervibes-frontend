import { useEffect } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import usePortal from 'react-useportal';
import Button from './Button';
import WalletModal from './WalletModal';
import useAutoConnect from '../hooks/useAutoConnect';
import { shortenAddress } from '../utils/address';

const Container = styled.div`
  position: absolute;
  top: 30px;
  right: 300px;
`;

const ConnectWalletButton = styled(Button)<{ isConnected: boolean }>`
  padding: 1em 3em;
  height: 44px;
  font-family: '3616 Grammastile', sans-serif;
  font-family: ${({ isConnected }) =>
    isConnected ? "'Decima Mono', 'Courier New', monospace" : "'3616 Grammastile', sans-serif"};
  font-size: ${({ isConnected }) => (isConnected ? '14px' : '10px')};
  background: none;
  border: 1px solid #17ffe3;

  &:hover:not([disabled]) {
    background: none;
  }
`;

export default () => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const wallet = useWallet();
  const triedAutoConnect = useAutoConnect();

  useEffect(() => {
    if (wallet.status === 'connected') {
      closePortal();
    }
  }, [wallet.status, closePortal]);

  return (
    <Container>
      {triedAutoConnect && (
        <ConnectWalletButton onClick={openPortal} isConnected={!!wallet.account}>
          {wallet.account ? shortenAddress(wallet.account) : 'connect wallet'}
        </ConnectWalletButton>
      )}

      <Portal>
        <WalletModal isOpen={isOpen} close={closePortal} />
      </Portal>
    </Container>
  );
};
