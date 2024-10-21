// src/server/utils/cartUtils.js
const { passQuery } = require('./queryUtils');



/**
 * checkCart - helper function that determine whether cart exists or not & create one if not
 * @param { number } user_id
 */
const checkCart = async (user_id) => {
	try {
		const results = await passQuery(
      'SELECT cart_id FROM Shopping_Cart WHERE user_id = ?',
      [user_id]);
	  if (results.length > 0) {
		return results[0].cart_id;
	  } else {
		await passQuery(
		  'INSERT INTO Shopping_Cart (cart_id) VALUE (?)',
		  [user_id]);		
	  }
	  const newCart = await passQuery(
		'SELECT cart_id FROM Shopping_Cart WHERE user_id = ?',
		[user_id]);
	  return newCart[0].cart_id;  
	} catch (error) {
		throw new Error('Database error: unable to create or find cart');
	}
};

/**
 * deleteFromCart - helper function that delete one cart item
 * @param { number } product_id
 */
const deleteFromCart = async (product_id, res) => {
	try {
		const results = passQuery(
		  'DELETE FROM Shopping_Cart_Item WHERE Shopping_Cart_Item.product_id = ?',
		  [product_id]
		);
		return res.status(200).json({ message: 'Delete items successfully.' });
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};


/** 
 * getCartItems - helper function that retrieves cart items
 * @param { number } cart_id
 */
const getCartItems = async (cart_id, res) => {
    try {
		const results = await passQuery(
          'SELECT Shopping_Cart_Item.product_id, Product.price, Shopping_Cart_Item.quantity, Product.product_name, Product.img_url ' + 
          'FROM Shopping_Cart_Item ' +
          'INNER JOIN Product ON Shopping_Cart_Item.product_id = Product.product_id WHERE Shopping_Cart_Item.cart_id = ?',
          [cart_id]
		);
		if (results && results.length > 0) {
            console.log('Shopping cart item retrieved successfully.');	
	        return res.status(200).json(results); // Send the results as the response
        } else {
            console.log('Shopping cart is empty');
            return res.status(404).json({ message: 'Shopping cart is empty, please add items.' });
        }
    } catch (error) {
		console.error('Error retrieving shopping cart items:', error);
        return res.status(500).json({ error: error });
	}
};


/** 
 * updateCart - helper function that updates all relevant info in cart
 */
const updateCart = async (res) => {
	try {
		const results = await passQuery(
		  'CALL updateCart()',
		  []
		);
		return res.status(200).json({ message: "Successfully updated the cart."});
	} catch (error) {
		console.error('Error updating cart:', error);
		return res.status(500).json({ error: error });
	}
};

/** 
 * createShoppingCart - helper function that creates a shopping cart for user
 * @param {number} user_id
 * @param {number} product_id
 * @param {number} quantity
 */
const createShoppingCart = async (user_id, product_id, quantity, res) => {
    try {
		const results = await passQuery(
        'INSERT INTO Shopping_Cart (user_id) VALUES (?)',
        [user_id]);
		console.log('Created new shopping cart for user successfully');
        // After creating the shopping cart, add the product to it
        insertCartItem(user_id, product_id, quantity, res);
    } catch (error) {
        console.error('Error creating shopping cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * addToCart - helper function that add items to user's cart
 * @param {number} user_id
 * @param {number} product_id
 * @param {number} quantity
 */
const addToCart = async (user_id, product_id, quantity, res) => {
    try {
        const results = await passQuery('SELECT * FROM Shopping_Cart_Item WHERE user_id = ? AND product_id = ?',
        [user_id, product_id]);
		// If the product doesn't exist in the cart, insert it
        if (results.length === 0) {
            insertCartItem(user_id, product_id, quantity, res);
        } else {
            // If the product already exists, update its quantity
            updateCartItem(user_id, product_id, quantity, res);
        }
    } catch (error) {
        console.error('Error retrieving shopping cart item:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
/** 
 * insertCartItem - helper function that insert a new item into the shopping cart
 * @param {number} user_id
 * @param {number} product_id
 * @param {number} quantity
 */
const insertCartItem = async (user_id, product_id, quantity, res) => {
    try {
        const results = await passQuery('INSERT INTO Shopping_Cart_Item (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [user_id, product_id, quantity]);
		console.log('Product added to cart successfully, user:', user_id);
		updateCart(res);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

/** 
 * updateCartItem - helper function that update the quantity of an existing item in the shopping cart
 * @param {number} user_id
 * @param {number} product_id
 * @param {number} quantity
 */
const updateCartItem = async (user_id, product_id, quantity, res) => {
    try {
		const results = await passQuery(
        'UPDATE Shopping_Cart_Item SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, user_id, product_id]);
		console.log('Product quantity updated in cart successfully');
		updateCart(res);
    } catch (error) {
        console.error('Error updating quantity of product in cart:', error);
        return res.status(500).json({ error: error });
    }
};

module.exports = {
	getCartItems,
	updateCart,
	createShoppingCart,
	addToCart,
	insertCartItem,
	updateCartItem,
};