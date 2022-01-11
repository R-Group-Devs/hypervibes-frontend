import { SUPPORTED_NETWORKS } from './networks';

export const RPC_URLS: Record<string, string> = {
  [SUPPORTED_NETWORKS.mainnet]: String(
    import.meta.env.REACT_APP_ETHEREUM_RPC_URL ?? ''
  ),
  [SUPPORTED_NETWORKS.matic]: String(
    import.meta.env.REACT_APP_POLYGON_RPC_URL ?? ''
  ),
  [SUPPORTED_NETWORKS.fantom]: String(
    import.meta.env.REACT_APP_FANTOM_RPC_URL ?? ''
  ),
  [SUPPORTED_NETWORKS.arbitrum]: String(
    import.meta.env.REACT_APP_ARBITRUM_RPC_URL ?? ''
  ),
  [SUPPORTED_NETWORKS.rinkeby]: String(
    import.meta.env.REACT_APP_RINKEBY_RPC_URL ?? ''
  ),
  [SUPPORTED_NETWORKS.ropsten]: String(
    import.meta.env.REACT_APP_ROPSTEN_RPC_URL ?? ''
  ),
  [SUPPORTED_NETWORKS.goerli]: String(
    import.meta.env.REACT_APP_GOERLI_RPC_URL ?? ''
  ),
  [SUPPORTED_NETWORKS.mumbai]: String(
    import.meta.env.REACT_APP_MUMBAI_RPC_URL ?? ''
  ),
};
