import { useQuery } from 'react-query';
import { Metadata, resolveMetadata } from '../hypervibes/nft';

export default (tokenUri: string | undefined | null) => {
  const query = useQuery<Metadata | undefined, Error>(
    `metadata:${tokenUri}`,
    () => (tokenUri ? resolveMetadata(tokenUri) : Promise.resolve(undefined))
  );

  return {
    ...query,
    metadata: query.data,
  };
};
