import { useWallet } from 'use-wallet';
import { Web3Provider } from '@ethersproject/providers';
import { Contract, ContractInterface } from '@ethersproject/contracts';

export default (contractAddress: string, abi: ContractInterface) => {
  const wallet = useWallet();

  if (!wallet.ethereum || !contractAddress) {
    return null;
  }

  const provider = new Web3Provider(wallet.ethereum);
  const signer = provider.getSigner();
  const contract = new Contract(contractAddress, abi, signer);

  return contract;
};
