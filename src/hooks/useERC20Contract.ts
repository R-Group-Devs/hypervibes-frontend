import useContract from './useContract';
import erc20Contract from '../constants/abis/ERC20.json';

export default (tokenAddress: string) => {
  const contract = useContract(tokenAddress, erc20Contract);

  return contract;
};
