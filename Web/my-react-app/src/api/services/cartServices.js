// src/api/services/cartServices.js
import api from '../config/apiConfig';
import { getLocal, setLocal } from '../utils/localUtils';

const updateCartQuantity = async (quantity, product_id) => {
  try {
    await api.post('/cart/updateQuantity', 
	{ quantity: quantity, product_id: product_id });   
  } catch (error) {
    throw new Error(`Error updating product: ${error.error}`);
  }
};
const getCartTotal = async () => {
  try {
	  const total = await api.get('/cart/total');
	  return total;
  } catch (error) {
	throw new Error('Error getting cart total: ', error);
  }
};

const getCartItems = async () => {
	try {	
		const response = await api.get('/cart');
		if (response.data)
		{
		  return response.data[0];
		} 
	} catch (error) {
	  throw new Error('Error getting cart items: ', error);
	}
};

const getGuestCartItems = async () => {
	try {
		const items = await JSON.parse(getLocal('guestCart'));
		return items;
	} catch (error) {
		throw new Error('Error getting guest cart items: ', error);
	}
};

const addToGuestCart = async (newItem, quantity) => {
	const existingCart = JSON.parse(getLocal('guestCart')) || [];
	
	const itemIndex = existingCart.findIndex(item => item.product_id === newItem.product_id);
	
	if (itemIndex > -1) {
		existingCart[itemIndex].quantity += newItem.quantity;
	} else {
		existingCart.push(newItem);
	}
	
	setLocal('guestCart', JSON.stringify(existingCart));
};

const addToCart = async (product_id, quantity) => {
	try {
		const response = await api.post('cart/add', 
		{ product_id: product_id, quantity: quantity });
	} catch (error) {
		throw new Error('Error adding item to cart:', error);
	}
};

export {
	updateCartQuantity,
	getCartTotal,
	getCartItems,
	getGuestCartItems,
	addToCart,
	addToGuestCart
};