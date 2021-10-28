import React from 'react';
import styled from 'styled-components';
import hyperVibesLogoPatternVertical from '../assets/images/hypervibes-logo-pattern-vertical.png';
import hyperVibesLogoPatternHorizontal from '../assets/images/hypervibes-logo-pattern-horizontal.png';
import threeLineBg from '../assets/images/three-line-bg.png';
import stepOneIcon from '../assets/images/icons/step-1.svg';

interface Props {
  step: number;
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
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 6em 4em;
  width: 80vw;
  max-width: 784px;
  background: url(${threeLineBg}) 0 8px no-repeat;
  border: 1px solid #17ffe3;
`;

const StepIcon = styled.img`
  position: absolute;
  top: 1em;
  right: 1em;
`;

export default ({ step, children }: Props) => (
  <BackgroundContainerHorizontal>
    <BackgroundContainerVertical>
      <Container>
        <Content>
          {step === 1 && <StepIcon src={stepOneIcon} alt="1" />}
          {children}
        </Content>
      </Container>
    </BackgroundContainerVertical>
  </BackgroundContainerHorizontal>
);
