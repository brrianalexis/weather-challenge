import request from 'supertest';
import { server } from '../server';

describe('routes', () => {
	const baseUrl = '/api/v1',
		expectedCurrentBodyProps = [
			'base',
			'clouds',
			'clouds.all',
			'cod',
			'coord',
			'coord.lat',
			'coord.lon',
			'dt',
			'id',
			'main',
			'main.feels_like',
			'main.humidity',
			'main.pressure',
			'main.temp',
			'main.temp_max',
			'main.temp_min',
			'name',
			'sys',
			'sys.country',
			'sys.id',
			'sys.sunrise',
			'sys.sunset',
			'sys.type',
			'timezone',
			'visibility',
			'weather',
			'wind',
			'wind.deg',
			'wind.gust',
			'wind.speed',
		],
		expectedCurrentWeatherProps = ['id', 'main', 'description', 'icon'],
		expectedForecastBodyProps = [
			'forecast',
			'city',
			'city.id',
			'city.name',
			'city.coord',
			'city.country',
			'city.population',
			'city.timezone',
			'city.sunrise',
			'city.sunset',
		],
		expectedForecastProps = ['dt', 'main', 'weather', 'clouds', 'wind', 'visibility', 'pop', 'sys', 'dt_txt'],
		expectedForecastMainProps = [
			'temp',
			'feels_like',
			'temp_min',
			'temp_max',
			'pressure',
			'sea_level',
			'grnd_level',
			'humidity',
			'temp_kf',
		],
		expectedForecastWeatherProps = ['id', 'main', 'description', 'icon'];

	test('unexistent path', async () => {
		const res = await request(server).get(`${baseUrl}/this-path-doesnt-exist`).send();
		expect(res.status).toBe(404);
	});

	test('/location', async () => {
		const res = await request(server).get(`${baseUrl}/location`).send();

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('city');
	});

	test('/current', async () => {
		const res = await request(server).get(`${baseUrl}/current`).send();
		expect(res.status).toBe(200);
		expectedCurrentBodyProps.forEach(prop => expect(res.body).toHaveProperty(prop));
		expectedCurrentWeatherProps.forEach(prop => expect(Object.values(res.body.weather)[0]).toHaveProperty(prop));
	});

	test('/current/city', async () => {
		const res = await request(server).get(`${baseUrl}/current/villa%20urquiza`).send();
		expect(res.status).toBe(200);
		expectedCurrentBodyProps.forEach(prop => expect(res.body).toHaveProperty(prop));
		expectedCurrentWeatherProps.forEach(prop => expect(Object.values(res.body.weather)[0]).toHaveProperty(prop));
		expect(res.body.name).toBe('Villa Urquiza');
	});

	test('/forecast', async () => {
		const res = await request(server).get(`${baseUrl}/forecast`).send();
		expect(res.status).toBe(200);
		expectedForecastBodyProps.forEach(prop => expect(res.body).toHaveProperty(prop));
		expect(res.body.city).toHaveProperty('coord.lat');
		expect(res.body.city).toHaveProperty('coord.lon');
		res.body.forecast.forEach(weatherObj => {
			expectedForecastProps.forEach(prop => expect(weatherObj).toHaveProperty(prop));
			expectedForecastMainProps.forEach(prop => expect(weatherObj.main).toHaveProperty(prop));
			expectedForecastWeatherProps.forEach(prop => expect(weatherObj.weather[0]).toHaveProperty(prop));
			expect(weatherObj).toHaveProperty('clouds.all');
			expect(weatherObj).toHaveProperty('wind.speed');
			expect(weatherObj).toHaveProperty('wind.deg');
			expect(weatherObj).toHaveProperty('sys.pod');
			weatherObj.rain !== undefined
				? expect(Object.keys(weatherObj)).toHaveLength(10)
				: expect(Object.keys(weatherObj)).toHaveLength(9);
		});
	});

	test('/forecast/city', async () => {
		const res = await request(server).get(`${baseUrl}/forecast/villa urquiza`).send();
		expect(res.status).toBe(200);
		expect(res.body.city.name).toBe('Villa Urquiza');
		expectedForecastBodyProps.forEach(prop => expect(res.body).toHaveProperty(prop));
		expect(res.body.city).toHaveProperty('coord.lat');
		expect(res.body.city).toHaveProperty('coord.lon');
		res.body.forecast.forEach(weatherObj => {
			expectedForecastProps.forEach(prop => expect(weatherObj).toHaveProperty(prop));
			expectedForecastMainProps.forEach(prop => expect(weatherObj.main).toHaveProperty(prop));
			expectedForecastWeatherProps.forEach(prop => expect(weatherObj.weather[0]).toHaveProperty(prop));
			expect(weatherObj).toHaveProperty('clouds.all');
			expect(weatherObj).toHaveProperty('wind.speed');
			expect(weatherObj).toHaveProperty('wind.deg');
			expect(weatherObj).toHaveProperty('sys.pod');
			weatherObj.rain !== undefined
				? expect(Object.keys(weatherObj)).toHaveLength(10)
				: expect(Object.keys(weatherObj)).toHaveLength(9);
		});
	});
});

afterAll(() => {
	server.close();
});
