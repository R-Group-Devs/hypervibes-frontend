import ClaimTokensContainer from '../components/ClaimTokensContainer';
import FormHeading from '../components/FormHeading';
import RealmList from '../components/RealmList';
import ConnectWalletInline from '../components/ConnectWalletInline';
import useRealms from '../hooks/useRealms';
import heading from '../assets/images/headings/select-realm.svg';

export default () => {
  const { data, isLoading, isIdle } = useRealms();

  return (
    <ClaimTokensContainer name="Claim Goods">
      <FormHeading src={heading} alt="Select Realm" />

      <ConnectWalletInline message="Connect your wallet to see a list of realms you can claim from." />

      {!isLoading && !isIdle && (
        <RealmList
          realms={data || []}
          url={realmId => `realm/${realmId}/select-token`}
        />
      )}
    </ClaimTokensContainer>
  );
};
