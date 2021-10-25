import { useEffect, useRef } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import usePortal from 'react-useportal';
import styled from 'styled-components';
import Button from './Button';
import { shortenAddress } from '../utils/address';
import { SUPPORTED_WALLETS } from '../constants/wallets';

//const WALLET_VIEWS = {
//OPTIONS: 'options',
//OPTIONS_SECONDARY: 'options_secondary',
//ACCOUNT: 'account',
//PENDING: 'pending',
//};

const Container = styled.div`
  position: absolute;
  top: 40px;
  right: 300px;
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

const WalletProviderOption = styled.div`
  display: flex;
  margin: 1em 0;
  padding: 0 2em;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    cursor: pointer;
  }
`;

const WalletProviderIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export default () => {
  const { account, activate } = useWeb3React();
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const overlay = useRef<HTMLDivElement>(null);

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true)
        .then(() => closePortal())
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector); // a little janky...can't use setError because the connector isn't set
          } else {
            // set error
          }
        });
  };

  useEffect(() => {
    console.log(account);
  }, [account]);

  return (
    <Container>
      {account ? (
        <span>{shortenAddress(account)}</span>
      ) : (
        <Button onClick={openPortal}>connect wallet</Button>
      )}

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
              <ModalHeading>Select a wallet</ModalHeading>

              {Object.values(SUPPORTED_WALLETS).map(({ name, iconURL, connector }) => (
                <WalletProviderOption key={name} onClick={() => tryActivation(connector)}>
                  <h4>{name}</h4>
                  <WalletProviderIcon src={iconURL} alt={name} />
                </WalletProviderOption>
              ))}
            </Modal>
          </Overlay>
        </Portal>
      )}
    </Container>
  );
};
