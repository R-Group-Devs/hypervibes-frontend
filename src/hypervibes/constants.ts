// https://chainlist.org
export const SUPPORTED_NETWORKS = {
  mainnet: 1,
  matic: 137,
  fantom: 250,
  arbitrum: 42161,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  mumbai: 80001,
};

// https://docs.hypervibes.xyz/developers/links-and-repos#contract-addresses
export const CONTRACT_ADDRESSES: Record<string, string | undefined> = {
  [SUPPORTED_NETWORKS.mainnet]: '0x26887a9F95e1794e52aE1B72Bfa404c1562Eed0E',
  [SUPPORTED_NETWORKS.matic]: '0x26887a9F95e1794e52aE1B72Bfa404c1562Eed0E',
  [SUPPORTED_NETWORKS.fantom]: '0x26887a9F95e1794e52aE1B72Bfa404c1562Eed0E',
  [SUPPORTED_NETWORKS.arbitrum]: '0x26887a9F95e1794e52aE1B72Bfa404c1562Eed0E',
  [SUPPORTED_NETWORKS.ropsten]: '0x91367F9C5a07912a4870ceA43b3893366c05b35c',
  [SUPPORTED_NETWORKS.rinkeby]: '0xafb96b99a0A4eF348115C6BbD99A71d3d4F52Ff1',
  [SUPPORTED_NETWORKS.goerli]: '0x26887a9F95e1794e52aE1B72Bfa404c1562Eed0E',
  [SUPPORTED_NETWORKS.mumbai]: '0x57FBF9E899E17E23d46425e33eE191C8FaD27c28',
};

// https://docs.hypervibes.xyz/developers/links-and-repos#subgraphs
export const SUBGRAPH_ENDPOINTS: Record<string, string | undefined> = {
  [SUPPORTED_NETWORKS.mainnet]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-mainnet',
  [SUPPORTED_NETWORKS.matic]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-matic',
  [SUPPORTED_NETWORKS.fantom]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-fantom',
  [SUPPORTED_NETWORKS.arbitrum]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-arbitrum-one',
  [SUPPORTED_NETWORKS.ropsten]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-ropsten',
  [SUPPORTED_NETWORKS.rinkeby]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-rinkeby',
  [SUPPORTED_NETWORKS.goerli]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-goerli',
  [SUPPORTED_NETWORKS.mumbai]:
    'https://api.thegraph.com/subgraphs/name/r-group-devs/hypervibes-mumbai',
};

export const RPC_ENDPOINTS: Record<string, string | boolean | undefined> = {
  [SUPPORTED_NETWORKS.mainnet]: import.meta.env.REACT_APP_ETHEREUM_RPC_URL,
  [SUPPORTED_NETWORKS.matic]: import.meta.env.REACT_APP_POLYGON_RPC_URL,
  [SUPPORTED_NETWORKS.fantom]: import.meta.env.REACT_APP_FANTOM_RPC_URL,
  [SUPPORTED_NETWORKS.arbitrum]: import.meta.env.REACT_APP_ARBITRUM_RPC_URL,
  [SUPPORTED_NETWORKS.ropsten]: import.meta.env.REACT_APP_ROPSTEN_RPC_URL,
  [SUPPORTED_NETWORKS.rinkeby]: import.meta.env.REACT_APP_RINKEBY_RPC_URL,
  [SUPPORTED_NETWORKS.goerli]: import.meta.env.REACT_APP_GOERLI_RPC_URL,
  [SUPPORTED_NETWORKS.mumbai]: import.meta.env.REACT_APP_MUMBAI_RPC_URL,
};

interface ChainInfo {
  /** hv contract address */
  contract: string;

  /** rpc endpoint url */
  rpc: string;

  /** subgraph endpoint url */
  subgraph: string;
}

/**
 * get config / endpoint info by chain id
 */
export const getChainInfo = (chainId: number): ChainInfo => {
  if (!Object.values(SUPPORTED_NETWORKS).includes(chainId)) {
    throw new Error(`unsupported network ${chainId}`);
  }

  const contract = CONTRACT_ADDRESSES[chainId];
  if (contract == null) {
    throw new Error(`missing contract address for network ${chainId}`);
  }

  const rpc = RPC_ENDPOINTS[chainId];
  if (typeof rpc != 'string') {
    throw new Error(`missing rpc node for network ${chainId}`);
  }

  const subgraph = SUBGRAPH_ENDPOINTS[chainId];
  if (subgraph == null) {
    throw new Error(`missing subgraph for network ${chainId}`);
  }

  return { contract, rpc, subgraph };
};
