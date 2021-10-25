import { useEffect } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import usePortal from 'react-useportal';
import Button from './Button';
import WalletModal from './WalletModal';
import { shortenAddress } from '../utils/address';

const Container = styled.div`
  position: absolute;
  top: 40px;
  right: 300px;
`;

const ConnectWalletButton = styled(Button)`
  font-size: 14px;
`;

export default () => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const wallet = useWallet();

  useEffect(() => {
    console.log(wallet);
  }, [wallet]);

  useEffect(() => {
    if (wallet.status === 'connected') {
      closePortal();
    }
  }, [wallet.status, closePortal]);

  return (
    <Container>
      <ConnectWalletButton onClick={openPortal}>
        {wallet.account ? shortenAddress(wallet.account) : 'connect wallet'}
      </ConnectWalletButton>

      {isOpen && (
        <Portal>
          <WalletModal close={closePortal} />
        </Portal>
      )}
    </Container>
  );
};
