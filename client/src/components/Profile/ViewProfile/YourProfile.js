import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import PageTitle from '../../UI/PageTitle';
import Aux from '../../../hoc/Auxiliary';
import SettingsModal from '../SettingsModal/SettingsModal';

import Settings from '../../../images/icons/cog.svg';
import DefaultAvatar from '../../../images/default-avatar.png';
import ThemeWrapper from '../../StyledComponents/MuiTheme';
import Button from '@material-ui/core/Button';
import PostAvatar from '../../StyledComponents/PostAvatar';
import './ViewProfile.css';

import { getProfile } from '../../../store/actions/profileActions';

class ViewProfile extends Component {
  state = {
    isSettingsModal: false,
    isChangePassword: false
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfile(this.props.match.params.id);
    }
  }

  render() {
    const { profileMetrics } = this.props.profile;
    console.log(profileMetrics);
    const { username, avatar, id } = this.props.auth.user;

    let editProfile;

    if (id === this.props.match.params.id) {
      editProfile = (
        <Aux>
          <Link to={`${id}/edit-profile`} className="editProfileButton">
            <Button
              variant="contained"
              color="primary"
              style={{ width: '15rem', margin: 0 }}
            >
              Edit Profile
            </Button>
          </Link>

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
              <div style={{ display: 'flex', alignItems: 'center', flex: 0.3 }}>
                <PostAvatar
                  src={avatar || DefaultAvatar}
                  alt="Profile Avatar"
                  style={{ height: '15rem' }}
                />
              </div>
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
                <div className="metricsContainer">
                  {profileMetrics.posts ? (
                    <div className="metricsWrapper">
                      {' '}
                      <span>{profileMetrics.posts.length} Posts</span>{' '}
                      <span>{profileMetrics.followers.length} Followers</span>
                      <span>{profileMetrics.following.length} Following</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <span style={{ fontSize: '2.1rem', fontWeight: 400 }}>
                    {profileMetrics.fullname}
                  </span>
                </div>
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
  { getProfile }
)(withRouter(ViewProfile));