import React, { Component } from 'react';
import LikeCommentContainer from '../StyledComponents/LikeCommentContainer';
import HeartSvg from '../../images/icons/HeartSvg';
import Like from '../../images/icons/heart.svg';
import Comment from '../../images/icons/comment.svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { likePost } from '../../store/actions/postActions';

class LikeCommentCount extends Component {
  onLikeHandler = id => this.props.likePost(id);
  render() {
    const {
      post: { comments, likes, _id }
    } = this.props;
    return (
      <LikeCommentContainer>
        <div style={{ display: 'flex' }}>
          <HeartSvg className="fill" clicked={id => this.onLikeHandler(_id)} />
          <img
            src={Comment}
            alt="Comments"
            style={{ height: '3rem', flex: 0.2 }}
          />
        </div>
        <div style={{ display: 'flex', height: '3rem', alignItems: 'center' }}>
          <div style={{ fontSize: '1.2rem', flex: 0.1, textAlign: 'center' }}>
            {likes.length > 1
              ? `${likes.length} Likes`
              : likes.length === 1
                ? `${likes.length} Like`
                : 'No Likes'}
          </div>
          <div
            style={{
              fontSize: '1.2rem',
              marginLeft: '3rem'
            }}
          >
            {comments.length > 1
              ? `${comments.length} comments`
              : comments.length === 1
                ? `${comments.length} comment`
                : 'No Comments'}
          </div>
        </div>
      </LikeCommentContainer>
    );
  }
}

LikeCommentCount.propTypes = {
  likePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

export default connect(
  null,
  { likePost }
)(LikeCommentCount);
