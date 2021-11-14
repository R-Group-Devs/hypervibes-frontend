import { useState, useEffect } from 'react';
import useErc721Contract from './useErc721Contract';

export default (
  tokenAddress: string,
  tokenId: string,
  address: string | null
) => {
  const contract = useErc721Contract(tokenAddress);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (contract && address) {
          const approved = await contract?.getApproved(tokenId);

          const owner = await contract?.ownerOf(tokenId);
          const isApprovedForAll = await contract?.isApprovedForAll(
            owner,
            address
          );

          setIsApproved(
            owner === address || approved === address || isApprovedForAll
          );
        }
      } catch (e) {
        setIsApproved(false);
      }
    })();
  }, [address, contract, tokenId, setIsApproved]);

  return isApproved;
};
