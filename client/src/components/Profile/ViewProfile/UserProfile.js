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

import Follow from '../Follow/Follow';
import UnFollow from '../UnFollow/UnFollow';

import {
  getProfile,
  followProfile
} from '../../../store/actions/profileActions';

class ViewProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfile(this.props.match.params.id);
    }
  }

  render() {
    const { profileMetrics } = this.props.profile;
    const { isAuthenticated, user: currentUser } = this.props.auth;

    let isFollow;

    if (isAuthenticated && profileMetrics.followers) {
      const isFollowing = profileMetrics.followers.filter(
        follower => follower.user === currentUser.id
      );
      if (isFollowing.length) {
        isFollow = <UnFollow />;
      } else {
        isFollow = <Follow />;
      }
    }

    return (
      <Aux>
        <PageTitle>
          {`${profileMetrics.username}'s Profile` || 'Mernstagram'}
        </PageTitle>
        <ThemeWrapper>
          <section className="profileContainer">
            <div className="profileWrapper">
              <div style={{ display: 'flex', alignItems: 'center', flex: 0.3 }}>
                <PostAvatar
                  src={profileMetrics.avatar || DefaultAvatar}
                  alt="Profile Avatar"
                  style={{ height: '15rem' }}
                />
              </div>
              <div style={{ flex: 0.7, padding: '2rem' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                  <span
                    style={{ fontSize: '3.5rem', fontWeight: 100, flex: 0.3 }}
                  >
                    {profileMetrics.username}
                  </span>
                  <span>{isFollow}</span>
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
  getProfile: PropTypes.func.isRequired,
  followProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile, followProfile }
)(withRouter(ViewProfile));
