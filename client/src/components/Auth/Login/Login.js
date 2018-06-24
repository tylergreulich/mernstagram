import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../../store/actions/authActions';

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

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/feed');
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmitHandler = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <SignupFormContainer onSubmit={this.onSubmitHandler}>
        <Typography variant="display3">Login</Typography>
        <ThemeWrapper>
          <TextField
            error={errors.email}
            label={errors.email ? errors.email : 'Email'}
            value={email}
            margin="normal"
            name="email"
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
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </ThemeWrapper>
      </SignupFormContainer>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
