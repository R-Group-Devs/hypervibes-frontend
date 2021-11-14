import ClaimTokensContainer from '../components/ClaimTokensContainer';
import FormHeading from '../components/FormHeading';
import RealmList from '../components/RealmList';
import useRealms from '../hooks/useRealms';
import heading from '../assets/images/headings/select-realm.svg';

export default () => {
  const { data } = useRealms();

  if (!data) {
    return null;
  }

  return (
    <ClaimTokensContainer name="Claim Goods">
      <FormHeading src={heading} alt="Select Realm" />

      <RealmList realms={data} />
    </ClaimTokensContainer>
  );
};
