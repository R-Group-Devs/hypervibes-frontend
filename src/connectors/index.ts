import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from './NetworkConnector';
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from '../constants/chains';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

//if (typeof INFURA_KEY === 'undefined') {
//throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`);
//}

const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
};

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1,
});

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});
