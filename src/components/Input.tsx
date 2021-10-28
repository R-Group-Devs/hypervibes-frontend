import styled from 'styled-components';

export default styled.input<{ hasError?: boolean }>`
  padding: 0.3em 0;
  width: 100%;
  background: none;
  font-size: 20px;
  color: #fff;
  border: 0;
  border-bottom-width: 2px;
  border-style: solid;
  border-color: ${({ hasError }) => (hasError ? '#a72f2f' : '#fff')};
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? '#a72f2f' : '#17ffe3')};
    outline: none;
  }
`;
