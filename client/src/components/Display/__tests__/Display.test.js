import React from 'react';
import { render, screen } from '@testing-library/react';
import { CurrentDisplay } from '../Display';

const mockWeatherObject = {
	date: 'Sun, 30 Aug 2020 17:13:08 GMT',
	description: 'few clouds',
	feelsLike: '11.82°C',
	icon: 'http://openweathermap.org/img/wn/02d.png',
	image:
		'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDUwMCA1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmOGI2MmQ7fS5jbHMtMSwuY2xzLTJ7c3Ryb2tlOiMyMzE4MTU7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fS5jbHMtMiwuY2xzLTR7ZmlsbDojMjMxODE1O30uY2xzLTN7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48dGl0bGUvPjxnIGRhdGEtbmFtZT0i5Zu+5bGCIDEiIGlkPSLlm77lsYJfMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjM2Ljc1LDI3Mi4xMUE4Mi4yNiw4Mi4yNiwwLDAsMSwzMTYsMjQxLjY0YTc2LjE5LDc2LjE5LDAsMCwxLDEwLjM2LDIuNTksODIuNjUsODIuNjUsMCwwLDAtNjQuOTItNjguMDhDMjI4LjExLDE2OS40LDE5My4xNywxODUsMTc1LjY0LDIxNGE4Myw4MywwLDAsMC00LjQxLDc2LjU4Yy40Ny0uNDYuOTQtLjkyLDEuNDItMS4zN0E3MC41Miw3MC41MiwwLDAsMSwyMzYuNzUsMjcyLjExWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE3MS4yMywyOTAuNThBODMsODMsMCwwLDEsMTc1LjY0LDIxNGMxNy41NC0yOC45NSw1Mi40OC00NC42LDg1Ljc2LTM3Ljg2YTgyLjY1LDgyLjY1LDAsMCwxLDY0LjkyLDY4LjA4LDc4LjI3LDc4LjI3LDAsMCwxLDE1Ljg0LDcuMTksOTgsOTgsMCwwLDAtNjMuODYtODYuMDljLTM3LjY5LTEzLjgyLTgxLjktMS42Mi0xMDcuMjcsMjkuNDMtMjUsMzAuNi0yOS4yNiw3NC4zLTEwLDEwOC44QTY3Ljc2LDY3Ljc2LDAsMCwxLDE3MS4yMywyOTAuNThaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjUzLjA3LDEzMS41NFY5Ny44OWMwLTkuNjUtMTUtOS42Ny0xNSwwdjMzLjY1QzIzOC4wNywxNDEuMTksMjUzLjA3LDE0MS4yMSwyNTMuMDcsMTMxLjU0Wm0tNy41LTMzLjY1djBaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTc2LjY2LDE1Mi4wNWM0LjgzLDguMzYsMTcuNzkuODEsMTMtNy41N2wtMTYuODMtMjkuMTVjLTQuODMtOC4zNi0xNy43OS0uODEtMTMsNy41N1ptNi40OC0zLjc5LTE2LjgzLTI5LjE1WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE0MS4yMiwxODcuNDlsLTI5LjE1LTE2LjgzYy04LjM3LTQuODQtMTUuOTQsOC4xMi03LjU3LDEzbDI5LjE1LDE2LjgzQzE0MiwyMDUuMjgsMTQ5LjU5LDE5Mi4zMiwxNDEuMjIsMTg3LjQ5Wm0tMzIuOTMtMTAuMzVMMTM3LjQ0LDE5NFoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik04Ny4wNiwyNjMuOWgzMy42NWM5LjY1LDAsOS42Ny0xNSwwLTE1SDg3LjA2Qzc3LjQsMjQ4LjksNzcuMzksMjYzLjksODcuMDYsMjYzLjlabTMzLjY1LTcuNWgwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTExMi4wOCwzNDIuMTNsMjkuMTUtMTYuODNjOC4zNi00LjgzLjgxLTE3Ljc5LTcuNTctMTNsLTI5LjE1LDE2LjgzQzk2LjE1LDMzNCwxMDMuNjksMzQ3LDExMi4wOCwzNDIuMTNabTI1LjM2LTIzLjMtMjkuMTUsMTYuODNaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzcwLjQyLDI2My45aDMzLjY1YzkuNjUsMCw5LjY3LTE1LDAtMTVIMzcwLjQyQzM2MC43NywyNDguOSwzNjAuNzUsMjYzLjksMzcwLjQyLDI2My45Wm0wLTcuNWgwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTM1Ny40OCwyMDAuNDRsMjkuMTUtMTYuODNjOC4zNi00LjgzLjgxLTE3Ljc5LTcuNTctMTNsLTI5LjE1LDE2LjgzQzM0MS41NSwxOTIuMzIsMzQ5LjEsMjA1LjI4LDM1Ny40OCwyMDAuNDRabTI1LjM2LTIzLjNMMzUzLjcsMTk0WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTMxNC40NywxNTIuMDVsMTYuODMtMjkuMTVjNC44NC04LjM3LTguMTItMTUuOTQtMTMtNy41N2wtMTYuODMsMjkuMTVDMjk2LjY4LDE1Mi44NiwzMDkuNjQsMTYwLjQyLDMxNC40NywxNTIuMDVabTEwLjM1LTMyLjkzTDMwOCwxNDguMjdaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzc3LjI1LDI5My4zN2MuNTQsMS40MSwxLjA1LDIuODQsMS41MSw0LjI5YTcuMDgsNy4wOCwwLDAsMSwuMTYsNC4wOSw1MS43NSw1MS43NSwwLDAsMS0xNy43MywxMDAuMzdIMjIwLjU0YTYyLjIzLDYyLjIzLDAsMCwxLTU1LTkxLjM1Yy0xLTEuNDQtMS45NS0yLjktMi44Ni00LjQtLjU2LS45My0xLjEtMS44Ny0xLjYyLTIuODFhNzEuMjUsNzEuMjUsMCwwLDAtOS4yMyw0OCw2OS43NSw2OS43NSwwLDAsMCwzOC41OCw1MS4xOWMxMS42OCw1LjQ3LDIzLjc4LDYuODYsMzYuNDUsNi44NkgzNTAuMzFjOS44LDAsMTkuNS4yOCwyOS0yLjgyLDI0LjYzLTguMDYsNDEuODUtMzEuODMsNDEuMTMtNTcuODdBNTkuOTMsNTkuOTMsMCwwLDAsMzc3LjI1LDI5My4zN1oiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yMjAuNTQsMjc3LjY1YTYyLjE2LDYyLjE2LDAsMCwxLDE5LjE4LDMsNzMuNzUsNzMuNzUsMCwwLDEsODcuNDgtMjguMTYsODIuMDksODIuMDksMCwwLDAtLjg5LTguMjlBNzYuMTksNzYuMTksMCwwLDAsMzE2LDI0MS42NGE4Mi4yNiw4Mi4yNiwwLDAsMC03OS4yMSwzMC40N2MxLjY3LjM4LDMuMzIuODIsNSwxLjMzbC04LjQ3LDMuNDVxMS42OC0yLjQ2LDMuNS00Ljc4YTcwLjUyLDcwLjUyLDAsMCwwLTY0LjExLDE3LjFjLS40OC40NS0xLC45MS0xLjQyLDEuMzhhNzguNTEsNzguNTEsMCwwLDAsMy42Myw3LjA2QTYyLjA1LDYyLjA1LDAsMCwxLDIyMC41NCwyNzcuNjVaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjQxLjcyLDI3My40NGMtMS42NS0uNTEtMy4zLS45NS01LTEuMzNxLTEuODIsMi4zMi0zLjUsNC43OFoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0zNDIuMjIsMjYwLjI4QTc0LDc0LDAsMCwxLDM2OSwyOTIuNzZhNy40OSw3LjQ5LDAsMCwxLDQuNTItLjM1YzEuMjYuMjcsMi41LjYsMy43MywxYTgzLjY4LDgzLjY4LDAsMCwwLTM1LjEtNDJjLjEsMS42NS4xNywzLjMxLjE4LDVDMzQyLjMyLDI1Ny43LDM0Mi4yOCwyNTksMzQyLjIyLDI2MC4yOFoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0zNjksMjkyLjc2YTczLDczLDAsMCwxLDIuNTMsNi44OSw1MS4zLDUxLjMsMCwwLDEsNy4zOSwyLjEsNy4wOCw3LjA4LDAsMCwwLS4xNi00LjA5Yy0uNDYtMS40NS0xLTIuODctMS41MS00LjI5LTEuMjMtLjM1LTIuNDctLjY4LTMuNzMtMUE3LjQ5LDcuNDksMCwwLDAsMzY5LDI5Mi43NloiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0zNDIuMzMsMjU2LjRjLjA2LTguMjktMTEtOS40Ni0xNC4xNS0zLjVhNzMuNDIsNzMuNDIsMCwwLDEsMTMuMzksN0E3LjQ0LDcuNDQsMCwwLDAsMzQyLjMzLDI1Ni40WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTM0Mi4yMiwyNjAuMjhjLjA2LTEuMjkuMTEtMi41OS4xMi0zLjg5YTcuNDQsNy40NCwwLDAsMS0uNzcsMy40NloiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNjUuNTQsMzEwLjc3YTYyLjM2LDYyLjM2LDAsMCwxLDkuMzItMTMuMTMsNzguNTEsNzguNTEsMCwwLDEtMy42My03LjA2LDY3Ljc2LDY3Ljc2LDAsMCwwLTEwLjE3LDEzYy41My45NCwxLjA2LDEuODgsMS42MiwyLjgxQzE2My41OSwzMDcuODcsMTY0LjU2LDMwOS4zMywxNjUuNTQsMzEwLjc3WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTMyNy4yMSwyNTIuNTFsMSwuMzhjMy4xNy02LDE0LjIyLTQuNzksMTQuMTUsMy41LDAtMS42Ny0uMDgtMy4zMy0uMTgtNWE3OC4yNyw3OC4yNywwLDAsMC0xNS44NC03LjE5QTgyLjA5LDgyLjA5LDAsMCwxLDMyNy4yMSwyNTIuNTFaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNDA1LjM2LDM0Ny41YzEsMTkuMDYtMTAuMTksMzcuMjgtMjguMTgsNDQuMTctOC4xMiwzLjExLTE2LjI1LDIuOTUtMjQuNzEsMi45NUgyMzdjLTUuNDgsMC0xMSwuMDUtMTYuNDUsMGE1NC43MSw1NC43MSwwLDAsMS01MC03Ny4xMSw1My44OSw1My44OSwwLDAsMSw2LTEwLjM4Yy43OC0xLjA1LDEuNTktMi4wNiwyLjQ0LTMsMTQuMzgtMTYuNjksMzcuNTYtMjIuNjksNTguNjUtMTYuMTgsMy4zNCwxLDYuNjMtLjc0LDguNDctMy40NSwxNC42NC0yMS41Myw0MS40Mi0zMy4xMyw2Ny4xNS0yOC4xYTY2Ljg1LDY2Ljg1LDAsMCwxLDEzLjgyLDQuMzFjLjg3LjM4LDEuNzMuNzcsMi41NywxLjE4czEuOTQsMSwyLjg5LDEuNDlhNjcsNjcsMCwwLDEsMzEuNiwzOC4xMSw2LjM3LDYuMzcsMCwwLDAsNS4zMSw1LjQ0QzM4OC45MywzMTEuMDksNDA0LjI1LDMyNy4yOCw0MDUuMzYsMzQ3LjVaIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMzc4LjkyLDMwMS43NWE1MS43NSw1MS43NSwwLDAsMS0xNy43MywxMDAuMzdIMjIwLjU0YTYyLjI0LDYyLjI0LDAsMSwxLDE5LjE4LTEyMS40NCw3My43NSw3My43NSwwLDAsMSw4Ny40OC0yOC4xNmwxLC4zOGE3Mi4zNCw3Mi4zNCwwLDAsMSwxMy4zOSw3Yy4yMi4xNC40NC4yOC42NS40M0E3My45Myw3My45MywwLDAsMSwzNjksMjkyLjc3Yy45NSwyLjI0LDEuOCw0LjU0LDIuNTMsNi44OUE1MC44NCw1MC44NCwwLDAsMSwzNzguOTIsMzAxLjc1Wm0tMS43NCw4OS45MmMxOC02Ljg5LDI5LjIyLTI1LjExLDI4LjE4LTQ0LjE3LTEuMTEtMjAuMjItMTYuNDMtMzYuNDEtMzUuODItNDAuNjFhNi4zNyw2LjM3LDAsMCwxLTUuMzEtNS40NCw2Nyw2NywwLDAsMC0zMS42LTM4LjExYy0xLS41Mi0xLjkxLTEtMi44OS0xLjQ5cy0xLjctLjgtMi41Ny0xLjE4YTY2Ljg1LDY2Ljg1LDAsMCwwLTEzLjgyLTQuMzFjLTI1LjczLTUtNTIuNTEsNi41Ny02Ny4xNSwyOC4xLTEuODQsMi43MS01LjEzLDQuNDgtOC40NywzLjQ1LTIxLjA5LTYuNTEtNDQuMjctLjUxLTU4LjY1LDE2LjE4LS44NSwxLTEuNjYsMi0yLjQ0LDNhNTMuODksNTMuODksMCwwLDAtNiwxMC4zOCw1NC43MSw1NC43MSwwLDAsMCw1MCw3Ny4xMWM1LjQ4LjA1LDExLDAsMTYuNDUsMEgzNTIuNDdDMzYwLjkzLDM5NC42MiwzNjkuMDYsMzk0Ljc4LDM3Ny4xOCwzOTEuNjdaIi8+PC9nPjwvc3ZnPg==',
	location: 'Caseros, AR',
	main: 'Clouds',
	maxTemp: '15°C',
	minTemp: '15°C',
	temp: '15°C',
};

