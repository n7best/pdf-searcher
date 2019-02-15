import { setConfig } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'redux-react-hook';

import App from './Container/App';
import { makeStore } from './store';

// global styles
import './style.css';

// for react hooks
setConfig({
  ignoreSFC: true,
});

const store = makeStore();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
