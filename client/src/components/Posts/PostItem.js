import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import './PostItem.css';
import HeartSvg from '../../images/icons/HeartSvg';

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
import MuiAddComment from '../StyledComponents/MuiAddComment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    account: '',
    errors: {}
  };

  componentWillMount() {
    this.props.getProfile(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onDeletePostHandler = id => this.props.deletePost(id);

  onLikePostHandler = id => this.props.likePost(id);

  onUnLikePostHandler = id => this.props.unLikePost(id);

  onSubmitHandler = (event, id) => {
    event.preventDefault();

    const { text, username, account } = this.state;

    const newComment = {
      text,
      username: this.props.auth.user.username,
      avatar: this.props.auth.user.avatar,
      account
    };

    this.props.addComment(id, newComment);
  };

  render() {
    const { post, auth, history, profile } = this.props;
    const { errors } = this.state;

    let comments;

    if (post.comments) {
      comments = post.comments.map(comment => (
        <div
          key={comment._id}
          style={{
            display: 'flex',
            height: '7rem',
            marginTop: '3rem'
          }}
        >
          <div>
            <img
              src={comment.avatar ? comment.avatar : DefaultImage}
              alt="Avatar"
              style={{
                height: '6rem',
                maxWidth: '6rem',
                borderRadius: '3rem'
              }}
              onClick={() => console.log(this.refs)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '2rem',
              flex: 1
            }}
          >
            <span
              style={{
                fontSize: '1.7rem',
                fontWeight: 400,
                color: 'rgb(0, 156, 175)'
              }}
              onClick={() => console.log(this.props)}
            >
              {comment.username}
            </span>
            <span
              style={{
                fontSize: '1.5rem',
                height: '100%',
                margin: '.5rem 0 0 0',
                color: '#1e1d1d'
              }}
            >
              {comment.text}
            </span>
          </div>
        </div>
      ));
    }

    let isUserPost;

    if (auth.isAuthenticated && post.account) {
      if (auth.user.id === post.account) {
        isUserPost = (
          <IconButton
            aria-label="Delete"
            style={{
              alignSelf: 'center',
              fontSize: '2.4rem',
              cursor: 'pointer',
              marginRight: '1.25rem'
            }}
            onClick={id => this.onDeletePostHandler(post._id)}
          >
            <DeleteIcon />
          </IconButton>
        );
      }
    }

    let isFollowing;

    // if (auth.isAuthenticated && post.account) {
    //   const filterPosts = this.props.post.posts.filter(post => post.account)
    // }

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
          {isUserPost}
        </div>

        <PostImageStyles src={post.postImage} alt="Broken Image" />
        <LikeCommentContainer>
          <div style={{ display: 'flex' }}>
            <HeartSvg
              className="fill"
              onClick={id => this.onLikePostHandler(post._id)}
            />
            <img
              src={Comment}
              alt="Comments"
              style={{ height: '3rem', flex: 0.2 }}
            />
          </div>
          <div
            style={{ display: 'flex', height: '3rem', alignItems: 'center' }}
          >
            <div style={{ fontSize: '1.2rem', flex: 0.1, textAlign: 'center' }}>
              {post.likes.length > 1
                ? `${post.likes.length} Likes`
                : post.likes.length === 1
                  ? `${post.likes.length} Like`
                  : 'No Likes'}
            </div>
            <div
              style={{
                fontSize: '1.2rem',
                marginLeft: '3rem'
              }}
            >
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
            <MuiAddComment>
              <TextField
                error={errors.text}
                label={errors.text ? errors.text : 'Add a comment...'}
                type="text"
                value={this.state.text}
                name="text"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }
                style={{ marginTop: '3rem', width: '80%' }}
              />
              <Button
                variant="contained"
                color="primary"
                style={{
                  margin: ' 0 0 1.5rem .4rem',
                  fontSize: '1.2rem',
                  width: '19.4%'
                }}
                type="submit"
              >
                Submit
              </Button>
            </MuiAddComment>
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
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProfile, deletePost, likePost, unLikePost, addComment }
)(withRouter(PostItem));
