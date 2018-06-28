import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const EditProfileLink = styled(Link)`
  text-decoration: none;
  height: 0;
  padding: 0 1.5rem;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 0.3;
  flex-direction: column;
`;

export const PostAvatar = styled.img`
  border-radius: 10rem;
  height: 6rem;
  max-width: 9rem;
`;

export const MetricsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 52%;
  height: 60%;
`;

export const MetricsWrapper = styled.div`
  display: flex;
  font-size: 1.4rem;
  width: 100%;
  justify-content: space-between;
`;
