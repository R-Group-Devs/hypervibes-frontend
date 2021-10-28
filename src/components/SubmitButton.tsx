import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import submitButtonBackground from '../assets/images/submit-button-bg.png';
import arrowRight from '../assets/images/icons/arrow-right.svg';

interface Props {
  disabled?: boolean;
  children: React.ReactNode;
}

const SubmitButton = styled(Button)`
  display: flex;
  align-items: center;
  margin-top: 2em;
  padding-left: 2.75em;
  width: 182px;
  background: url(${submitButtonBackground}) 0 0 no-repeat;

  &:hover:not([disabled]) {
    background: url(${submitButtonBackground}) 0 0 no-repeat;
  }
`;

const ArrowRightIcon = styled.img`
  margin-top: 0.2em;
  margin-left: 0.5em;
`;

export default ({ disabled = false, children, ...rest }: Props) => (
  <SubmitButton disabled={disabled} {...rest}>
    {children}

    <ArrowRightIcon src={arrowRight} alt="" />
  </SubmitButton>
);
