import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Button = styled.button`
  margin-top: 2em;
  display: block;
`;

export default ({ children }: Props) => <Button>{children}</Button>;
