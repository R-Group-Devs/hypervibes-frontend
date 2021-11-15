import styled from 'styled-components';
import fallbackImage from '../assets/images/fallback.png';

interface Props {
  name: string;
  image?: string;
}

const Container = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
`;

const Name = styled.div`
  margin-top: 25px;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  color: #bcff67;
  text-align: center;
`;

export default ({ name, image = fallbackImage }: Props) => (
  <Container>
    <Image src={image} alt="" />
    <Name>{name}</Name>
  </Container>
);
