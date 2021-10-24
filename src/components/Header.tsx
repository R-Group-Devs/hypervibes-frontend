import { useEffect } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import styled from 'styled-components';
import { injected } from '../connectors';
import { SUPPORTED_WALLETS } from '../constants/wallets';

const Container = styled.div`
  display: flex;
`;

export default () => {
  const { account, activate } = useWeb3React();

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = '';
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        } else {
          // set error
        }
      });
  };
  // get wallets user can switch too, depending on device/browser
  const getOptions = () => {
    // @ts-ignore
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      // overwrite injected when needed
      if (option.connector === injected) {
        console.log('metamask');
        console.log(option.connector);
        tryActivation(option.connector);
      }
    });
  };

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    console.log(account);
  }, [account]);

  return <Container>connect wallet</Container>;
};
