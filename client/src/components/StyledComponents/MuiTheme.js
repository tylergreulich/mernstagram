import React from 'react';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      root: {
        fontSize: '2rem'
      },
      underline: {
        '&:after': {
          //underline color when textfield is inactive
          borderBottom: '2px solid rgba(0, 188, 212, 0.7)'
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: '2px solid rgba(0, 188, 212, 0.7)'
        }
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: '1.7rem',
        '&$focused': {
          color: 'rgba(0, 188, 212, 0.7)'
        }
      }
    },
    MuiFormControl: {
      root: {
        width: '30rem'
      }
    },
    MuiButton: {
      containedPrimary: {
        width: '30rem',
        marginTop: '1.2rem',
        fontSize: '1.7rem',
        backgroundColor: 'rgba(0, 188, 212, 0.7)',
        '&:hover': {
          backgroundColor: 'rgba(0, 167, 188, 0.7)'
        }
      },
      containedSecondary: {
        width: '30rem',
        marginTop: '1.2rem',
        fontSize: '1.7rem'
        // backgroundColor: 'rgba(0, 188, 212, 0.7)',
        // '&:hover': {
        //   backgroundColor: 'rgba(0, 167, 188, 0.7)'
        // }
      }
    },
    MuiTypography: {
      display3: {
        fontSize: '5.5rem'
      }
    }
  }
});

const themeWrapper = props => (
  <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
);

export default themeWrapper;
