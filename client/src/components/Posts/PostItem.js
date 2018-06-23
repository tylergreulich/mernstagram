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
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { getProfile } from '../../store/actions/profileActions';
import {
  deletePost,
  likePost,
  unLikePost,
  addComment
} from '../../store/actions/postActions';

import Like from '../../images/icons/heart.svg';
import Comment from '../../images/icons/comment.svg';

class PostItem extends Component {
  state = {
    text: '',
    avatar: '',
    account: ''
  };

  componentWillMount() {
    this.props.getProfile(this.props.auth.user.id);
  }

  onDeletePostHandler = id => this.props.deletePost(id);

  onLikePostHandler = id => this.props.likePost(id);

  onUnLikePostHandler = id => this.props.unLikePost(id);

  onSubmitHandler = (event, id) => {
    event.preventDefault();

    const { text, username, avatar, account } = this.state;

    const newComment = {
      text,
      username: this.props.auth.user.username,
      avatar,
      account
    };

    this.props.addComment(id, newComment);
    this.setState({ text: ' ' });
  };

  render() {
    const { post, auth, history, profile } = this.props;

    let comments;
    console.log(this.props);

    if (post.comments) {
      comments = post.comments.map(comment => (
        <div key={comment._id} style={{ display: 'flex', marginTop: '3rem' }}>
          <div>
            <img
              src={comment.avatar || DefaultImage}
              alt="Avatar"
              style={{ height: '5rem', borderRadius: '3rem' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{comment.username}</span>
            <span>{comment.text}</span>
          </div>
        </div>
      ));
    }

    let isUserPost;

    if (auth.isAuthenticated && post.account) {
      if (auth.user.id === post.account) {
        isUserPost = (
          <Tooltip id="tooltip-icon" title="Delete">
            <IconButton
              aria-label="Delete"
              style={{
                alignSelf: 'center',
                fontSize: '2.4rem',
                marginLeft: '30.5rem',
                cursor: 'pointer'
              }}
              onClick={id => this.onDeletePostHandler(post._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        );
      }
    }

    let isFollowing;

    // if (auth.isAuthenticated && post.account) {
    //   const filterPosts = this.props.post.posts.filter(post => post.account)
    // }

    return (
      <PostContainer>
        <div style={{ display: 'flex' }}>
          <UserContainer
            onClick={() => history.push(`/user/${this.props.post.account}`)}
            style={{ cursor: 'pointer', flex: 0.7 }}
          >
            <PostAvatar src={post.avatar || DefaultImage} alt="Avatar" />
            <Username>{post.username}</Username>
          </UserContainer>
          {isUserPost}
        </div>

        <PostImageStyles src={post.postImage} alt="Broken Image" />
        <LikeCommentContainer>
          <div style={{ display: 'flex' }}>
            <img
              src={Like}
              alt="Like Post"
              style={{ height: '3rem', cursor: 'pointer' }}
              onClick={id => this.onLikePostHandler(post._id)}
            />
            <img
              src={Comment}
              alt="Comments"
              style={{ height: '3rem', flex: 0.2 }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
              {post.likes.length > 1
                ? `${post.likes.length} Likes`
                : post.likes.length === 1
                  ? `${post.likes.length} Like`
                  : 'No Likes'}
            </div>
            <div style={{ fontSize: '1.2rem', margin: '1rem 0 0 1.25rem' }}>
              {post.comments.length > 1
                ? `${post.comments.length} comments`
                : post.comments.length === 1
                  ? `${post.comments.length} comment`
                  : 'No Comments'}
            </div>
          </div>
        </LikeCommentContainer>
        <div style={{ padding: '2rem' }}>
          <form onSubmit={(event, id) => this.onSubmitHandler(event, post._id)}>
            <AddComment
              type="text"
              placeholder="Add a comment..."
              value={this.state.text}
              name="text"
              onChange={event =>
                this.setState({ [event.target.name]: event.target.value })
              }
            />
            <button type="submit">Submit</button>
          </form>
          <span>{comments}</span>
        </div>
      </PostContainer>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unLikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile, deletePost, likePost, unLikePost, addComment }
)(withRouter(PostItem));
