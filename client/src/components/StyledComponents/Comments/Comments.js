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

export const AddComment = styled.input`
  padding: 0.25rem;
  &:hover,
  &:focus {
    outline: none;
  }
`;

export const LikeCommentContainer = styled.div`
  padding: 2rem;
  &:after {
    content: '';
    display: block;
    margin: 0 auto;
    width: 100%;
    padding-top: 20px;
    border-bottom: 1px solid black;
  }
`;
