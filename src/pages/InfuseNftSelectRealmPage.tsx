import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InfuseNftContainer from '../components/InfuseNftContainer';
import FormHeading from '../components/FormHeading';
import RealmList from '../components/RealmList';
import ConnectWalletInline from '../components/ConnectWalletInline';
import useMyInfusibleRealms from '../hooks/useMyInfusibleRealms';
import SubmitButton from '../components/SubmitButton';
import heading from '../assets/images/headings/select-realm.svg';

const Message = styled.div`
  margin-bottom: 1em;
`;

export default () => {
  const { data, isLoading, isIdle } = useMyInfusibleRealms();

  return (
    <InfuseNftContainer name="Infusion Chamber">
      <FormHeading src={heading} alt="Select Realm" />

      <ConnectWalletInline message="Connect your wallet to see a list of realms you can infuse in." />

      {!isLoading && !isIdle && (
        <RealmList
          realms={data || []}
          empty={
            <>
              <Message>
                You do not have permission to infuse in any realms.
              </Message>
              <Link to="/realm/create">
                <SubmitButton>Create a Realm</SubmitButton>
              </Link>
            </>
          }
        />
      )}
    </InfuseNftContainer>
  );
};
