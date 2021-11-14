export const NETWORKS: Record<string, number> = {
  ropsten: 3,
  rinkeby: 4,
  mumbai: 80001,
};

export const HYPERVIBES_CONTRACT_ADDRESSES: Record<string, string> = {
  [NETWORKS.ropsten]: '0xcd181fB818aaAae8D34D6D5bBe7aD4c44ac8af98',
  [NETWORKS.rinkeby]: '0xafb96b99a0A4eF348115C6BbD99A71d3d4F52Ff1',
  [NETWORKS.mumbai]: '0x57FBF9E899E17E23d46425e33eE191C8FaD27c28',
};
