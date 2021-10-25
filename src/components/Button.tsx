import styled from 'styled-components';

export default styled.button<{ size?: 'sm' | 'md'; inline?: boolean }>`
  padding: ${({ size }) => (size === 'sm' ? '0.25em 1em' : '0.5em 2em')};
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  background: rgba(255, 255, 255, 0.4);
  font-family: 'Courier New', monospace;
  font-size: ${({ size }) => (size === 'sm' ? '14px' : '20px')};
  color: #fff;
  border: none;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
`;
