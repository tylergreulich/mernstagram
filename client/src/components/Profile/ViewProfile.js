import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DefaultAvatar from '../../images/default-avatar.png';

class ViewProfile extends Component {
  render() {
    console.log(this.props);
    return (
      <section style={{ height: '20rem', backgroundColor: '#aaa' }}>
        <div>
          <img src={DefaultAvatar} alt="Profile Avatar" />
        </div>
        <div>
          <div>
            <span>{this.props.auth.user.username}</span>
            <Link to={`user/${this.props.auth.user.id}/edit-profile`}>
              Edit Profile
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(withRouter(ViewProfile));
