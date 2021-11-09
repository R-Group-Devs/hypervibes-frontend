import {
  Web3Provider,
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { Contract, ContractInterface } from '@ethersproject/contracts';

export const getContract = (
  contractAddress: string,
  abi: ContractInterface,
  externalProvider: ExternalProvider | JsonRpcFetchFunc
) => {
  const provider = new Web3Provider(externalProvider);
  const signer = provider.getSigner();

  return new Contract(contractAddress, abi, signer);
};
