import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from './Button';
import Modal, { ModalHeading, ModalContent } from './Modal';
import { SUPPORTED_WALLETS } from '../constants/wallets';
import { shortenAddress } from '../utils/address';

interface Props {
  close: () => void;
}

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

export default ({ close }: Props) => {
  const wallet = useWallet();
  const connectedWallet = wallet.connector ? SUPPORTED_WALLETS[wallet.connector] : null;
  const [isAddressCopied, setIsAddressCopied] = useState(false);

  useEffect(() => {
    if (isAddressCopied) {
      setTimeout(() => setIsAddressCopied(false), 500);
    }
  }, [isAddressCopied]);

  return (
    <Modal close={close}>
      {wallet.status === 'disconnected' && (
        <>
          <ModalHeading>Select a wallet</ModalHeading>

          <ModalContent>
            {Object.values(SUPPORTED_WALLETS).map(({ name, connector, iconURL }) => (
              <WalletProviderOption key={name} onClick={() => wallet.connect(connector)}>
                <h4>{name}</h4>
                <WalletProviderIcon src={iconURL} alt={name} />
              </WalletProviderOption>
            ))}
          </ModalContent>
        </>
      )}

      {wallet.status === 'connecting' && connectedWallet && (
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
              <WalletProviderIcon src={connectedWallet.iconURL} alt={connectedWallet.name} />
            </WalletProviderInfo>
          </ModalContent>
        </>
      )}

      {wallet.status === 'connected' && wallet.account && connectedWallet && (
        <>
          <ModalHeading>Account</ModalHeading>

          <ModalContent>
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
                <WalletLink href={`https://etherscan.io/address/${wallet.account}`} target="_blank">
                  View on explorer
                </WalletLink>
              </div>
            </ConnectedWalletInfo>
          </ModalContent>
        </>
      )}
    </Modal>
  );
};
