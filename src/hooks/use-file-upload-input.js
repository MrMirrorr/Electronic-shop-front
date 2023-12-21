import { useEffect, useRef, useState } from 'react';
import { uploadImage } from '../api';

export const useFileUploadInput = (
	imageUrl,
	setServerError,
	setValue,
	trigger,
	fieldName,
) => {
	const fileInputRef = useRef(null);
	const [previewUrl, setPreviewUrl] = useState(imageUrl);
	const [selectedFile, setSelectedFile] = useState(null);

	const onChangeFile = ({ target }) => {
		setServerError(null);

		if (target.files && target.files[0]) {
			const file = target.files[0];
			setPreviewUrl(URL.createObjectURL(file));
			setSelectedFile(file);
		}
	};

	const onLoadFile = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', selectedFile);

		const imageUrl = await uploadImage(formData);
		setValue(fieldName, imageUrl);
		trigger(fieldName);
		setSelectedFile(null);
	};

	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl, imageUrl]);

	useEffect(() => {
		setPreviewUrl(imageUrl);
	}, [imageUrl]);

	const onClickRemoveImage = () => {
		fileInputRef.current.value = '';
		setValue(fieldName, '');
		setPreviewUrl(null);
		setSelectedFile(null);
	};

	return {
		onChangeFile,
		onLoadFile,
		onClickRemoveImage,
		setPreviewUrl,
		setSelectedFile,
		fileInputRef,
		selectedFile,
		previewUrl,
	};
};
