import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import DefaultImage from '../../images/default-avatar.png';
import PostAvatar from '../StyledComponents/PostAvatar';
import Username from '../StyledComponents/Username';
import UserContainer from '../StyledComponents/UserContainer';
import PostContainer from '../StyledComponents/PostContainer';
import PostImageStyles from '../StyledComponents/PostImageStyles';
import LikeCommentContainer from '../StyledComponents/LikeCommentContainer';
import AddComment from '../StyledComponents/AddComment';

import Like from '../../images/icons/heart.svg';
import Comment from '../../images/icons/comment.svg';

class PostItem extends Component {
  render() {
    const { post, auth, history } = this.props;

    let comments;

    if (post.comments) {
      comments = post.comments.map(comment => (
        <div>
          <span key={comment._id}>{comment.length}</span>
        </div>
      ));
    }

    return (
      <PostContainer>
        <UserContainer
          onClick={() => history.push(`/user/${this.props.post.account}`)}
          style={{ cursor: 'pointer' }}
        >
          <PostAvatar src={post.avatar || DefaultImage} alt="Avatar" />
          <Username>{post.username}</Username>
        </UserContainer>
        <PostImageStyles src={post.postImage} alt="Broken Image" />
        <LikeCommentContainer>
          <div>
            <img
              src={Like}
              alt="Like Post"
              style={{ height: '3rem', marginRight: '2rem' }}
            />
            <img src={Comment} alt="Comments" style={{ height: '3rem' }} />
          </div>

          <div style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
            {post.likes.length > 0 ? post.likes.length : 'No Likes'}
          </div>
        </LikeCommentContainer>
        <div style={{ padding: '2rem' }}>
          <AddComment type="text" placeholder="Add a comment..." />
          <span>{comments}</span>
        </div>
      </PostContainer>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(withRouter(PostItem));
