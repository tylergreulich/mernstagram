import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ThemeWrapper from '../../StyledComponents/MuiTheme';

import SignupFormContainer from '../../StyledComponents/SignupFormContainer';

class Landing extends Component {
  state = {
    email: '',
    password: '',
    fullname: '',
    username: '',
    errors: {}
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, fullname, username } = this.state;

    return (
      <SignupFormContainer>
        <ThemeWrapper>
          <Typography variant="display3">Sign Up</Typography>
          <TextField
            id="name"
            label="Email"
            value={email}
            margin="normal"
            name="email"
            onChange={this.onChangeHandler}
          />
          <TextField
            id="name"
            label="Full name"
            value={fullname}
            margin="normal"
            name="fullname"
            onChange={this.onChangeHandler}
          />
          <TextField
            id="name"
            label="Username"
            value={username}
            margin="normal"
            name="username"
            onChange={this.onChangeHandler}
          />
          <TextField
            id="name"
            label="Password"
            value={password}
            margin="normal"
            name="password"
            onChange={this.onChangeHandler}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '30rem'
            }}
          >
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                style={{ width: '12.5rem' }}
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                style={{ width: '12.5rem' }}
              >
                Or Login
              </Button>
            </Link>
          </div>
        </ThemeWrapper>
      </SignupFormContainer>
    );
  }
}

export default Landing;
