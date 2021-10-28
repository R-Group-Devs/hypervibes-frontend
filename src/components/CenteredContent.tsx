import styled from 'styled-components';

export default styled.div`
  display: flex;
  position: relative;
  top: -10em;
  margin: 0 auto;
  max-width: 1200px;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  & * {
    pointer-events: auto;
  }
`;
