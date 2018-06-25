import React from 'react';
import Settings from '../../../images/icons/cog.svg';

const settingsGear = props => (
  <div>
    <img
      src={Settings}
      alt="Settings"
      style={{ height: '3.9rem', cursor: 'pointer' }}
      onClick={props.clicked}
    />
  </div>
);

export default settingsGear;
