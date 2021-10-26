import { useWallet } from 'use-wallet';
import { Web3Provider } from '@ethersproject/providers';
import useContract from './useContract';
import erc20Abi from '../constants/abis/ERC20.json';
import { Contract } from '@ethersproject/contracts';

export default (tokenAddress: string) => {
  const contract = useContract(tokenAddress, erc20Abi);

  return contract;
};

export const useLazyERC20Contract = () => {
  const wallet = useWallet();

  if (!wallet.ethereum) {
    return null;
  }

  const provider = new Web3Provider(wallet.ethereum);
  const signer = provider.getSigner();

  return (tokenAddress: string) => new Contract(tokenAddress, erc20Abi, signer);
};
