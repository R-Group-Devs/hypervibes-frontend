import styled from 'styled-components';
import discordIcon from '../assets/images/icons/discord.svg';
import twitterIcon from '../assets/images/icons/twitter.svg';
import githubIcon from '../assets/images/icons/github.svg';

const Container = styled.div`
  position: absolute;
  top: 570px;
  left: 32px;
  display: flex;
  column-gap: 32px;
  transform: rotate(-90deg);
  transform-origin: top left;
`;

export default () => (
  <Container>
    <a href="https://discord.gg/E9hsASB8Hk" target="_blank" rel="noreferrer">
      <img src={discordIcon} alt="Discord" />
    </a>

    <a href="https://twitter.com/raribledao" target="_blank" rel="noreferrer">
      <img src={twitterIcon} alt="Twitter" />
    </a>

    <a href="https://github.com/R-Group-Devs/hypervibes-contracts" target="_blank" rel="noreferrer">
      <img src={githubIcon} alt="GitHub" />
    </a>
  </Container>
);
