import useContract from './useContract';
import hypervibesAbi from '../constants/abis/hypervibes.json';

export default () => {
  const contract = useContract('0x76e9f19D76Ae534cFb754AFE9D9CC52395E5fFaF', hypervibesAbi);

  return contract;
};
