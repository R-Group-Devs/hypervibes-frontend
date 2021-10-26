import useContract from './useContract';
import hyperVibesAbi from '../constants/abis/HyperVIBES.json';

export default () => {
  const contract = useContract('0x76e9f19D76Ae534cFb754AFE9D9CC52395E5fFaF', hyperVibesAbi);

  return contract;
};
