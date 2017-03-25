import React, {
  PropTypes,
} from 'react';
import Icon from '../Icon';

const Visual = ({ code, temp }) => {
  return (
    <div className="visual">
      <Icon type={code} />
      <div className="current-temp">
        <span className="value">{ temp }</span>
        <span className="scale">°C</span>
      </div>
    </div>
  );
};

Visual.propTypes = {};

export default Visual;
