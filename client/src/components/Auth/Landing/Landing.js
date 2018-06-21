import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { registerUser } from '../../../store/actions/authActions';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ThemeWrapper from '../../StyledComponents/MuiTheme';

import SignupFormContainer from '../../StyledComponents/SignupFormContainer';
import ShowPassword from '../../StyledComponents/ShowPassword';
import PageTitle from '../../UI/PageTitle';
import Aux from '../../../hoc/Auxiliary';

class Landing extends Component {
  state = {
    email: '',
    password: '',
    fullname: '',
    username: '',
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmitHandler = event => {
    event.preventDefault();

    const { email, password, fullname, username } = this.state;
    const userData = {
      email,
      password,
      fullname,
      username
    };

    this.props.registerUser(userData, this.props.history);
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, fullname, username, errors } = this.state;

    return (
      <Aux>
        <PageTitle>Mernstagram</PageTitle>
        <SignupFormContainer onSubmit={this.onSubmitHandler}>
          <ThemeWrapper>
            <Typography variant="display3">Sign Up</Typography>
            <TextField
              error={errors.email}
              label={errors.email ? errors.email : 'Email'}
              value={email}
              margin="normal"
              name="email"
              onChange={this.onChangeHandler}
            />
            <TextField
              error={errors.fullname}
              label={errors.fullname ? errors.fullname : 'Full name'}
              value={fullname}
              margin="normal"
              name="fullname"
              onChange={this.onChangeHandler}
            />
            <TextField
              error={errors.name}
              label={errors.name ? errors.name : 'Username'}
              value={username}
              margin="normal"
              name="username"
              onChange={this.onChangeHandler}
            />
            <TextField
              type="password"
              error={errors.password}
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
              <Button
                variant="contained"
                color="primary"
                style={{ width: '12.5rem' }}
                type="submit"
              >
                Sign Up
              </Button>
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
      </Aux>
    );
  }
}

Landing.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Landing));
