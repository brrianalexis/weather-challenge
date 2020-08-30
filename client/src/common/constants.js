//?   API endpoints

const currentWeather = 'http://localhost:8000/api/v1/current';
const currentCityWeather = city => `http://localhost:8000/api/v1/current/${city}`;
const currentForecast = 'http://localhost:8000/api/v1/forecast';
const currentCityForecast = city => `http://localhost:8000/api/v1/forecast/${city}`;

export { currentWeather, currentCityWeather, currentForecast, currentCityForecast };
