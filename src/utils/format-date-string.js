export const formatDateString = (dateString) => {
	const datePart =
		dateString.substring(8, 10) +
		'.' +
		dateString.substring(5, 7) +
		'.' +
		dateString.substring(0, 4);

	const timePart = dateString.substring(11, 19);

	const formattedDate = `${datePart} ${timePart}`;

	return formattedDate;
};
