import styled from 'styled-components';

const ShowPassword = styled.label`
  color: rgba(0, 188, 212, 0.7);
  transform: translate(0, 1.5px) scale(0.75);
  transform-origin: top right;
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  top: 0;
  right: 0;
  position: absolute;
  padding: 0;
  font-size: 1.7rem;
  line-height: 1;
`;

export default ShowPassword;
