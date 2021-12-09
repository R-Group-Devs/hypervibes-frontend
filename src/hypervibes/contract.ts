import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { BigNumber } from 'ethers';
import {
  Provider as MulticallProvider,
  Contract as MulticallContract,
} from 'ethers-multicall';
import HYPERVIBES from './abi/HyperVIBES.json';
import { getChainInfo } from './constants';

export interface GetTokenViewInput {
  realmId: BigNumber;
  collection: string;
  tokenId: BigNumber;
}

export interface GetTokenViewOutput {
  realmId: BigNumber;
  collection: string;
  tokenId: BigNumber;
  // if null, there is nothing infused
  view: null | {
    lastClaimAt: number;
    balance: BigNumber;
    currentMinedTokens: BigNumber;
  };
}

/**
 * get infusion data about a batch of (realm,nft,tokenId) tuples directly from
 * the blockchain.
 *
 * Will not throw if invalid token or non-infused token, view will just be null.
 * Will throw on an invalid realm id
 */
export const batchGetTokenData = async (
  batch: GetTokenViewInput[],
  chainId: number
): Promise<GetTokenViewOutput[]> => {
  const { contract, rpc } = getChainInfo(chainId);

  const hv = new MulticallContract(contract, HYPERVIBES);
  const provider = new MulticallProvider(
    new StaticJsonRpcProvider(rpc),
    chainId
  );

  const calls = batch.flatMap(d => {
    const getTokenView = hv.tokenData(d.realmId, d.collection, d.tokenId);
    const getCurrent = hv.currentMinedTokens(
      d.realmId,
      d.collection,
      d.tokenId
    );
    return [getTokenView, getCurrent];
  });

  const data = await provider.all(calls);

  const projected = batch.map<GetTokenViewOutput>((datum, idx) => {
    const { balance, lastClaimAt } = data[idx * 2];
    const currentMinedTokens = data[idx * 2 + 1];
    const view = lastClaimAt.eq(0)
      ? null
      : { balance, lastClaimAt, currentMinedTokens };
    return { ...datum, view };
  });

  return projected;
};
