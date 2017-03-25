import React, {
  Component,
  PropTypes,
} from 'react';

import Future from './Future.jsx';
import Location from './Location.jsx';
import Present from './Present.jsx';
import './styles.css';

class Card extends Component {
  constructor() {
    super();
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillMount() {
    const { id, fetchData, label } = this.props;
    fetchData(id, label);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data;
  }

  handleRemove() {
    const { id, removeCity } = this.props;
    removeCity(id);
  }

  render() {
    if (!this.props.data) return <div></div>;
    
    const {
      label,
      astronomy,
      atmosphere,
      item: {
        condition: { code, temp, text, date },
        forecast
      },
      wind
    } = this.props.data;
    const weekForecast = forecast.splice(0, 7);

    return (
      <section className='card'>
        <Location
          location={label}
          date={date}
          description={text}
        />
        <Present
          astronomy={astronomy}
          atmosphere={atmosphere}
          code={parseInt(code)}
          temp={temp}
          wind={wind}
        />
        <Future forecast={weekForecast} />
        <button
          className='delete'
          onClick={this.handleRemove}
        >
          x
        </button>
      </section>
    )
  };
}

Card.propTypes = {};

export default Card;
