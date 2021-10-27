import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import App from './App';

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
