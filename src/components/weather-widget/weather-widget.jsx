import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const WeatherWidgetContainer = ({ className }) => {
	const [weather, setWeather] = useState({
		city: '',
		temperature: '',
		status: '',
		iconCode: '',
	});

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const {
					data: { name, main, weather },
				} = await axios.get(
					'https://api.openweathermap.org/data/2.5/weather?q=Tiraspol&appid=95dc22c3cde5dc330b6d91ab14c2b71a&units=metric&lang=ru',
				);

				setWeather({
					city: name,
					temperature: main.temp,
					status: weather[0].description,
					iconCode: weather[0].icon,
				});
			} catch (error) {
				console.error('Error fetching the weather data:', error);
			}
		};

		fetchCourses();
	}, []);

	return (
		<div className={className}>
			<div>
				{weather.city},{' '}
				{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
			</div>
			<div>
				{weather.temperature}°C, {weather.status}
			</div>
			<img
				src={
					weather.iconCode &&
					`https://openweathermap.org/img/w/${weather.iconCode}.png`
				}
				alt={weather.status}
			/>
		</div>
	);
};

export const WeatherWidget = styled(WeatherWidgetContainer)`
	display: flex;
	flex-direction: column;
	gap: 10px;
	position: relative;
	padding: 10px;
	color: #ffffff;
	border-radius: 10px;
	background-color: #52586470;

	img {
		position: absolute;
		bottom: -5px;
		right: 0;
		z-index: 1;
		opacity: 0.8;
	}
`;
