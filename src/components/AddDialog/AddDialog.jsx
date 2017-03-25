import React, {
  Component,
  PropTypes,
} from 'react';
import './styles.css';

const CITIES = [
  { key: 2459115, label: 'New York, NY' },
  { key: 2487956, label: 'San Francisco, CA' },
  { key: 2490383, label: 'Seattle, WA' },
  { key: 2295420, label: 'Bengaluru, IN' }
];

const Option = ({ id, label }) => {
  return (
    <option value={id}>{ label }</option>
  )
};

class AddDialog extends Component {
  constructor() {
    super();
    this.state = {
      key: 2459115
    };

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleCitySelect = this.handleCitySelect.bind(this);
  }

  handleAddClick() {
    const { key } = this.state;
    const city = CITIES.filter(c => c.key === key)[0];
    this.props.addNewCity(city);
  }

  handleCitySelect(e) {
    const { value } = e.target;
    const key = parseInt(value);
    this.setState({
      key
    });
  }

  render() {
    const { toggleAddDialog } = this.props;
    const { key } = this.state;
    return (
      <div className='dialog-container'>
        <div className='dialog'>
          <div className='dialog-title'>Add new city</div>
          <div className="dialog-body">
            <select
              name="cities-to-add"
              id='cities-to-add'
              onChange={this.handleCitySelect}
              value={key}
            >
              {
                CITIES.map(c => (
                  <Option
                    key={c.key}
                    id={c.key}
                    label={c.label}
                  />
                ))
              }
            </select>
          </div>
          <div className="dialog-buttons">
            <button
              id="btn-add-city"
              className="button"
              onClick={this.handleAddClick}
            >
              Add
            </button>
            <button
              id="btn-cancel"
              className="button"
              onClick={toggleAddDialog}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AddDialog.propTypes = {};

export default AddDialog;
