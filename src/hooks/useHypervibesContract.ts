import { useCallback } from 'react';
import useContract from './useContract';
import hypervibesAbi from '../constants/abis/hypervibes.json';

interface CreateRealmPayload {
  name: string;
  description: string;
  admins: string[];
  infusers: string[];
  collections: string[];
  config: {
    token: string;
    constraints: {
      minDailyRate: number;
      imaxDailyRate: number;
      minInfusionAmount: number;
      imaxInfusionAmount: number;
      imaxTokenBalance: number;
      requireOwnedNft: boolean;
      disableMultiInfuse: boolean;
      requireInfusionWhitelist: boolean;
      requireCollectionWhitelist: boolean;
    };
  };
}

export default () => {
  const contract = useContract('0xD23C25Eb1bAD8b1de60cBD313c09209055fD74c0', hypervibesAbi);

  const createRealm = useCallback(
    async (payload: CreateRealmPayload) => {
      const res = await contract?.createTenant(payload);

      console.log(res.hash);
      return res.hash;
    },
    [contract]
  );

  return {
    createRealm,
  };
};
