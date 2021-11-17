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
  right: 50px;
  display: flex;
  align-items: center;
`;

const ConnectWalletButton = styled(Button)<{ isConnected: boolean }>`
  padding: 1px;
  height: 42px;
  font-family: ${({ isConnected }) =>
    isConnected
      ? "'Decima Mono', 'Courier New', monospace"
      : "'3616 Grammastile', sans-serif"};
  font-size: ${({ isConnected }) => (isConnected ? '14px' : '8px')};
  line-height: ${({ isConnected }) => (isConnected ? '14px' : '24px')};
  background: linear-gradient(#bcff67, #17ffe3);

  &:hover:not([disabled]) {
    background: linear-gradient(#bcff67, #17ffe3);
  }
`;

const ButtonBackground = styled.div`
  padding: 1em 2.5em;
  height: 100%;
  background: #1c1c1c;
  transition: background 0.2s;
`;

const NetworkName = styled.span`
  margin-right: 1.5em;
  font-size: 14px;
`;

export default ({ ...rest }) => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const wallet = useWallet();
  const triedAutoConnect = useAutoConnect();

  useEffect(() => {
    if (wallet.status === 'connected') {
      closePortal();
    }
  }, [wallet.status, closePortal]);

  return (
    <Container {...rest}>
      {wallet.account && <NetworkName />}

      {triedAutoConnect && (
        <ConnectWalletButton
          onClick={openPortal}
          isConnected={!!wallet.account}
        >
          <ButtonBackground>
            {wallet.account ? shortenAddress(wallet.account) : 'connect wallet'}
          </ButtonBackground>
        </ConnectWalletButton>
      )}

      <Portal>
        <WalletModal isOpen={isOpen} close={closePortal} />
      </Portal>
    </Container>
  );
};
