import { getRequest } from '../../service/Request';
import { get, set } from '../../service/Store';

const INITIAL_DATA = ({
  key: '2459115',
  label: 'New York, NY',
  created: '2016-07-22T01:00:00Z',
  channel: {
    astronomy: {
      sunrise: "5:43 am",
      sunset: "8:21 pm"
    },
    item: {
      condition: {
        text: "Windy",
        date: "Thu, 21 Jul 2016 09:00 PM EDT",
        temp: 56,
        code: 24
      },
      forecast: [
        {code: 44, high: 86, low: 70},
        {code: 44, high: 94, low: 73},
        {code: 4, high: 95, low: 78},
        {code: 24, high: 75, low: 89},
        {code: 24, high: 89, low: 77},
        {code: 44, high: 92, low: 79},
        {code: 44, high: 89, low: 77}
      ]
    },
    atmosphere: {
      humidity: 56
    },
    wind: {
      speed: 25,
      direction: 195
    }
  }
});
const CITIES_STORAGE_KEY = 'pw-cities';

const SELECTED_CITIES = [{ key: 2295420, label: 'Bengaluru, IN' }];

const getUrl = (key, unit = 'c') => {
  const statement = `select * from weather.forecast where woeid=${key} and u=\'${unit}\'`;
  const url = `https://query.yahooapis.com/v1/public/yql?format=json&q=${statement}`;

  return url;
};

const parseResult = (key, label = '') => (json) => {
  if (json) {
    const {
      query: { created, results: { channel } }
    } = json;

    const results = {
      ...channel,
      key,
      label,
      created
    };

    return results;
  }
};

export function isNullOrUndefined(v) {
  return v === null || v === undefined;
}

export function getInitialState() {
  return get(CITIES_STORAGE_KEY).then(v => {
    const cities = isNullOrUndefined(v) ? SELECTED_CITIES : v;
    const weatherData = {};

    return {
      cities,
      weatherData
    };
  });
}

/**
 * If the browser supports CacheStorage feature, return the cached data.
 */
export function getForecastFromCache(key, label, unit) {
  const url = getUrl(key, unit);
  if ('caches' in window) {
    return caches.match(url).then(parseResult(key, label));
  }
  else {
    return Promise.reject();
  }
}

/**
 * Query the yahoo api to get the latest data.
 */
export function getForecastFromApi(key, label, unit) {
  const url = getUrl(key, unit);

  return getRequest(url)
    .then(parseResult(key, label))
}

export function updateStateWithWeatherData(key, result) {
  return function updater(state) {
    const { weatherData } = state;
    const update = {
      ...weatherData,
      [key]: result
    };

    return {
      ...state,
      weatherData: update
    };
  }
}

/**
 * Save the cities to index db storage 
 */
export function persistCities(cities) {
  set(CITIES_STORAGE_KEY, cities);
}
