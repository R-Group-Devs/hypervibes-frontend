import styled from 'styled-components';

interface Props {
  steps: string[];
  activeStep: number;
}

const Container = styled.div`
  position: absolute;
  margin-top: -3.75em;
  width: 80vw;
  max-width: 784px;
  z-index: 1;
`;

const ProgressBar = styled.div<{ progress: number }>`
  margin-bottom: 15px;
  height: 6px;
  background: linear-gradient(to right, #bcff67 0%, transparent ${({ progress }) => progress}%);
  border-radius: 20px;
`;

const Steps = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Step = styled.div<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  color: ${({ isActive }) => (isActive ? '#fff' : '#777')};
  text-transform: uppercase;
`;

export default ({ steps, activeStep }: Props) => (
  <Container>
    <ProgressBar progress={(activeStep / steps.length) * 100} />
    <Steps>
      {steps.map((step, index) => (
        <Step isActive={activeStep === index + 1}>{step}</Step>
      ))}
    </Steps>
  </Container>
);
