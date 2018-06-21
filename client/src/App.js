import React, { Component } from 'react';

import Landing from './components/Auth/Landing/Landing';
import Login from './components/Auth/Login/Login';
import HomeFeed from './components/Feed/HomeFeed/HomeFeed';
import Navigation from './components/Navigation/Navigation';
import ViewProfile from './components/Profile/ViewProfile';

import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute/PrivateRoute';
// import PrivateGroup from './components/Auth/PrivateGroup/PrivateGroup';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // TODO: Clear current profile
    window.location.href('/login');
  }
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
              <Navigation />
              <Switch>
                <PrivateRoute exact path="/feed" component={HomeFeed} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/user/:id" component={ViewProfile} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
