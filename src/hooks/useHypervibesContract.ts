import useContract from './useContract';
import hypervibesAbi from '../constants/abis/hypervibes.json';

export default () => {
  const contract = useContract('0xD23C25Eb1bAD8b1de60cBD313c09209055fD74c0', hypervibesAbi);

  return contract;
};
