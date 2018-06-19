import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileIcon from '../../images/icons/user.svg';
import DiscoverIcon from '../../images/icons/compass.svg';

const styles = {
  root: {
    margin: '0 auto'
  },
  flex: {
    flex: 1,
    fontSize: '1.7rem'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbar: {
    margin: '0 auto',
    width: '90rem'
  }
};

class Navigation extends Component {
  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Mernstagram
            </Typography>
            {/* <input /> */}
            <Link to="/explore">
              <img
                src={DiscoverIcon}
                alt="Discover"
                style={{ height: '2.5rem', marginLeft: '2rem' }}
              />
            </Link>
            <Link to={`/user/${this.props.auth.user.id}`}>
              <img
                src={ProfileIcon}
                alt="Profile"
                style={{ height: '2.5rem' }}
              />
            </Link>
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
