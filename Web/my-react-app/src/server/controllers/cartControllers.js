// src/server/controllers/cartControllers.js
const { passQuery } = require('../utils/queryUtils');
const { getUserId } = require('../utils/userUtils');
const asyncHandler = require('../utils/asyncHandler');
const {
	getCartItems,
	updateCart,
	createShoppingCart,
	addToCart,
	insertCartItem,
	updateCartItem,
} = require('../utils/cartUtils');

/**
 * getCart Controller - retrieves all information on user's cart
 */
const getCart = asyncHandler(async (req, res) => {
	const user_id = await getUserId(req);
	const results = await passQuery(
	'SELECT cart_id FROM Shopping_Cart WHERE user_id = ?',
	[user_id]);
	if (results.length === 0)
	{
	  await passQuery(
		'INSERT INTO Shopping_Cart (user_id) VALUES (?)',
		[user_id]);
	  return res.status(200).json({message: 'Shopping cart is empty'});
	} else {
	  return getCartItems(results[0], res);
	}
	return res.status(500).json({error: 'Internal server error'});
});

/**
 * getCartTotal Controller - retrieves user's cart total
 */
const getCartTotal = asyncHandler(async (req, res) => {
	const user_id = await getUserId(req);
	const result = await passQuery(
	  'SELECT cart_total FROM Shopping_Cart WHERE user_id = ?',
	  [user_id]);
	if (result)
	{
		const total = result[0];
		return res.status(200).json(total);
	}
	return res.status(500).json({ error: 'Internal server error' });
});

/**
 * updateQuantity Controller - updates the cart items' quantity
 */
const updateQuantity = asyncHandler(async (req, res) => {
	const { quantity, product_id } = req.body;
	const user_id = await getUserId(req);
	const results = await passQuery(
	  'UPDATE Shopping_Cart_Item SET quantity = ? WHERE user_id = ? AND product_id = ?',
	  [quantity, user_id, product_id]);
	return updateCart(res);
});

/**
 * addItems Controller - add new items to the cart
 */
const addItems = asyncHandler(async (req, res) => {
    const { product_id, quantity } = req.params;
	const user_id = await getUserId(req);
	
	const results = await passQuery(
      'SELECT * FROM Shopping_Cart WHERE user_id = ?',
      [user_id]);
	if (results.length === 0) {
		return createShoppingCart(user_id, product_id, req.body.quantity, res);
	} else {	
		return addToCart(user_id, product_id, req.body.quantity, res);
	}
    return res.status(500).json({ error: 'Internal server error' });
        
});

module.exports = { 
	getCart, 
	getCartTotal, 
	updateQuantity, 
	addItems,
};