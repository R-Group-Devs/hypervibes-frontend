import styled from 'styled-components';
import discordIcon from '../assets/images/icons/discord.svg';
import twitterIcon from '../assets/images/icons/twitter.svg';
import githubIcon from '../assets/images/icons/github.svg';

const Container = styled.div`
  position: fixed;
  top: 570px;
  left: 32px;
  display: flex;
  transform: rotate(-90deg);
  transform-origin: top left;
`;

const SocialLink = styled.a`
  margin-right: 32px;
  display: inline-block;
`;

export default () => (
  <Container>
    <SocialLink
      href="https://discord.gg/E9hsASB8Hk"
      target="_blank"
      rel="noreferrer"
    >
      <img src={discordIcon} alt="Discord" />
    </SocialLink>

    <SocialLink
      href="https://twitter.com/raribledao"
      target="_blank"
      rel="noreferrer"
    >
      <img src={twitterIcon} alt="Twitter" />
    </SocialLink>

    <SocialLink
      href="https://github.com/R-Group-Devs/hypervibes-contracts"
      target="_blank"
      rel="noreferrer"
    >
      <img src={githubIcon} alt="GitHub" />
    </SocialLink>
  </Container>
);
