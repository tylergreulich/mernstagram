import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import './PostItem.css';
import DefaultImage from '../../images/default-avatar.png';
import { PostAvatar } from '../StyledComponents/Profile/Profile';
import Username from '../StyledComponents/Username';
import UserContainer from '../StyledComponents/UserContainer';
import PostContainer from '../StyledComponents/Post/PostContainer';
import PostImageStyles from '../StyledComponents/Post/PostImageStyles';
import DeletePost from './DeletePost';
import Tooltip from '@material-ui/core/Tooltip';
import { getProfile } from '../../store/actions/profileActions';
import { unLikePost } from '../../store/actions/postActions';

import AddComment from './AddComment';
import LikeCommentCount from './LikeCommentCount';
import Comments from './Comments';

class PostItem extends Component {
  componentWillMount() {
    this.props.getProfile(this.props.auth.user.id);
  }

  onUnLikePostHandler = id => this.props.unLikePost(id);

  render() {
    const { post, auth, history, profile } = this.props;

    return (
      <PostContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <UserContainer
            onClick={() => history.push(`/user/${this.props.post.account}`)}
            style={{ cursor: 'pointer' }}
          >
            <PostAvatar src={post.avatar || DefaultImage} alt="Avatar" />
            <Username>{post.username}</Username>
          </UserContainer>
          <DeletePost auth={auth} post={post} />
        </div>

        <PostImageStyles src={post.postImage} alt="Broken Image" />
        <LikeCommentCount post={post} />

        <div style={{ padding: '2rem' }}>
          <AddComment post={post} auth={auth} />
          <span>
            <Comments post={post} />
          </span>
        </div>
      </PostContainer>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  unLikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile, unLikePost }
)(withRouter(PostItem));
