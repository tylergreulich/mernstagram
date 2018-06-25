import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '@material-ui/core/Button';

import { EditProfileLink } from '../../StyledComponents/Profile/Profile';

const editProfile = ({ id, params }) => (
  <Aux>
    <EditProfileLink to={`${id}/edit-profile`}>
      <Button
        variant="contained"
        color="primary"
        style={{ width: '15rem', margin: 0 }}
      >
        Edit Profile
      </Button>
    </EditProfileLink>
  </Aux>
);

export default editProfile;
