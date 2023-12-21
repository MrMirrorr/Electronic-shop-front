import axios from 'axios';

export const uploadImage = async (formData) => {
	try {
		const { data } = await axios.post('/upload', formData);
		return data.url;
	} catch (err) {
		console.log(err);
		alert('Ошибка загрузки файла');
	}
};
