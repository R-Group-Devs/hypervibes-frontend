if (!process.env.REACT_APP_ETHEREUM_RPC_URL) {
  throw new Error('must set REACT_APP_ETHEREUM_RPC_URL environment variable');
}

if (!process.env.REACT_APP_ROPSTEN_RPC_URL) {
  throw new Error('must set REACT_APP_ROPSTEN_RPC_URL environment variable');
}

export const RPC_URLS: Record<string, string> = {
  1: process.env.REACT_APP_ETHEREUM_RPC_URL,
  3: process.env.REACT_APP_ROPSTEN_RPC_URL,
};
