import { useWallet } from 'use-wallet';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { Contract, ContractInterface } from '@ethersproject/contracts';

export default (contractAddress: string, abi: ContractInterface) => {
  const wallet = useWallet();
  // @ts-ignore
  const provider = new Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log(signer);
  const chainId = wallet.chainId ?? 1;
  //const provider = new JsonRpcProvider(INFURA_ENDPOINTS[chainId]);
  const contract = new Contract(contractAddress, abi, signer);

  return contract;
};
