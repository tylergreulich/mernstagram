import styled from 'styled-components';

const LikeCommentContainer = styled.div`
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

export default LikeCommentContainer;
