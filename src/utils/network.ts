const CHAINS: Record<string, string> = {
  1: 'Ethereum',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Goerli',
  137: 'Polygon',
  8001: 'Mumbai',
};

export const getNetworkName = (chainId: number) =>
  CHAINS[chainId] || 'Unsupported network';
