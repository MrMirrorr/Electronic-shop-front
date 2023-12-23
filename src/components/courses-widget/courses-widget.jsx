import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const CoursesWidgetContainer = ({ className }) => {
	const [courses, setCourses] = useState({ usd: '', eur: '' });

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get('/currency-rates');
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(response.data, 'text/xml');

				const usd = xmlDoc.querySelector('currency[code="USD"]').textContent;
				const eur = xmlDoc.querySelector('currency[code="EUR"]').textContent;

				setCourses({ usd, eur });
			} catch (error) {
				console.error('Error fetching the currency data:', error);
			}
		};

		fetchCourses();
	}, []);

	return (
		<div className={className}>
			<div>
				<span className="label">USD: </span>
				{courses.usd} р.
			</div>
			<div>
				<span className="label">EUR: </span>
				{courses.eur} р.
			</div>
		</div>
	);
};

export const CoursesWidget = styled(CoursesWidgetContainer)`
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 10px;
	color: #ffffff;
	border-radius: 10px;
	background-color: #52586470;

	.label {
		font-weight: 600;
	}
`;
