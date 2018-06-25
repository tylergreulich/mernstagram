import React from 'react';
import {
  MetricsContainer,
  MetricsWrapper
} from '../../StyledComponents/Profile/Profile';
import Aux from '../../../hoc/Auxiliary';

const profileMetrics = ({
  profileMetrics: { posts, followers, fullname, following }
}) => {
  return (
    <Aux>
      <MetricsContainer>
        {posts ? (
          <MetricsWrapper>
            {' '}
            <span>{posts.length} Posts</span>{' '}
            <span>{followers.length} Followers</span>
            <span>{following.length} Following</span>
          </MetricsWrapper>
        ) : null}
      </MetricsContainer>
      <div>
        <span style={{ fontSize: '2.1rem', fontWeight: 400 }}>{fullname}</span>
      </div>
    </Aux>
  );
};

export default profileMetrics;
