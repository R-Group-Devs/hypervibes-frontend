import React from 'react';
import styled from 'styled-components';
import Button from './Button';

interface Props {
  children: React.ReactNode;
}

const SubmitButton = styled(Button)`
  margin-top: 2em;
`;

export default ({ children }: Props) => <SubmitButton>{children}</SubmitButton>;
