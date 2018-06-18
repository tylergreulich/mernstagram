import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ThemeWrapper from '../../StyledComponents/MuiTheme';

import SignupFormContainer from '../../StyledComponents/SignupFormContainer';
import ShowPassword from '../../StyledComponents/ShowPassword';

class Landing extends Component {
  state = {
    email: '',
    password: '',
    fullname: '',
    username: '',
    errors: {}
  };

  onSubmitHandler = event => {
    event.preventDefault();

    const { email, password, fullname, username } = this.state;
    const userData = {
      email,
      password,
      fullname,
      username
    };

    axios
      .post('/api/accounts/register', userData)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, fullname, username, errors } = this.state;
    console.log(errors);

    return (
      <SignupFormContainer onSubmit={this.onSubmitHandler}>
        <ThemeWrapper>
          <Typography variant="display3">Sign Up</Typography>
          <TextField
            error={errors ? errors.email : null}
            label={errors.email ? errors.email : 'Email'}
            value={email}
            margin="normal"
            name="email"
            onChange={this.onChangeHandler}
          />
          <TextField
            error={errors ? errors.fullname : null}
            label={errors.fullname ? errors.fullname : 'Full name'}
            value={fullname}
            margin="normal"
            name="fullname"
            onChange={this.onChangeHandler}
          />
          <TextField
            error={errors ? errors.name : null}
            label={errors.name ? errors.name : 'Username'}
            value={username}
            margin="normal"
            name="username"
            onChange={this.onChangeHandler}
          />
          <TextField
            type="password"
            error={errors ? errors.password : null}
            label={errors.password ? errors.password : 'Password'}
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
            {/* <Link to="/login"> */}
            <Button
              variant="contained"
              color="primary"
              style={{ width: '12.5rem' }}
              type="submit"
            >
              Sign Up
            </Button>
            {/* </Link> */}
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
