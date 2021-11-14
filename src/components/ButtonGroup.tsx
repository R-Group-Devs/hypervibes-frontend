import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 3em;

  & button {
    display: inline-block;
    margin-right: 4em;

    &:last-child {
      margin-right: 0;
    }
  }
`;
