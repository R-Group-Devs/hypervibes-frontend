import { useWallet } from 'use-wallet';
import { ContractInterface } from '@ethersproject/contracts';
import { getContract } from '../utils/contract';

export default (contractAddress: string, abi: ContractInterface) => {
  const wallet = useWallet();

  if (!wallet.ethereum || !contractAddress) {
    return null;
  }

  const contract = getContract(contractAddress, abi, wallet.ethereum);

  return contract;
};
