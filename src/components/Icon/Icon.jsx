import React from 'react';
import './styles.css';
import { getIcon } from './util';

const Icon = ({ className, type, style }) => {
  const mergedStyle = {
    backgroundImage: `url${getIcon(type)}`,
    ...style
  };
  return (
    <img
      alt='forecast-icon'
      className={`forecast-icon ${className}`}
      src={getIcon(type)}
      style={mergedStyle}
    />
  )
};

Icon.defaultProps = {
  style: {}
};

export default Icon;