describe('CurrentDisplay component', () => {
	test('should render a card displaying the current weather data from where the user is located', () => {
		const { container } = render(
			<CurrentDisplay
				location={mockWeatherObject.location}
				date={mockWeatherObject.date}
				temp={mockWeatherObject.temp}
				feelsLike={mockWeatherObject.feelsLike}
				weather={mockWeatherObject.main}
				description={mockWeatherObject.description}
				image={mockWeatherObject.image}
			/>
		);
		// expect(container).toMatchInlineSnapshot();
		screen.debug();
		expect(container.querySelector('.ant-card-head-title')).toHaveTextContent(/caseros, ar/i);

		expect(container.querySelector('.ant-card-body > p')).toHaveTextContent(/sun, 30 aug 2020/i);

		expect(container.querySelector('.weather-icon-container')).toContainElement(
			screen.getByRole('img', { name: /few clouds/i })
		);

		expect(
			screen.getByRole('img', {
				name: /few clouds/i,
			})
		).toHaveAttribute('alt', 'few clouds');

		expect(screen.getByText(/current temp/i)).toHaveTextContent(/current temp: 15°c/i);
		expect(screen.getByText(/current temp/i)).toHaveAttribute('aria-label', 'current temperature in celsius units');

		expect(screen.getByText(/feels like/i)).toHaveTextContent(/feels like: 11\.82°c/i);
		expect(screen.getByText(/feels like/i)).toHaveAttribute('aria-label', 'current temperature feels like');

		expect(screen.getByText('Clouds')).toHaveAttribute('aria-label', 'current weather');

		expect(screen.getByText(/few/i)).toHaveTextContent(/few clouds/i);
		expect(screen.getByText(/few/i)).toHaveAttribute('aria-label', "current weather's description");
		expect(screen.getByText(/few/i)).toHaveClass('weather-description');
	});
});
