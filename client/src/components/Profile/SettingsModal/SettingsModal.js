import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../../store/actions/authActions';

import './SettingsModal.css';
import TextField from '@material-ui/core/TextField';
import ThemeWrapper from '../../StyledComponents/MuiTheme';

class SettingsModal extends Component {
  state = {
    isChangePassword: false,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onLogoutHandler = event => {
    event.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/login');
  };

  render() {
    //TODO: ChangePassword.onClick ? changePasswordModal : null

    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <section className="backdrop" onClick={this.props.clicked} />
        <div className="modalContainer">
          <figure className="modalContent">
            <figcaption
              onClick={() => this.setState({ isChangePassword: true })}
            >
              Change Password
            </figcaption>
            <figcaption onClick={this.onLogoutHandler}>Logout</figcaption>
            <figcaption onClick={this.props.clicked}>Cancel</figcaption>
          </figure>
        </div>
      </div>
    );
  }
}

SettingsModal.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(SettingsModal));
