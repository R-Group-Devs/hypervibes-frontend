import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from './Button';
import Modal, { ModalHeading, ModalContent } from './Modal';
import { SUPPORTED_WALLETS } from '../constants/wallets';
import { shortenAddress } from '../utils/address';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const WalletProviderInfo = styled.div`
  display: flex;
  margin: 1em 0;
  padding: 0 2em;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #17ffe3;
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

const DisconnectWalletButton = styled(Button)`
  display: inline-block;
  margin: 0 2em 1em 0;
  padding: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s;

  &:hover {
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const WalletLink = styled.a`
  display: inline-block;
  margin: 0 2em 1em 0;
  font-size: 13px;

  &:hover {
    cursor: pointer;
  }
`;

const WalletConnectionError = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 150px;
  align-items: center;
  text-align: center;
`;

export default ({ isOpen, close }: Props) => {
  const wallet = useWallet();
  const connectedWallet = wallet.connector
    ? SUPPORTED_WALLETS[wallet.connector]
    : null;
  const [isChangingWallets, setIsChangingWallets] = useState(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isAddressCopied) {
      setTimeout(() => setIsAddressCopied(false), 500);
    }
  }, [isAddressCopied]);

  useEffect(() => {
    if (isOpen) {
      setIsChangingWallets(false);
    }

    if (!isOpen) {
      setHasError(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (wallet.status === 'error') {
      setHasError(true);
    }
  }, [wallet]);

  return (
    <Modal isOpen={isOpen} close={close}>
      {((wallet.status !== 'connected' && wallet.status !== 'connecting') ||
        isChangingWallets) &&
        !hasError && (
          <>
            <ModalHeading>Select a wallet</ModalHeading>

            <ModalContent>
              {Object.values(SUPPORTED_WALLETS).map(
                ({ name, connector, iconURL }) => (
                  <WalletProviderOption
                    key={name}
                    onClick={() => {
                      wallet.connect(connector);
                      setIsChangingWallets(false);
                    }}
                  >
                    <h4>{name}</h4>
                    <WalletProviderIcon src={iconURL} alt={name} />
                  </WalletProviderOption>
                )
              )}
            </ModalContent>
          </>
        )}

      {wallet.status === 'connecting' && connectedWallet && !hasError && (
        <>
          <ModalHeading>Select a wallet</ModalHeading>

          <ModalContent>
            <WalletProviderInfo>
              <h4>Initializing...</h4>
            </WalletProviderInfo>

            <WalletProviderInfo>
              <div>
                <h4>{connectedWallet.name}</h4>
                <h5>{connectedWallet.description}</h5>
              </div>
              <WalletProviderIcon
                src={connectedWallet.iconURL}
                alt={connectedWallet.name}
              />
            </WalletProviderInfo>
          </ModalContent>
        </>
      )}

      {wallet.status === 'connected' &&
        wallet.account &&
        connectedWallet &&
        !isChangingWallets &&
        !hasError && (
          <>
            <ModalHeading>Account</ModalHeading>

            <ModalContent>
              <ConnectedWalletInfo>
                <ConnectedWalletInfoHeading>
                  Connected with {connectedWallet.name}
                  <Button
                    size="sm"
                    inline
                    onClick={() => setIsChangingWallets(true)}
                  >
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
                    <WalletLink>
                      {isAddressCopied ? 'Copied' : 'Copy address'}
                    </WalletLink>
                  </CopyToClipboard>
                  <WalletLink
                    href={`https://etherscan.io/address/${wallet.account}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on explorer
                  </WalletLink>

                  <DisconnectWalletButton
                    size="sm"
                    inline
                    onClick={() => wallet.reset()}
                  >
                    Disconnect
                  </DisconnectWalletButton>
                </div>
              </ConnectedWalletInfo>
            </ModalContent>
          </>
        )}

      {hasError && (
        <>
          <ModalHeading>Select a wallet</ModalHeading>

          <ModalContent>
            <WalletConnectionError>
              <p>There was an error connecting your wallet.</p>

              <p>
                Please make sure you have the proper wallet software installed
                and activated.
              </p>
            </WalletConnectionError>
          </ModalContent>
        </>
      )}
    </Modal>
  );
};
