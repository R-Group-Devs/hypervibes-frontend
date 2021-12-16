import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './App';
import './polyfills';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
