import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { utils } from 'ethers';
import { isAddress } from '@ethersproject/address';
import { useLazyErc20Contract } from './useErc20Contract';
import { HYPERVIBES_CONTRACT_ADDRESSES } from '../constants/contracts';

export default () => {
  const getErc20Contract = useLazyErc20Contract();
  const { chainId } = useWallet();

  const approveAllowance = useCallback(
    async (tokenAddress: string, amount: string) => {
      if (chainId && isAddress(tokenAddress) && getErc20Contract) {
        const decimalExponent = await getErc20Contract(
          tokenAddress
        )?.decimals();

        return await getErc20Contract(tokenAddress)?.approve(
          HYPERVIBES_CONTRACT_ADDRESSES[chainId],
          utils.parseUnits(amount, decimalExponent)
        );
      }
    },
    [chainId, getErc20Contract]
  );

  return {
    approveAllowance,
  };
};
