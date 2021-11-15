import styled from 'styled-components';
import InfuseNftContainer from '../components/InfuseNftContainer';
import FormHeading from '../components/FormHeading';
import RealmList from '../components/RealmList';
import ConnectWalletInline from '../components/ConnectWalletInline';
import useMyInfusibleRealms from '../hooks/useMyInfusibleRealms';
import heading from '../assets/images/headings/select-realm.svg';

export default () => {
  const { data, isLoading, isIdle } = useMyInfusibleRealms();

  return (
    <InfuseNftContainer name="Infusion Chamber">
      <FormHeading src={heading} alt="Select Realm" />

      <ConnectWalletInline message="Connect your wallet to see a list of realms you can infuse in." />

      {!isLoading && !isIdle && (
        <RealmList
          realms={data || []}
          empty="You do not have permission to infuse in any realms."
        />
      )}
    </InfuseNftContainer>
  );
};
