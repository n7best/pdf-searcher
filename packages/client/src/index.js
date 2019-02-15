import { setConfig } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Container/App';

// for react hooks
setConfig({
  ignoreSFC: true,
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);