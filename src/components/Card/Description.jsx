import React, {
  PropTypes,
} from 'react';

const Description = (props) => {
  const {
    humidity,
    wind,
    sunrise,
    sunset
  } = props;

  return (
    <div className="description-container">
      <div>
        <span className="label">Humidity</span>
        <span>:&nbsp;</span>
        <span className="value">{ `${humidity}%` }</span>
      </div>
      <div>
        <span className="label">Wind</span>
        <span>:&nbsp;</span>
        <span className="value">{ wind }</span>
      </div>
      <div>
        <span className="label">Sunrise</span>
        <span>:&nbsp;</span>
        <span className="value">{ sunrise }</span>
      </div>
      <div>
        <span className="label">Sunset</span>
        <span>:&nbsp;</span>
        <span className="value">{ sunset }</span>
      </div>
    </div>
  );
};

Description.propTypes = {};

export default Description;
