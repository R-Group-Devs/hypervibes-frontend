import { useCallback } from 'react';
import { isAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { useLazyErc20Contract } from './useErc20Contract';
import { HYPERVIBES_CONTRACT_ADDRESSES } from '../constants/contracts';

export default () => {
  const getErc20Contract = useLazyErc20Contract();

  const approveAllowance = useCallback(
    async (tokenAddress: string, amount: number) => {
      if (isAddress(tokenAddress) && getErc20Contract) {
        await getErc20Contract(tokenAddress)?.approve(
          // TODO - support multichain
          HYPERVIBES_CONTRACT_ADDRESSES[3],
          // TODO: get decimals from collection ERC-20
          BigNumber.from(amount).pow(18)
        );
      }
    },
    [getErc20Contract]
  );

  return {
    approveAllowance,
  };
};
