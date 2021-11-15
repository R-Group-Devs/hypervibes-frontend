import { MouseEvent } from 'react';
import styled from 'styled-components';
import arrowRight from '../assets/images/icons/arrow-right.svg';

interface Props {
  disabled?: boolean;
  children: React.ReactNode;
  arrow?: boolean;
  onClick?: (e: MouseEvent) => void;
}

const SubmitButton = styled.button`
  margin-top: 2em;
  padding: 1px;
  height: 42px;
  font-family: '3616 Grammastile', sans-serif;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  background: linear-gradient(#bcff67 0%, #17ffe3 30%, transparent 70%);
  border: none;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    background: none;
    cursor: not-allowed;

    > div {
      background: none;
    }
  }

  &:hover:not([disabled]) {
    box-shadow: 0 0 14px 0 #bcff67;
    cursor: pointer;
  }
`;

const ButtonBackground = styled.div`
  display: flex;
  align-items: center;
  padding: 0 34px;
  height: 40px;
  background: linear-gradient(#214c42 20%, #000 80%);
  transition: all 0.2s;
`;

const ArrowRightIcon = styled.img`
  margin-top: 0.1em;
  margin-left: 0.5em;
`;

export default ({
  disabled = false,
  children,
  arrow = true,
  onClick,
  ...rest
}: Props) => (
  <SubmitButton
    disabled={disabled}
    onClick={e => onClick && onClick(e)}
    {...rest}
  >
    <ButtonBackground>
      {children}

      {arrow && <ArrowRightIcon src={arrowRight} alt="" />}
    </ButtonBackground>
  </SubmitButton>
);
