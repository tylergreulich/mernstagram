import React from 'react';
import Helmet from 'react-helmet';

const pageTitle = props => (
  <div>
    <Helmet>
      <title>{props.children}</title>
    </Helmet>
  </div>
);

export default pageTitle;
