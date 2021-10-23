import React from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  children: React.ReactNode;
}

const Label = styled.label`
  display: block;
`;

export default ({ name, children }: Props) => <Label htmlFor={name}>{children}</Label>;
