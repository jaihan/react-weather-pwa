import React from 'react';
import './styles.css';
import Icon from '../Icon'

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Forecast = ({ day, type, max, min }) => {
  return (
    <div className='day-forecast'>
      <div className='day'>{ day }</div>
      <div className='icon'>
        <Icon
          type={parseInt(type)}
          className='icon-small'
        />
      </div>
      <div className='temp-high'>{ max }°</div>
      <div className='temp-low'>{ min }°</div>
    </div>
  )
};

const Future = ({ forecast }) => {
  const date = new Date();
  const today = date.getDay();
  
  return (
    <section className='future'>
      {
        forecast.map((f, i) => {
          const day = DAYS_OF_WEEK[(i + today) % 7];
          return (
            <Forecast
              key={day}
              day={day}
              type={f.code}
              min={f.low}
              max={f.high}
            />
          );
        })
      }
    </section>
  )
};

export default Future;
