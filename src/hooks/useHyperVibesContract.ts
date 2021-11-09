import { useWallet } from 'use-wallet';
import useContract from './useContract';
import hyperVibesAbi from '../constants/abis/HyperVIBES.json';
import { HYPERVIBES_CONTRACT_ADDRESSES } from '../constants/contracts';

export default () => {
  const { chainId = 1 } = useWallet();
  const contract = useContract(
    HYPERVIBES_CONTRACT_ADDRESSES[chainId],
    hyperVibesAbi
  );

  return contract;
};
