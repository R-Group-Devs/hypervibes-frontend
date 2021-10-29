import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface FormStep {
  label: string;
  path: string;
}

interface Props {
  steps: FormStep[];
  activeStep: number;
}

const Container = styled.div`
  position: absolute;
  margin-top: -3.5em;
  width: 80vw;
  max-width: 784px;
  z-index: 1;
`;

const ProgressBar = styled.div<{ progress: number }>`
  margin-bottom: 15px;
  height: 6px;
  background: linear-gradient(
    to right,
    #bcff67 ${({ progress }) => progress / 2}%,
    transparent ${({ progress }) => progress}%
  );
  border-radius: 20px;
`;

const Steps = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Step = styled(Link)<{ $isActive: boolean }>`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
  color: ${({ $isActive }) => ($isActive ? '#fff' : '#777')};

  &:hover {
    color: #fff;
    text-decoration: none;
  }
`;

export default ({ steps, activeStep }: Props) => (
  <Container>
    <ProgressBar progress={(activeStep / steps.length) * 100} />
    <Steps>
      {steps.map((step, index) => (
        <Step key={step.label} $isActive={activeStep === index + 1} to={step.path}>
          {step.label}
        </Step>
      ))}
    </Steps>
  </Container>
);
