import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';
import arrowLeft from '../assets/images/icons/arrow-left.svg';

interface Props {
  path: string;
}

const BackButton = styled(Button)`
  display: flex;
  margin-top: 2.2em;
  padding-left: 0;
  padding-right: 0;
  width: 182px;
  background: none;

  &:hover:not([disabled]) {
    background: none;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #fff;

  &:hover {
    text-decoration: none;
  }
`;

const ArrowLeftIcon = styled.img`
  margin-top: 0.2em;
  margin-right: 0.5em;
`;

export default ({ path, ...rest }: Props) => (
  <BackButton onClick={e => e.preventDefault()} {...rest}>
    <StyledLink to={path}>
      <ArrowLeftIcon src={arrowLeft} alt="" />
      Back
    </StyledLink>
  </BackButton>
);
