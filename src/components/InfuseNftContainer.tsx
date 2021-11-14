import styled from 'styled-components';
import borderPatternVertical from '../assets/images/infuse-nft-border-pattern-vertical.png';
import borderPatternHorizontal from '../assets/images/infuse-nft-border-pattern-horizontal.png';
import star from '../assets/images/star.svg';

interface Props {
  name: string;
  children: React.ReactNode;
}

const BackgroundContainerVertical = styled.div`
  position: relative;
  padding-left: 3em;
  background: url(${borderPatternVertical}) left bottom no-repeat;
  background-size: 24px 388px;
`;

const BackgroundContainerHorizontal = styled.div`
  padding-bottom: 3em;
  margin-left: -3em;
  background: url(${borderPatternHorizontal}) left bottom no-repeat;
  background-size: 388px 24px;
`;

const BorderContainer = styled.div`
  position: relative;
  padding: 1px;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.8);
  background: linear-gradient(#00e0ff, #000);
`;

const Container = styled.div`
  min-height: 600px;
  background: #000;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5em 4.5em 4.5em;
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
  background: #00e0ff;
  writing-mode: vertical-rl;
`;

const ThreeLinePattern = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  padding-top: 8px;
`;

const LinePattern = styled.div`
  width: 100%;
  border-top: 1px solid #06e8f8;
`;

const Star = styled.img`
  position: absolute;
  bottom: 1.5em;
  left: 1.5em;
`;

export default ({ name, children }: Props) => (
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

          <Content>{children}</Content>
        </Container>
      </BorderContainer>
    </BackgroundContainerVertical>
  </BackgroundContainerHorizontal>
);
