import { mapProduct } from './map-product';

export const mapItem = (item) => ({
	...mapProduct(item.product),
	quantity: item.quantity,
	total: item.product.price * item.quantity,
});
