import {
	cloudedNight,
	cloudy,
	lightlyClouded,
	moon,
	nightStorm,
	sunny,
	mist,
	snow,
	storm,
	dayRain,
	nightRain,
} from './weather-icons';

/**
 * @description Converts the timestamp into a date by using the timezone
 * @param {number} timestamp - Timestamp returned from the API
 * @param {number} timezone - Timezone returned from the API
 */
const formatTimestamp = (timestamp, timezone) => {
	const msInASecond = 1000;
	return new Date((timestamp + timezone) * msInASecond).toUTCString();
};

/**
 * @description Returns a string representing the temperature in Celsius units
 * @param {number} temp - Temperature to be formatted
 */
const formatTemp = temp => {
	return `${temp}°C`;
};

/**
 * @description Grabs the code provided by the API and returns the url corresponding to the icon
 * @param {string} code - Icon code as provided by the API
 */
const getIconUrl = code => {
	return `http://openweathermap.org/img/wn/${code}.png`;
};

/**
 * @description Returns an image according to the weather's description
 * @param {string} description The weather description
 */
export const getWeatherImage = (description, time) => {
	const hoursRegExp = / \d{2}:/;
	const hours = time.match(hoursRegExp)[0].split(':')[0].trim();
	const daytime = Number(hours) >= 6 && Number(hours) <= 18;
	switch (description) {
		case 'clear sky':
			return daytime ? sunny : moon;
		case 'few clouds':
			return daytime ? lightlyClouded : cloudedNight;
		case 'scattered clouds':
			return cloudy;
		case 'broken clouds':
			return cloudy;
		case 'shower rain':
			return daytime ? dayRain : nightRain;
		case 'rain':
			return daytime ? dayRain : nightRain;
		case 'thunderstorm':
			return daytime ? storm : nightStorm;
		case 'snow':
			return snow;
		case 'mist':
			return mist;
		default:
			return lightlyClouded;
	}
};

/**
 * @description Converts the weather provided by the API to a more useful format
 * @param {object} weather - The weather object as provided by the API
 */
export const formatWeatherObject = weather => {
	const { main, description } = weather;
	const date = formatTimestamp(weather.dt, weather.timezone);
	const location = `${weather.name}, ${weather.country}`;
	const currentTemp = formatTemp(weather.temp);
	const feelsLikeTemp = formatTemp(weather.feels_like);
	const maxTemp = formatTemp(weather.temp_max);
	const minTemp = formatTemp(weather.temp_min);
	const iconUrl = getIconUrl(weather.icon);
	const weatherIcon = getWeatherImage(weather.description, date);
	return {
		date,
		location,
		temp: currentTemp,
		feelsLike: feelsLikeTemp,
		main,
		description,
		maxTemp,
		minTemp,
		icon: iconUrl,
		image: weatherIcon,
	};
};
