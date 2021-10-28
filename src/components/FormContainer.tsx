import React from 'react';
import styled from 'styled-components';
import FormSteps from './FormSteps';
import hyperVibesLogoPatternVertical from '../assets/images/hypervibes-logo-pattern-vertical.png';
import hyperVibesLogoPatternHorizontal from '../assets/images/hypervibes-logo-pattern-horizontal.png';
import stepOneIcon from '../assets/images/icons/step-1.svg';
import star from '../assets/images/star.svg';

interface Props {
  steps: string[];
  activeStep: number;
  children: React.ReactNode;
}

const BackgroundContainerVertical = styled.div`
  padding-left: 3em;
  background: url(${hyperVibesLogoPatternVertical}) left top repeat-y;
`;

const BackgroundContainerHorizontal = styled.div`
  padding-bottom: 3em;
  margin-left: -3em;
  background: url(${hyperVibesLogoPatternHorizontal}) left bottom repeat-x;
`;

const Container = styled.div`
  position: relative;
  background: #000;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.8);
  border: 1px solid #17ffe3;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5em 4em;
  width: 80vw;
  max-width: 784px;
`;

const ThreeLinePattern = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  margin-top: 8px;
`;

const LinePattern = styled.div`
  width: 90%;
  max-width: 704px;
  border-top: 1px solid #17ffe3;
`;

const StepIcon = styled.img`
  position: absolute;
  top: 1em;
  right: 1em;
`;

const Star = styled.img`
  position: absolute;
  bottom: 1.5em;
  left: 1.5em;
`;

export default ({ steps, activeStep, children }: Props) => (
  <>
    <FormSteps steps={steps} activeStep={activeStep} />

    <BackgroundContainerHorizontal>
      <BackgroundContainerVertical>
        <Container>
          <ThreeLinePattern>
            <LinePattern />
            <LinePattern />
            <LinePattern />
          </ThreeLinePattern>
          <Star src={star} alt="" />

          <Content>
            {activeStep === 1 && <StepIcon src={stepOneIcon} alt="1" />}
            {children}
          </Content>
        </Container>
      </BackgroundContainerVertical>
    </BackgroundContainerHorizontal>
  </>
);
