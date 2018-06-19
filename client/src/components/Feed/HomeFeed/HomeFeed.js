import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageTitle from '../../UI/PageTitle';

import Posts from '../../Posts/Posts';

class HomeFeed extends Component {
  render() {
    return (
      <div>
        <PageTitle>Mernstagram</PageTitle>
        <Posts />
      </div>
    );
  }
}

export default HomeFeed;
