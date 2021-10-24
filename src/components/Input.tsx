import styled from 'styled-components';

export default styled.input<{ hasError?: boolean }>`
  margin-top: 0.25em;
  padding: 0.5em 0.5em;
  width: 400px;
  background: rgba(255, 255, 255, 0.1);
  font-family: 'Courier New', monospace;
  font-size: 20px;
  color: #fff;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ hasError }) => (hasError ? '#a72f2f' : 'transparent')};

  &:focus {
    outline: none;
  }
`;
