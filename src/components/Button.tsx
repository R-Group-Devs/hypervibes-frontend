import styled from 'styled-components';

export default styled.button`
  padding: 0.5em 2em;
  display: block;
  background: rgba(255, 255, 255, 0.4);
  font-family: 'Courier New', monospace;
  font-size: 20px;
  color: #fff;
  border: none;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
`;
