import styled from 'styled-components';
import FormSteps, { FormStep } from './FormSteps';
import borderPatternVertical from '../assets/images/create-realm-border-pattern-vertical.png';
import borderPatternHorizontal from '../assets/images/create-realm-border-pattern-horizontal.png';
import stepOneIcon from '../assets/images/icons/step-1.svg';
import stepTwoIcon from '../assets/images/icons/step-2.svg';
import stepThreeIcon from '../assets/images/icons/step-3.svg';
import stepFourIcon from '../assets/images/icons/step-4.svg';
import star from '../assets/images/star.svg';

interface Props {
  name: string;
  steps: FormStep[];
  activeStep: number;
  children: React.ReactNode;
}

const BackgroundContainerVertical = styled.div`
  position: relative;
  padding-left: 3em;
  background: url(${borderPatternVertical}) left top repeat-y;
  background-size: 24px 388px;
`;

const BackgroundContainerHorizontal = styled.div`
  padding-bottom: 3em;
  margin-left: -3em;
  background: url(${borderPatternHorizontal}) left bottom repeat-x;
  background-size: 388px 24px;
`;

const BorderContainer = styled.div`
  position: relative;
  padding: 1px;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.8);
  background: linear-gradient(#17ffe3, #000);
`;

const Container = styled.div`
  background: #000;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5em 4em 4.5em;
  width: 80vw;
  max-width: 784px;
`;

const NameTab = styled.div`
  position: absolute;
  top: 0;
  right: -44px;
  padding: 20px 10px;
  width: 44px;
  display: inline-block;
  font-family: '3616 Grammastile', sans-serif;
  font-size: 14px;
  color: #000;
  background: #bcff67;
  writing-mode: vertical-rl;
`;

const ThreeLinePattern = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2px;
`;

const LinePattern = styled.div`
  margin-top: 6px;
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

export default ({ name, steps, activeStep, children }: Props) => (
  <>
    <FormSteps steps={steps} activeStep={activeStep} />

    <BackgroundContainerHorizontal>
      <BackgroundContainerVertical>
        <NameTab>{name}</NameTab>
        <BorderContainer>
          <Container>
            <ThreeLinePattern>
              <LinePattern />
              <LinePattern />
              <LinePattern />
            </ThreeLinePattern>
            <Star src={star} alt="" />

            <Content>
              {activeStep === 1 && <StepIcon src={stepOneIcon} alt="1" />}
              {activeStep === 2 && <StepIcon src={stepTwoIcon} alt="2" />}
              {activeStep === 3 && <StepIcon src={stepThreeIcon} alt="3" />}
              {activeStep === 4 && <StepIcon src={stepFourIcon} alt="3" />}
              {children}
            </Content>
          </Container>
        </BorderContainer>
      </BackgroundContainerVertical>
    </BackgroundContainerHorizontal>
  </>
);
