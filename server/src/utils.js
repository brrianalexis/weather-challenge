import Axios from 'axios';
import { IP_API_ENDPOINT } from './constants';

/**
 * @description Sets the parameters passed inside an array on a given url, replacing the numbers inside curly braces
 * @param {string} url
 * @param {array} params
 */
export const setParamsInUrl = (url, params) => {
	return url.replace(/{(\d+)}/g, (match, number) => {
		return typeof params[number] !== 'undefined' ? params[number] : match;
	});
};

/**
 * @description Fetches the location from ip-api and returns the current city
 */
export const getCity = async () => {
	const {
		data: { city },
	} = await Axios.get(IP_API_ENDPOINT);
	return city;
};
