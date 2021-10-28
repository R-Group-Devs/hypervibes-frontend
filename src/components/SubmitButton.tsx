import React from 'react';
import styled from 'styled-components';
import Button from './Button';

interface Props {
  disabled?: boolean;
  children: React.ReactNode;
}

const SubmitButton = styled(Button)`
  margin-top: 2em;
`;

export default ({ disabled = false, children }: Props) => (
  <SubmitButton disabled={disabled}>{children}</SubmitButton>
);
