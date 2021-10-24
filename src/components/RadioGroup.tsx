import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import Label from './Label';

interface Props {
  name: string;
  label: string;
  children: React.ReactNode;
  errors: UseFormReturn['formState']['errors'];
}

const RadioGroup = styled.div``;

export default ({ name, label, children, errors }: Props) => (
  <RadioGroup>
    <h3>{label}</h3>

    {children}

    {errors[name] && errors[name].type === 'required' && <span>This field is required.</span>}
  </RadioGroup>
);
