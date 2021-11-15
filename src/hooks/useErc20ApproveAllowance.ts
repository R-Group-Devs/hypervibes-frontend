import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { isAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { useLazyErc20Contract } from './useErc20Contract';
import { HYPERVIBES_CONTRACT_ADDRESSES } from '../constants/contracts';

export default () => {
  const getErc20Contract = useLazyErc20Contract();
  const { chainId } = useWallet();

  const approveAllowance = useCallback(
    async (tokenAddress: string, amount: number) => {
      if (chainId && isAddress(tokenAddress) && getErc20Contract) {
        const decimalExponent = await getErc20Contract(
          tokenAddress
        )?.decimals();
        const decimals = BigNumber.from(10).pow(decimalExponent);

        return await getErc20Contract(tokenAddress)?.approve(
          HYPERVIBES_CONTRACT_ADDRESSES[chainId],
          BigNumber.from(amount).mul(decimals)
        );
      }
    },
    [chainId, getErc20Contract]
  );

  return {
    approveAllowance,
  };
};
