import styled from 'styled-components';

export const CommentContainer = styled.div`
  display: flex;
  height: 7rem;
  margin-top: 3rem;
`;

export const CommentAvatar = styled.img`
  height: 6rem;
  max-width: 6rem;
  border-radius: 3rem;
`;

export const CmntUsername = styled.span`
  font-size: 1.7rem;
  font-weight: 400;
  color: rgb(0, 156, 175);
`;

export const CmntText = styled.span`
  font-size: 1.5rem;
  height: 100%;
  margin: 0.5rem 0 0 0;
  color: #1e1d1d;
`;

export const CmntTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  flex: 1;
`;
