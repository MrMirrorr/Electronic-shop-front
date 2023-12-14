export const generateLoader = (amount, loaderComponent) =>
	[...Array(amount)].map((_, index) => ({ ...loaderComponent, key: index }));
