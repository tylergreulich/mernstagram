import React from 'react';
import DefaultImage from '../../images/default-avatar.png';
import { withRouter } from 'react-router-dom';

import {
  CommentContainer,
  CommentAvatar,
  CmntTextWrapper,
  CmntUsername,
  CmntText
} from '../StyledComponents/Comments/Comments';

const comments = ({ post: { comments }, history }) => {
  let commentInfo;

  if (comments) {
    commentInfo = comments.map(comment => (
      <CommentContainer key={comment._id}>
        <div>
          <CommentAvatar
            src={comment.avatar ? comment.avatar : DefaultImage}
            alt="Avatar"
            onClick={() => history.push(`/user/${comment.account}`)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <CmntTextWrapper>
          <CmntUsername>{comment.username}</CmntUsername>
          <CmntText>{comment.text}</CmntText>
        </CmntTextWrapper>
      </CommentContainer>
    ));
  }

  return <div>{commentInfo}</div>;
};

export default withRouter(comments);
