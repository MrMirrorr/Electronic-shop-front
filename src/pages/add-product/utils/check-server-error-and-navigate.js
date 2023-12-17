export const checkServerErrorAndNavigate = (
	response,
	navParam,
	errorSetter,
	navigate,
) => {
	if (response.error) {
		errorSetter(response.error);
		return;
	}

	errorSetter(null);
	navigate(`/product/${navParam}`);
	return;
};
