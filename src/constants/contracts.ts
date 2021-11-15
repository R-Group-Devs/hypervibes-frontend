export const NETWORKS: Record<string, number> = {
  mainnet: 1,
  matic: 137,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  mumbai: 80001,
};

export const HYPERVIBES_CONTRACT_ADDRESSES: Record<string, string> = {
  [NETWORKS.mainnet]: '0x26887a9F95e1794e52aE1B72Bfa404c1562Eed0E',
  [NETWORKS.matic]: '0x26887a9F95e1794e52aE1B72Bfa404c1562Eed0E',
  [NETWORKS.ropsten]: '0x91367F9C5a07912a4870ceA43b3893366c05b35c',
  [NETWORKS.rinkeby]: '0xafb96b99a0A4eF348115C6BbD99A71d3d4F52Ff1',
  [NETWORKS.goerli]: '0x26887a9F95e1794e52aE1B72Bfa404c1562Eed0E',
  [NETWORKS.mumbai]: '0x57FBF9E899E17E23d46425e33eE191C8FaD27c28',
};
