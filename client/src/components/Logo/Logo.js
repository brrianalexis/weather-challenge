import React from 'react';
import './logo.css';
import { lightlyClouded } from '../../common/weather-icons';

export const Logo = () => {
	return (
		<div className="logo-container">
			<img alt="Weather app logo" className="logo" src={lightlyClouded} />
		</div>
	);
};
