import Axios from 'axios';
import { setParamsInUrl } from './utils';
import { FORECAST_BY_CITY_ENDPOINT, IP_API_ENDPOINT, WEATHER_BY_CITY_ENDPOINT } from './constants';

/**
 * @description Gets the city from ip-api and returns it
 * @param {Request} req
 * @param {Response} res
 */
export const getLocation = async (req, res) => {
	try {
		const {
			data: { city },
		} = await Axios.get(IP_API_ENDPOINT);
		res.status(200).send({ city });
	} catch (err) {
		res.status(500).send(err);
	}
};

/**
 * @description Gets the current forecast and returns it along with the city. If no city is provided in the query string, it will get it from ip-api
 * @param {Request} req
 * @param {Response} res
 */
export const getCurrent = async (req, res) => {
	const {
		params: { city },
	} = req;

	if (city === undefined) {
		try {
			const {
				data: { city: ipApiCity },
			} = await Axios.get(IP_API_ENDPOINT);

			const { data } = await Axios.get(
				setParamsInUrl(WEATHER_BY_CITY_ENDPOINT, [ipApiCity, process.env.OPENWEATHER_API_KEY])
			);

			res.status(200).send(data);
		} catch (err) {
			res.status(500).send(err);
		}
	} else {
		try {
			const { data } = await Axios.get(
				setParamsInUrl(WEATHER_BY_CITY_ENDPOINT, [city, process.env.OPENWEATHER_API_KEY])
			);

			res.status(200).send(data);
		} catch (err) {
			res.status(500).send(err);
		}
	}
};

/**
 * @description Gets the forecast for the next 5 days and returns it along with the city. If no city is provided in the query string, it will get it from ip-api
 * @param {Request} req
 * @param {Response} res
 */
export const getForecast = async (req, res) => {
	const {
		params: { city },
	} = req;

	if (city === undefined) {
		try {
			const {
				data: { city: ipApiCity },
			} = await Axios.get(IP_API_ENDPOINT);

			const {
				data: { list, city: openWeatherCity },
			} = await Axios.get(setParamsInUrl(FORECAST_BY_CITY_ENDPOINT, [ipApiCity, process.env.OPENWEATHER_API_KEY]));

			res.status(200).send({ forecast: list, city: openWeatherCity });
		} catch (err) {
			res.status(500).send(err);
		}
	} else {
		try {
			const {
				data: { list, city: openWeatherCity },
			} = await Axios.get(setParamsInUrl(FORECAST_BY_CITY_ENDPOINT, [city, process.env.OPENWEATHER_API_KEY]));

			res.status(200).send({ forecast: list, city: openWeatherCity });
		} catch (err) {
			res.status(500).send(err);
		}
	}
};
