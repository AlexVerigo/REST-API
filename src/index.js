import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './modules/home/HomePage';
import Registration from './modules/login/Registration';
import { Provider } from 'react-redux';
import store from './redux/store';

import './style.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route path="/login" component={Registration} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
