import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Posts from '../../Profiles/Posts';

class HomeFeed extends Component {
  render() {
    return (
      <div>
        <Posts />
      </div>
    );
  }
}

export default HomeFeed;
