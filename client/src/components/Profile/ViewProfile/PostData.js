import React from 'react';
import Typography from '@material-ui/core/Typography';

const postData = ({ profileMetrics: { posts }, isAuthenticated }) => {
  let postInfo;

  if (posts) {
    if (posts.length === 0) {
      postInfo = (
        <Typography
          variant="display1"
          style={{ textAlign: 'center', marginTop: '5rem' }}
        >
          This user has no posts
        </Typography>
      );
    } else {
      const postsList = posts.map(post => {
        postInfo = (
          <figure>
            <img src={post.postImage} alt="Post Image" />
          </figure>
        );
      });
    }
  }

  return <div>{postInfo}</div>;
};

export default postData;
