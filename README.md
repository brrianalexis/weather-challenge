# Weather App

## Back-end

### Setup

Before running the server, we'll need to do some prep work.

You'll need to add a `.env` file inside the `server` folder where you'll need to store your [OpenWeatherMap API key](https://openweathermap.org/api) inside a variable named `OPENWEATHER_API_KEY` like so:

```
OPENWEATHER_API_KEY = "YOUR API KEY GOES HERE"
```

Once this file is saved, you can proceed to setup the project.

To do so, navigate to the `server` folder and then run:

```
npm run setup
```

or using yarn:

```
yarn setup
```

This will install all dependencies, run [ESLint](https://eslint.org/), [tests](https://jestjs.io/) and compile the code using [Babel](https://babeljs.io/).

Once this script has finished, you can start the [Express.js](https://expressjs.com/) server by running `npm start` or `yarn start`.

### Available endpoints

There are three endpoints available. They are all prefixed with `/api/v1`. Let's take a look at them.

- `/location`

  Returns the city from the current location by [ip-api](https://ip-api.com/)

- `current[/city]`

  Here `/city` is optional. If if is provided, it will return the current weather data for that city. Otherwise, it will first get the city via [ip-api](https://ip-api.com/) and then return the weather for that location.

- `forecast[/city]`

  Here `/city` is optional. If it is provided, it will return a 5 day weather forecast for that city. Otherwise, it will first get the city via ip-api and then return the weather forecast for that location.


## Front-end

### Setup

The project was bootstrapped with CRA so there's no 