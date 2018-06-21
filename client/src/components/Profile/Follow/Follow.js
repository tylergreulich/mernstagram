import React from 'react';
import ThemeWrapper from '../../StyledComponents/MuiTheme';
import Aux from '../../../hoc/Auxiliary';
import Button from '@material-ui/core/Button';

const Follow = props => {
  return (
    <Aux>
      <ThemeWrapper>
        <Button
          variant="contained"
          color="primary"
          style={{ width: '15rem', margin: 0 }}
          onClick={props.clicked}
        >
          {props.isFollowed ? 'Followed' : 'Follow'}
        </Button>
      </ThemeWrapper>
    </Aux>
  );
};

export default Follow;
