import { useEffect, useRef, useState } from 'react';

export const usePopup = () => {
	const [isVisiblePopup, setIsVisiblePopup] = useState(false);
	const popupTogglerRef = useRef(null);
	const toggleVisiblePopup = () => setIsVisiblePopup(!isVisiblePopup);

	const handleOutsideClick = ({ target }) => {
		if (popupTogglerRef.current && !popupTogglerRef.current.contains(target)) {
			setIsVisiblePopup(false);
		}
	};

	useEffect(() => {
		if (isVisiblePopup) {
			document.body.addEventListener('click', handleOutsideClick);
			return;
		}

		return () => document.body.removeEventListener('click', handleOutsideClick);
	}, [isVisiblePopup]);

	return { popupTogglerRef, toggleVisiblePopup, isVisiblePopup, setIsVisiblePopup };
};
