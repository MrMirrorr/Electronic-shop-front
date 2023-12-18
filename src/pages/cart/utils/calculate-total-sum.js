export const calculateTotalSum = (items) =>
	items.reduce((acc, item) => (acc += item.quantity * item.product.price), 0);
