import styled from 'styled-components';

export default styled.button<{ size?: 'sm' | 'md'; inline?: boolean }>`
  padding: ${({ size }) => (size === 'sm' ? '0.25em 1em' : '0.4em 2em')};
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  background: rgba(255, 255, 255, 0.4);
  font-size: ${({ size }) => (size === 'sm' ? '14px' : '12px')};
  font-family: ${({ size }) =>
    size === 'sm'
      ? "'Decima Mono', 'Courier New', monospace"
      : "'3616 Grammastile', sans-serif"};
  color: #fff;
  border: none;

  &:disabled {
    opacity: 0.5;
  }

  &:hover:not([disabled]) {
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
`;
