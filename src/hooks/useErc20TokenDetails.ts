import { useState, useEffect } from 'react';
import { isAddress } from '@ethersproject/address';
import { useLazyErc20Contract } from './useErc20Contract';

export default (tokenAddress: string) => {
  const getErc20Contract = useLazyErc20Contract();
  const [tokenSymbol, setTokenSymbol] = useState('');

  useEffect(() => {
    (async () => {
      try {
        if (isAddress(tokenAddress) && getErc20Contract) {
          const symbol = await getErc20Contract(tokenAddress)?.symbol();
          setTokenSymbol(symbol);
        } else {
          setTokenSymbol('');
        }
      } catch (e) {
        setTokenSymbol('');
      }
    })();
  }, [tokenAddress, getErc20Contract]);

  return {
    symbol: tokenSymbol,
  };
};
