import styled from 'styled-components';

interface Props {
  label: string;
  description?: string;
  children: React.ReactNode;
}

const Container = styled.div`
  margin-top: 1.7em;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
`;

const InputGroup = styled.div`
  display: flex;
  margin-bottom: 2em;
`;

const Description = styled.p`
  margin-bottom: 2em;
  font-size: 14px;
  font-weight: 300;
`;

export default ({ label, description, children }: Props) => (
  <Container>
    <Label>{label}</Label>

    {description && <Description>{description}</Description>}

    <InputGroup>{children}</InputGroup>
  </Container>
);
