import React, {
  PropTypes,
} from 'react';
import Description from './Description.jsx';
import Visual from './Visual.jsx';

const Present = (props) => {
  const {
    code,
    temp,
    atmosphere: { humidity },
    astronomy: { sunrise, sunset },
    wind: { speed }
  } = props;
  return (
    <div className='current-container'>
      <Visual
        code={code}
        temp={temp}
      />
      <Description
        humidity={humidity}
        wind={speed}
        sunrise={sunrise}
        sunset={sunset}
      />
    </div>
  );
};

Present.propTypes = {};

export default Present;
