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

const addToCart = async (product_id, quantity) => {
	try {
		await api.post('cart/add', 
		{ product_id: product_id, quantity: quantity });
	} catch (error) {
		throw new Error('Error adding item to cart:', error);
	}
};

const deleteFromCart = async (product_id) => {
	try {
		const response = await api.post('/cart/delete');
	} catch (error) {
		throw new Error('Error deleting from cart: ', error);
	}
};

			/* Guest Cart */

const updateGuestCartQuantity = async (newItem, quantity) => {
  const existingCart = JSON.parse(getLocal('guestCart')) || [];
  
  const itemIndex = existingCart.findIndex(item => item.product_id === newItem.product_id);
  
  if (itemIndex > -1) {
	existingCart[itemIndex].quantity = quantity;
  } 
	
  setLocal('guestCart', JSON.stringify(existingCart));
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
		existingCart[itemIndex].quantity += quantity;
	} else {
	  existingCart.push(newItem);
    }
	
	setLocal('guestCart', JSON.stringify(existingCart));
};

const deleteFromGuestCart = async (product_id) => {
	const existingCart = JSON.parse(getLocal('guestCart')) || [];
	
	const itemIndex = existingCart.findIndex(item => item.product_id === product_id);
	
	if (itemIndex > -1) {
		existingCart.splice(itemIndex, 1);
	}
	setLocal('guestCart', JSON.stringify(existingCart));
};


export {
	updateCartQuantity, getCartItems, 
	addToCart, deleteFromCart,
	updateGuestCartQuantity, getGuestCartItems, 
	addToGuestCart, deleteFromGuestCart 
};