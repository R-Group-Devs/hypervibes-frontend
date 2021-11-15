import styled from 'styled-components';

export default styled.button<{ size?: 'sm' | 'md'; inline?: boolean }>`
  padding: ${({ size }) => (size === 'sm' ? '0.25em 1em' : '0.4em 2em')};
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  background: #000;
  font-size: ${({ size }) => (size === 'sm' ? '14px' : '12px')};
  line-height: ${({ size }) => (size === 'sm' ? '18px' : '18px')};
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
    background: #000;
    cursor: pointer;
  }
`;
