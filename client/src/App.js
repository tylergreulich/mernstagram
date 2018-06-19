import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Landing from './components/Auth/Landing/Landing';
import Login from './components/Auth/Login/Login';
import store from './store/store';

import HomeFeed from './components/Feed/HomeFeed/HomeFeed';

import './App.css';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/* TODO: Change root path depending on if user is logged in or not */}
            {/* User !signedin ? render => 'Landing' : 'HomeFeed' */}
            <Route exact path="/" component={Landing} />
            <div>
              <Route exact path="/login" component={Login} />
              <Route exact path="/feed" component={HomeFeed} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
