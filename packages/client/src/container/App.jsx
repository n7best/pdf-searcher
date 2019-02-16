import React from 'react';
import { hot } from 'react-hot-loader/root';
import RequireAuth from 'Components/RequireAuth';
import Header from 'Components/Header';
import Login from './LogIn';
import Dashboard from './Dashboard';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
          <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/dashboard" exact component={RequireAuth(Dashboard)}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default hot(App)