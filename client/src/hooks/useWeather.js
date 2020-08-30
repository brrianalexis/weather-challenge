import { useState } from 'react';
import Axios from 'axios';
import { formatWeatherObject } from '../common/utils';
import { currentWeather } from '../common/constants';

export const useWeather = () => {
	const [weather, setWeather] = useState();

	const getWeather = async () => {
		const {
			data: {
				dt,
				main,
				weather,
				name,
				timezone,
				sys: { country },
			},
		} = await Axios.get(currentWeather);

		const weatherObj = formatWeatherObject({ dt, ...main, ...weather[0], name, country, timezone });

		setWeather(weatherObj);
	};

	return {
		getWeather,
		weather,
	};
};
