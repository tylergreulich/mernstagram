import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import PageTitle from '../UI/PageTitle';
import Aux from '../../hoc/Auxiliary';

import Settings from '../../images/icons/cog.svg';
import DefaultAvatar from '../../images/default-avatar.png';
import PostAvatar from '../StyledComponents/PostAvatar';
import { getUserPostInfo } from '../../store/actions/profileActions';

class ViewProfile extends Component {
  componentDidMount() {
    this.props.getUserPostInfo(this.props.match.params.id);
  }

  render() {
    const posts = this.props.profile.postInfo;

    if (this.props.profile.posts !== undefined || null) {
      console.log(this.props.profile.postInfo.posts);
    }

    return (
      <Aux>
        <PageTitle>{this.props.auth.user.username}'s Profile</PageTitle>
        <section
          style={{ height: '20rem', backgroundColor: '#aaa', display: 'flex' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PostAvatar
              src={this.props.auth.user.avatar || DefaultAvatar}
              alt="Profile Avatar"
              style={{ height: '15rem' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <span>{this.props.auth.user.username}</span>
              <Link to={`user/${this.props.auth.user.id}/edit-profile`}>
                Edit Profile
              </Link>
              {this.props.auth.user.id === this.props.match.params.id ? (
                <img src={Settings} alt="Settings" style={{ height: '3rem' }} />
              ) : null}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              {postCount > 0 ? (
                <span>{postCount} Posts</span>
              ) : (
                <span>This user has no posts</span>
              )}
              {postInfo.followers.length > 0 ? (
                <span>{postInfo.followers.length} Followers</span>
              ) : (
                <span>This user has no followers</span>
              )}
              {postInfo.following.length > 0 ? (
                <span>{postInfo.following.length} Following</span>
              ) : (
                <span>This user is not following anyone</span>
              )}
            </div>
          </div>
        </section>
      </Aux>
    );
  }
}

ViewProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getUserPostInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUserPostInfo }
)(withRouter(ViewProfile));
