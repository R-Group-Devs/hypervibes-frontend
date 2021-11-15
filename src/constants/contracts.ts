export const NETWORKS: Record<string, number> = {
  eth: 1,
  ropsten: 3,
  rinkeby: 4,
  mumbai: 80001,
};

export const HYPERVIBES_CONTRACT_ADDRESSES: Record<string, string> = {
  [NETWORKS.eth]: '0x0',
  [NETWORKS.ropsten]: '0x91367F9C5a07912a4870ceA43b3893366c05b35c',
  [NETWORKS.rinkeby]: '0xafb96b99a0A4eF348115C6BbD99A71d3d4F52Ff1',
  [NETWORKS.mumbai]: '0x57FBF9E899E17E23d46425e33eE191C8FaD27c28',
};
