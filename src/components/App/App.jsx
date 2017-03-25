import React, { Component } from 'react';

import Header from '../Header';
import Card from '../Card';
import AddDialog from '../AddDialog';
import * as helpers from './helper';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      showAddDialog: false,
      cities: [],
      weatherData: {}
    };

    this.fetchData = this.fetchData.bind(this);
    this.refreshApp = this.refreshApp.bind(this);
    this.toggleAddDialog = this.toggleAddDialog.bind(this);
    this.addNewCity = this.addNewCity.bind(this);
    this.removeCity = this.removeCity.bind(this);
  }

  componentWillMount() {
    helpers.getInitialState().then((s) => this.setState(s));
  }

  addNewCity({ key, label }) {
    const { cities } = this.state;
    const ignore = cities.filter(c => c.key === key);
    if (ignore.length > 0) return this.setState({ showAddDialog: false });

    const newList = [
      ...cities,
      { key, label }
    ];

    this.setState({
      cities: newList,
      showAddDialog: false
    });

    helpers.persistCities(newList)
  }

  removeCity(key) {
    const { cities } = this.state;
    const newList = cities.filter(c => c.key !== key);
    this.setState({ cities: newList });
    helpers.persistCities(newList)
  }

  fetchData(key, label) {
    // fetch data from cache first for offline mode
    helpers.getForecastFromCache(key, label)
      .then(result => {
        if (!helpers.isNullOrUndefined(result)) {
          const updateWeatherForCity = helpers.updateStateWithWeatherData(key, result);
          this.setState(updateWeatherForCity);
        }
      });

    // fetch data from the Yahoo API
    helpers.getForecastFromApi(key, label)
      .then(result => {
        if (!helpers.isNullOrUndefined(result)) {
          const updateWeatherForCity = helpers.updateStateWithWeatherData(key, result);
          this.setState(updateWeatherForCity);
        }
      });
  }

  refreshApp() {
    const { cities } = this.state;
    cities.forEach(c => this.fetchData(c.key, c.label));
  }

  toggleAddDialog() {
    this.setState((state) => {
      const { showAddDialog } = this.state;
      return {
        ...state,
        showAddDialog: !showAddDialog
      };
    });
  }

  render() {
    const {
      showAddDialog,
      cities,
      weatherData
    } = this.state;
    return (
      <div>
        <div className="App">
          <Header
            refresh={this.refreshApp}
            toggleAddDialog={this.toggleAddDialog}
          />
        </div>

        <main className='main'>
          {
            cities.map(c => (
              <Card
                key={c.key}
                id={c.key}
                label={c.label}
                data={weatherData[c.key]}
                fetchData={this.fetchData}
                removeCity={this.removeCity}
              />
            ))
          }
        </main>

        {
          showAddDialog &&
            <AddDialog
              addNewCity={this.addNewCity}
              toggleAddDialog={this.toggleAddDialog}
            />
        }
      </div>
    );
  }
}

export default App;
