import { useState, useEffect } from 'react';
import useErc721Contract from './useErc721Contract';

export default (tokenAddress: string, tokenId?: string) => {
  const contract = useErc721Contract(tokenAddress);
  const [ownerOf, setOwnerOf] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (contract && tokenId) {
          const res = await contract?.ownerOf(tokenId);

          setOwnerOf(res);
        }
      } catch (e) {
        setOwnerOf('');
      }
    })();
  }, [contract, tokenId, setOwnerOf]);

  return ownerOf;
};
