import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import './display.css';

//TODO
export const ForecastDisplay = ({ forecast }) => {
	return (
		<Card title="Northampton, US">
			<p>Saturday 11 January 2020</p>
			<Card.Grid>content</Card.Grid>
			<Card.Grid>content</Card.Grid>
			<Card.Grid>content</Card.Grid>
			<Card.Grid>content</Card.Grid>
			<Card.Grid>content</Card.Grid>
			<Card.Grid>content</Card.Grid>
		</Card>
	);
};

ForecastDisplay.propTypes = {
	forecast: PropTypes.array,
};

export const CurrentDisplay = ({ location, date, temp, weather, feelsLike, description, image }) => {
	return (
		<Card title={location}>
			<p aria-label="today's date">{date.slice(0, 16)}</p>
			<div className="card-display-container">
				<div className="weather-icon-container">
					<img alt={`${description}`} src={image} />
				</div>
				<div>
					<p aria-label="current temperature in celsius units">Current temp: {temp}</p>
					<p aria-label="current temperature feels like">Feels like: {feelsLike}</p>
					<p aria-label="current weather">{weather}</p>
					<p className="weather-description" aria-label="current weather's description">
						{description}
					</p>
				</div>
			</div>
		</Card>
	);
};

CurrentDisplay.propTypes = {
	location: PropTypes.string,
	date: PropTypes.string,
	weather: PropTypes.string,
	temp: PropTypes.string,
	feelsLike: PropTypes.string,
	description: PropTypes.string,
	image: PropTypes.string,
};
