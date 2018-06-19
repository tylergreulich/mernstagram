import React, { Component } from 'react';

import Landing from './components/Auth/Landing/Landing';
import Login from './components/Auth/Login/Login';
import HomeFeed from './components/Feed/HomeFeed/HomeFeed';
import Navigation from './components/Navigation/Navigation';
import ViewProfile from './components/Profile/ViewProfile';

import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser } from './store/actions/authActions';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/* TODO: Change root path depending on if user is logged in or not */}
            {/* User !signedin ? render => 'Landing' : 'HomeFeed' */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <div>
              <Navigation clicked={console.log(this.props)} />
              <Route exact path="/feed" component={HomeFeed} />
              <Route exact path="/user/:id" component={ViewProfile} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
