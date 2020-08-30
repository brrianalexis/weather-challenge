import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Spin } from 'antd';
import { SearchInput, Logo, ForecastDisplay, CurrentDisplay, Footer } from './components';
import { useWeather } from './hooks/useWeather';

const { Header, Content } = Layout;

function App() {
	const { getWeather, weather } = useWeather();

	useEffect(() => {
		getWeather();
		//	eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout>
			<Header style={{ display: 'flex', flexDirection: 'row' }}>
				<Logo />
				<h1 style={{ textAlign: 'center', color: 'beige' }} aria-label="app name">
					The Amazing Weather App
				</h1>
			</Header>
			<Content>
				{weather === undefined ? (
					<div className="spinner-container">
						<Spin size="large" />
					</div>
				) : (
					<>
						<SearchInput />
						<CurrentDisplay
							location={weather.location}
							date={weather.date}
							temp={weather.temp}
							feelsLike={weather.feelsLike}
							weather={weather.main}
							description={weather.description}
							image={weather.image}
						/>
					</>
				)}
			</Content>
			<Footer />
		</Layout>
	);
}

export default App;
