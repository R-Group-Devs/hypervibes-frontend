import styled from 'styled-components';

interface Props {
  name: string;
  children: React.ReactNode;
  isRequired?: boolean;
}

const Label = styled.label<{ isRequired: boolean }>`
  margin: 1.5em 0 0.5em;
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;

  &:after {
    content: '*';
    position: relative;
    top: -0.2em;
    margin-left: 0.3em;
    color: #a72f2f;
    font-weight: 900;
    display: ${({ isRequired }) => (isRequired ? 'inline-block' : 'none')};
  }
`;

export default ({ name, children, isRequired = false, ...rest }: Props) => (
  <Label htmlFor={name} isRequired={isRequired} {...rest}>
    {children}
  </Label>
);
