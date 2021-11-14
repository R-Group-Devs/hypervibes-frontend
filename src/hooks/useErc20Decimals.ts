import { useState, useEffect } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import useErc20Contract from './useErc20Contract';

export default (tokenAddress: string) => {
  const contract = useErc20Contract(tokenAddress);
  const [decimals, setDecimals] = useState<BigNumber>(BigNumber.from(1));

  useEffect(() => {
    (async () => {
      try {
        if (decimals.eq(BigNumber.from(1))) {
          // TODO: fix this failing
          //const decimalExponent = await contract?.decimals();
          //setDecimals(BigNumber.from(10).pow(decimalExponent));
          setDecimals(BigNumber.from(10).pow(18));
        }
      } catch (e) {
        setDecimals(BigNumber.from(1));
      }
    })();
  }, [decimals, setDecimals]);

  return decimals;
};
