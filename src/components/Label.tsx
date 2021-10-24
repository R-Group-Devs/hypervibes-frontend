import React from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  children: React.ReactNode;
}

const Label = styled.label`
  margin: 1.5em 0 0.5em;
  display: block;
`;

export default ({ name, children, ...rest }: Props) => (
  <Label htmlFor={name} {...rest}>
    {children}
  </Label>
);
