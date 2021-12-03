import { useState, useEffect } from 'react';
import useErc20Contract from './useErc20Contract';

export default (tokenAddress: string) => {
  const contract = useErc20Contract(tokenAddress);
  const [decimals, setDecimals] = useState<number>();

  useEffect(() => {
    (async () => {
      try {
        if (!decimals) {
          const decimalExponent = await contract?.decimals();
          setDecimals(decimalExponent);
        }
      } catch (e) {
        setDecimals(undefined);
      }
    })();
  }, [contract, decimals, setDecimals]);

  return decimals;
};
