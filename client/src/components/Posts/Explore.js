import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles, followProfile } from '../../store/actions/profileActions';
import DefaultAvatar from '../../images/default-avatar.png';
import Aux from '../../hoc/Auxiliary';
import Follow from '../Profile/Follow/Follow';

class Explore extends Component {
  state = {
    isFollowed: false
  };

  componentDidMount() {
    this.props.getProfiles();
  }

  onFollowHandler = id => {
    this.props.followProfile(id);
    this.setState({ isFollowed: true });
  };

  render() {
    const { profiles } = this.props.profile.profiles;

    let exploreProfiles;

    if (this.props.profile) {
      exploreProfiles = this.props.profile.profiles.map(profile => (
        <section key={profile._id}>
          <div>
            <figure
              style={{
                height: '6.1rem',
                width: '60rem',
                display: 'flex',
                marginBottom: '1.5rem'
              }}
            >
              <div>
                <img
                  src={profile.avatar || DefaultAvatar}
                  alt="Avatar"
                  style={{ borderRadius: '30px', height: '6rem' }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  marginLeft: '1.4rem'
                }}
              >
                <span>{profile.fullname}</span>
                <span>{profile.username}</span>
              </div>
            </figure>
          </div>
          <div>
            <Follow
              clicked={id => this.onFollowHandler(profile._id)}
              isFollowed={this.state.isFollowed}
            />
          </div>
        </section>
      ));
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <figure>
          <h3>Welcome to Mernstagram</h3>
          <p>Follow accounts to see photos in your feed</p>
        </figure>
        {exploreProfiles}
      </div>
    );
  }
}

Explore.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  followProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles, followProfile }
)(Explore);
