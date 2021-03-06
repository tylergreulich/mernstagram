import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import PageTitle from '../../UI/PageTitle';
import Aux from '../../../hoc/Auxiliary';
import SettingsModal from '../SettingsModal/SettingsModal';

import Settings from '../../../images/icons/cog.svg';
import DefaultAvatar from '../../../images/default-avatar.png';
import ThemeWrapper from '../../StyledComponents/MuiTheme/MuiTheme';
import Button from '@material-ui/core/Button';
import {
  PostAvatar,
  AvatarContainer
} from '../../StyledComponents/Profile/Profile';
import './ViewProfile.css';

import {
  getProfile,
  uploadAvatar
} from '../../../store/actions/profileActions';

import EditProfile from './EditProfile';
import UploadAvatar from './UploadAvatar';
import ProfileMetrics from './ProfileMetrics';

class ViewProfile extends Component {
  state = {
    isSettingsModal: false,
    isChangePassword: false,
    avatar: null,
    uploaded: false
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfile(this.props.match.params.id);
    }
  }

  fileChangedHandler = event => {
    this.setState({
      avatar: event.target.files[0]
    });
  };

  onSubmitHandler = (event, id) => {
    event.preventDefault();
    if (this.state.avatar) {
      const fd = new FormData();
      fd.append('avatar', this.state.avatar, this.state.avatar.name);
      this.props.uploadAvatar(id, fd);
      this.setState({ uploaded: true });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  render() {
    const { profileMetrics } = this.props.profile;
    const { username, avatar, id } = this.props.auth.user;
    const { params } = this.props.match;

    let editProfile;

    if (id === this.props.match.params.id) {
      editProfile = (
        <Aux>
          <EditProfile id={id} params={params} />
          <div>
            <img
              src={Settings}
              alt="Settings"
              style={{ height: '3.9rem', cursor: 'pointer' }}
              onClick={() => this.setState({ isSettingsModal: true })}
            />
          </div>
        </Aux>
      );
    }

    return (
      <Aux>
        <PageTitle>{`${username}'s Profile` || 'Mernstagram'}</PageTitle>
        {this.state.isSettingsModal ? (
          <SettingsModal
            clicked={() => this.setState({ isSettingsModal: false })}
          />
        ) : null}
        <ThemeWrapper>
          <section className="profileContainer">
            <div className="profileWrapper">
              <AvatarContainer>
                <PostAvatar
                  src={
                    profileMetrics.avatar
                      ? profileMetrics.avatar
                      : DefaultAvatar
                  }
                  alt="Profile Avatar"
                  style={{ height: '18rem', maxWidth: '18rem' }}
                />
                <UploadAvatar
                  uploadFile={(event, id) =>
                    this.onSubmitHandler(event, this.props.auth.user.id)
                  }
                  changeFile={this.fileChangedHandler}
                  name="avatar"
                />
              </AvatarContainer>
              <div style={{ flex: 0.7, padding: '2rem' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                  <span
                    style={{ fontSize: '3.5rem', fontWeight: 100, flex: 0.3 }}
                  >
                    {username}
                  </span>
                  {id === this.props.match.params.id ? (
                    <div style={{ display: 'flex' }}>{editProfile}</div>
                  ) : null}
                </div>
                <ProfileMetrics profileMetrics={profileMetrics} />
              </div>
            </div>
          </section>
        </ThemeWrapper>
      </Aux>
    );
  }
}

ViewProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile, uploadAvatar }
)(withRouter(ViewProfile));
