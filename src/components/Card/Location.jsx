import React, {
  PropTypes,
} from 'react';

const Location = ({ location, date, description }) => {
  return (
    <div className='location-container'>
      <div className="location">{ location }</div>
      <div className="date">{ date }</div>
      <div className="description">{ description }</div>
    </div>
  );
};

Location.propTypes = {};

export default Location;
