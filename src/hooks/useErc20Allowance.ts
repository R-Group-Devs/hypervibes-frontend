import { useState, useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { isAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { useLazyErc20Contract } from './useErc20Contract';
import { HYPERVIBES_CONTRACT_ADDRESSES } from '../constants/contracts';

export default (tokenAddress: string) => {
  const getErc20Contract = useLazyErc20Contract();
  const { account } = useWallet();
  const [allowance, setAllowance] = useState(BigNumber.from(0));

  useEffect(() => {
    (async () => {
      try {
        if (isAddress(tokenAddress) && account && getErc20Contract) {
          const res = await getErc20Contract(tokenAddress)?.allowance(
            account,
            // TODO - support multichain
            HYPERVIBES_CONTRACT_ADDRESSES[3]
          );
          setAllowance(res);
        } else {
          setAllowance(BigNumber.from(0));
        }
      } catch (e) {
        setAllowance(BigNumber.from(0));
      }
    })();
  }, [tokenAddress, getErc20Contract, account]);

  return {
    allowance,
  };
};
