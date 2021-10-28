import useContract from './useContract';
import hyperVibesAbi from '../constants/abis/HyperVIBES.json';
import { HYPERVIBES_CONTRACT_ADDRESSES } from '../constants/contracts';

export default () => {
  // TODO - support multichain
  const contract = useContract(HYPERVIBES_CONTRACT_ADDRESSES[3], hyperVibesAbi);

  return contract;
};
