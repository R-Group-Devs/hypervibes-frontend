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

  if (!wallet.ethereum) {
    return null;
  }

  return (tokenAddress: string) => getContract(tokenAddress, erc20Abi, wallet.ethereum);
};
