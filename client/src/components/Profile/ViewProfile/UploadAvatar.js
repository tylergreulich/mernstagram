import React from 'react';

const uploadAvatar = props => (
  <form onSubmit={props.uploadFile}>
    <input type="file" onChange={props.changeFile} name="avatar" />
    <button type="submit">Upload Avatar</button>
  </form>
);

export default uploadAvatar;
