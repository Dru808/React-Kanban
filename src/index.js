/*jshint esversion: 6*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  PrivateRoute
} from 'react-router-dom';
import cardListReducers from './reducers';
import ReduxThunk from 'redux-thunk';
import App from './containers/App';
import OtherCardList from './containers/OtherCardList/index.js';
import Login from './containers/Login';
import './index.css';




const store = createStore(
  cardListReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/othercardlist">Other Card List</Link>
          <Link to="/login">Login</Link>
        </div>
        <Route exact path="/" component={App}/>
        <Route path="/othercardlist" component={OtherCardList}/>
        <Route path="/login" component={Login}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);