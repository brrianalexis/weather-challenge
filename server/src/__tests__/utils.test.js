import { setParamsInUrl, getCity } from '../utils';
import { IP_API_ENDPOINT } from '../constants';
import Axios from 'axios';

jest.mock('axios');

describe('setParamsInUrl', () => {
	test('should set values provided as an array in the second argument on the URL provided in the first argument', () => {
		expect(
			setParamsInUrl('https://somefancyapi.com/api/parameter={0}&another_parameter={1}', [
				'this_should_come_first',
				'this_should_come_second',
			])
		).toBe('https://somefancyapi.com/api/parameter=this_should_come_first&another_parameter=this_should_come_second');

		expect(
			setParamsInUrl('https://somefancyapi.com/api/parameter={0}&another_parameter={1}', [
				'this_should_come_first',
				'this_should_come_second',
			])
		).not.toBe(
			'https://somefancyapi.com/api/parameter=this_should_come_second&another_parameter=this_should_come_first'
		);
	});
	test('it does so by replacing the curly braces containing numbers starting from 0', () => {
		expect(
			setParamsInUrl('https://somefancyapi.com/api/parameter={1}&another_parameter={2}', [
				'if_you_dont_start_with_zero_i_wont_make_it_to_the_url',
				'F',
			])
		).not.toBe(
			'https://somefancyapi.com/api/parameter=if_you_dont_start_with_zero_i_wont_make_it_to_the_url&another_parameter=F'
		);

		expect(
			setParamsInUrl('https://somefancyapi.com/api/parameter={1}&another_parameter={2}', [
				'if_you_dont_start_with_zero_i_wont_make_it_to_the_url',
				'F',
			])
		).toBe('https://somefancyapi.com/api/parameter=F&another_parameter={2}');
	});
});

describe('getCity', () => {
	test('returns city data from ip-api', async () => {
		Axios.get.mockResolvedValueOnce({
			data: {
				city: 'Caseros',
			},
		});

		const data = await getCity();

		expect(Axios.get).toHaveBeenCalledTimes(1);
		expect(Axios.get).toHaveBeenCalledWith(IP_API_ENDPOINT);
		expect(data).toBe('Caseros');
	});
});
