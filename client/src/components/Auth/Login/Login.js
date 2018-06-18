import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ThemeWrapper from '../../StyledComponents/MuiTheme';
import Button from '@material-ui/core/Button';
import SignupFormContainer from '../../StyledComponents/SignupFormContainer';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };
  render() {
    const { email, password } = this.state;

    return (
      <SignupFormContainer>
        <Typography variant="display3">Login</Typography>
        <ThemeWrapper>
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
            label="Password"
            value={password}
            margin="normal"
            name="password"
            onChange={this.onChangeHandler}
          />
          <Link to="/feed">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </ThemeWrapper>
      </SignupFormContainer>
    );
  }
}

export default Login;
