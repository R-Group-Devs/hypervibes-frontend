import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

interface Props {
  children: React.ReactNode;
}

const getLibrary = (provider: any) => new Web3Provider(provider);

export default ({ children }: Props) => (
  <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
);
