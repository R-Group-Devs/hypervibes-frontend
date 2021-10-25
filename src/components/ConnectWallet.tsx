import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import usePortal from 'react-useportal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from './Button';
import { shortenAddress } from '../utils/address';
import { SUPPORTED_WALLETS } from '../constants/wallets';

const Container = styled.div`
  position: absolute;
  top: 40px;
  right: 300px;
`;

const ConnectWalletButton = styled(Button)`
  font-size: 14px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 1em 2em;
  width: 420px;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: #222438;
`;

const ModalHeading = styled.h3`
  margin-bottom: 2em;
`;

const WalletProviderInfo = styled.div`
  display: flex;
  margin: 1em 0;
  padding: 0 2em;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const WalletProviderOption = styled(WalletProviderInfo)`
  &:hover {
    cursor: pointer;
  }
`;

const ConnectedWalletInfo = styled(WalletProviderInfo)`
  flex-direction: column;
  align-items: start;
`;

const ConnectedWalletInfoHeading = styled.h4`
  display: flex;
  margin-bottom: 0;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const WalletProviderIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const WalletLink = styled.a`
  display: inline-block;
  margin: 0 2em 1em 0;
  font-size: 13px;

  &:hover {
    cursor: pointer;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 1em;
  right: 1em;
  padding: 0.5em;
  background: none;
  font-weight: 900;

  &:hover {
    background: none;
  }
`;

export default () => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const overlay = useRef<HTMLDivElement>(null);
  const wallet = useWallet();
  const connectedWallet = wallet.connector ? SUPPORTED_WALLETS[wallet.connector] : null;
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  useEffect(() => {
    console.log(wallet);
  }, [wallet]);

  useEffect(() => {
    if (wallet.status === 'connected') {
      closePortal();
    }
  }, [wallet.status, closePortal]);

  useEffect(() => {
    if (isAddressCopied) {
      setTimeout(() => setIsAddressCopied(false), 500);
    }
  }, [isAddressCopied]);

  return (
    <Container>
      <ConnectWalletButton onClick={openPortal}>
        {wallet.account ? shortenAddress(wallet.account) : 'connect wallet'}
      </ConnectWalletButton>

      {isOpen && (
        <Portal>
          <Overlay
            ref={overlay}
            onClick={(e) => {
              if (e.target === overlay.current) {
                closePortal(e);
              }
            }}
          >
            <Modal>
              {wallet.status === 'disconnected' && (
                <>
                  <ModalHeading>Select a wallet</ModalHeading>

                  {Object.values(SUPPORTED_WALLETS).map(({ name, connector, iconURL }) => (
                    <WalletProviderOption key={name} onClick={() => wallet.connect(connector)}>
                      <h4>{name}</h4>
                      <WalletProviderIcon src={iconURL} alt={name} />
                    </WalletProviderOption>
                  ))}
                </>
              )}

              {wallet.status === 'connecting' && connectedWallet && (
                <>
                  <ModalHeading>Select a wallet</ModalHeading>

                  <WalletProviderInfo>
                    <h4>Initializing...</h4>
                  </WalletProviderInfo>

                  <WalletProviderInfo>
                    <div>
                      <h4>{connectedWallet.name}</h4>
                      <h5>{connectedWallet.description}</h5>
                    </div>
                    <WalletProviderIcon src={connectedWallet.iconURL} alt={connectedWallet.name} />
                  </WalletProviderInfo>
                </>
              )}

              {wallet.status === 'connected' && wallet.account && connectedWallet && (
                <>
                  <ModalHeading>Account</ModalHeading>
                  <ConnectedWalletInfo>
                    <ConnectedWalletInfoHeading>
                      Connected with {connectedWallet.name}
                      <Button size="sm" inline onClick={() => wallet.reset()}>
                        Change
                      </Button>
                    </ConnectedWalletInfoHeading>
                    <h3>{shortenAddress(wallet.account)}</h3>

                    <div>
                      <CopyToClipboard
                        text={wallet.account}
                        onCopy={() => {
                          setIsAddressCopied(true);
                        }}
                      >
                        <WalletLink>{isAddressCopied ? 'Copied' : 'Copy address'}</WalletLink>
                      </CopyToClipboard>
                      <WalletLink
                        href={`https://etherscan.io/address/${wallet.account}`}
                        target="_blank"
                      >
                        View on explorer
                      </WalletLink>
                    </div>
                  </ConnectedWalletInfo>
                </>
              )}

              <CloseButton onClick={closePortal}>X</CloseButton>
            </Modal>
          </Overlay>
        </Portal>
      )}
    </Container>
  );
};
