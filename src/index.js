import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import { reducer } from './reducers'


// const store = createStore(reducer, applyMiddleware(thunk, logger))
const store = createStore(reducer, applyMiddleware(thunk))


ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
