import React from 'react';
import ThemeWrapper from '../../StyledComponents/MuiTheme';
import Aux from '../../../hoc/Auxiliary';
import Button from '@material-ui/core/Button';

const UnFollow = props => {
  return (
    <Aux>
      <ThemeWrapper>
        <Button
          variant="contained"
          color="secondary"
          style={{ width: '15rem', margin: 0 }}
          onClick={props.clicked}
        >
          {props.isUnFollowed ? 'UnFollowed' : 'UnFollow'}
        </Button>
      </ThemeWrapper>
    </Aux>
  );
};

export default UnFollow;
