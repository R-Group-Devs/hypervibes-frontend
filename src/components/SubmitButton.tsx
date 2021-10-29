import React from 'react';
import styled from 'styled-components';
import submitButtonBackground from '../assets/images/submit-button-bg.png';
import submitButtonBackgroundLarge from '../assets/images/submit-button-bg-lg.png';
import arrowRight from '../assets/images/icons/arrow-right.svg';

interface Props {
  disabled?: boolean;
  // TODO: Remove this in favor of a pure CSS button that expands to width of content
  size?: 'md' | 'lg';
  children: React.ReactNode;
}

const SubmitButton = styled.button<{ size: 'md' | 'lg' }>`
  display: flex;
  align-items: center;
  margin-top: 2em;
  padding-left: ${({ size }) => (size === 'md' ? '2.5em' : '2em')};
  width: ${({ size }) => (size === 'md' ? '182px' : '327px')};
  font-family: '3616 Grammastile', sans-serif;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  background: ${({ size }) =>
    size === 'md'
      ? `url(${submitButtonBackground}) 0 0 no-repeat`
      : `url(${submitButtonBackgroundLarge}) 0 0 no-repeat`};
  border: none;

  &:hover:not([disabled]) {
    cursor: pointer;
  }
`;

const ArrowRightIcon = styled.img`
  margin-top: 0.1em;
  margin-left: 0.5em;
`;

export default ({ size = 'md', disabled = false, children, ...rest }: Props) => (
  <SubmitButton size={size} disabled={disabled} {...rest}>
    {children}

    <ArrowRightIcon src={arrowRight} alt="" />
  </SubmitButton>
);
