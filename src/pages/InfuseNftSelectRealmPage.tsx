import InfuseNftContainer from '../components/InfuseNftContainer';
import FormHeading from '../components/FormHeading';
import RealmList from '../components/RealmList';
import useMyInfusibleRealms from '../hooks/useMyInfusibleRealms';
import heading from '../assets/images/headings/select-realm.svg';

export default () => {
  const { data } = useMyInfusibleRealms();

  if (!data) {
    return null;
  }

  return (
    <InfuseNftContainer name="Infusion Chamber">
      <FormHeading src={heading} alt="Select Realm" />

      <RealmList realms={data} />
    </InfuseNftContainer>
  );
};
