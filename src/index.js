import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App';
import { GlobalStyle } from './styles/GlobalStyle';

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);

