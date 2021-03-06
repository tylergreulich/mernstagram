import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBarLink from '../StyledComponents/NavBarLink';

import ProfileIcon from '../../images/icons/user.svg';
import DiscoverIcon from '../../images/icons/compass.svg';
import UploadIcon from '../../images/icons/upload.svg';

const styles = {
  root: {
    margin: '0 auto'
  },
  flex: {
    fontSize: '1.7rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbar: {
    margin: '0 auto',
    width: '90rem',
    display: 'flex',
    justifyContent: 'space-between'
  }
};

class Navigation extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{ backgroundColor: 'rgb(0, 188, 212)' }}
        >
          <Toolbar className={classes.toolbar}>
            <Link
              to="/"
              style={{ flex: 1, textDecoration: 'none', color: 'inherit' }}
            >
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Mernstagram
              </Typography>
            </Link>
            <div>
              <NavBarLink to="/posts/upload">
                <img
                  src={UploadIcon}
                  alt="Upload"
                  style={{ height: '2.5rem', margin: '0 .5rem' }}
                />
              </NavBarLink>
              <NavBarLink to="/explore">
                <img
                  src={DiscoverIcon}
                  alt="Discover"
                  style={{ height: '2.5rem', margin: '0 .5rem' }}
                />
              </NavBarLink>
              <NavBarLink to={`/account/${this.props.auth.user.id}`}>
                <img
                  src={ProfileIcon}
                  alt="Profile"
                  style={{ height: '2.5rem', margin: '0 .5rem' }}
                />
              </NavBarLink>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(withRouter(Navigation)));
