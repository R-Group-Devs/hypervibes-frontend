import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import useContract from './useContract';
import { getContract } from '../utils/contract';
import erc20Abi from '../constants/abis/ERC20.json';

export default (tokenAddress: string) => {
  const contract = useContract(tokenAddress, erc20Abi);

  return contract;
};

export const useLazyErc20Contract = () => {
  const wallet = useWallet();

  const fn = useCallback(
    (tokenAddress: string) =>
      getContract(tokenAddress, erc20Abi, wallet.ethereum),
    [wallet]
  );

  if (!wallet.ethereum) {
    return null;
  }

  return fn;
};
