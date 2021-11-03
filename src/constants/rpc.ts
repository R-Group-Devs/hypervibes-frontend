if (!import.meta.env.REACT_APP_ETHEREUM_RPC_URL) {
  throw new Error('must set REACT_APP_ETHEREUM_RPC_URL environment variable');
}

if (!import.meta.env.REACT_APP_RINKEBY_RPC_URL) {
  throw new Error('must set REACT_APP_RINKEBY_RPC_URL environment variable');
}

export const RPC_URLS: Record<string, string> = {
  1: String(import.meta.env.REACT_APP_ETHEREUM_RPC_URL ?? ''),
  4: String(import.meta.env.REACT_APP_RINKEBY_RPC_URL ?? ''),
};
