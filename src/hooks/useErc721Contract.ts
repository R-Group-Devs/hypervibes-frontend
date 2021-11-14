import useContract from './useContract';
import erc721Abi from '../constants/abis/ERC721.json';

export default (tokenAddress: string) => {
  const contract = useContract(tokenAddress, erc721Abi);

  return contract;
};
