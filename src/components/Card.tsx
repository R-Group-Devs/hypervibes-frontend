import styled from 'styled-components';
import { Link } from 'react-router-dom';
import fallbackImage from '../assets/images/fallback.png';

interface Props {
  name: string;
  url: string;
}

const Container = styled.div`
  margin-right: 2em;
  margin-bottom: 2em;
  width: 136px;
  display: inline-block;

  &:hover img {
    outline: 4px solid #bcff67;
    box-shadow: 0 0 20px 0 #bcff67;
  }
`;

const Image = styled.img`
  width: 136px;
  height: 136px;
  border-radius: 12px;
  outline: 4px solid transparent;
  box-shadow: none;
  transition: all 0.2s;
`;

const StyledLink = styled(Link)`
  color: #fff;

  &:hover {
    color: #bcff67;
    text-decoration: none;
  }
`;

const Name = styled.div`
  margin-top: 12px;
  width: 100%;
  font-size: 12px;
  font-weight: 600;
`;

export default ({ name, url }: Props) => (
  <StyledLink to={url}>
    <Container>
      <Image src={fallbackImage} alt="" />
      <Name>{name}</Name>
    </Container>
  </StyledLink>
);
