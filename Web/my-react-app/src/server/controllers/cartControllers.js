// src/server/controllers/cartControllers.js
const { passQuery } = require('../utils/queryUtils');



/** 
 * getCartItems - helper function that retrieves cart items
 * @param { number } userId
 */
const getCartItems = async (UserId, res) => {
    try {
		const results = await passQuery(
        'SELECT Shopping_Cart_Item.product_id, Product.price, Shopping_Cart_Item.quantity, Product.product_name, Product.img_url ' + 
        'FROM Shopping_Cart_Item ' +
        'INNER JOIN Product ON Shopping_Cart_Item.product_id = Product.product_id WHERE Shopping_Cart_Item.user_id = ?',
        [UserId]
		);
		if (results && results.length > 0) {
            console.log('Shopping cart item retrieved successfully.');	
	        res.status(200).json(results); // Send the results as the response
        } else {
            console.log('Shopping cart is empty');
            res.status(404).json({ message: 'Shopping cart is empty, please add items.' });
        }
    } catch (error) {
		console.error('Error retrieving shopping cart items:', error);
        res.status(500).json({ error: error });
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
		res.status(200).json({ message: "Successfully updated the cart."});
	} catch (error) {
		console.error('Error updating cart:', error);
		res.status(500).json({error: error });
		return;
	}
};

/** 
 * createShoppingCart - helper function that creates a shopping cart for user
 * @param {number} UserId
 * @param {number} ProductId
 * @param {number} quantity
 */
const createShoppingCart = async (UserId, ProductId, quantity, res) => {
    try {
		const results = await passQuery(
        'INSERT INTO Shopping_Cart (user_id) VALUES (?)',
        [UserId]);
		console.log('Created new shopping cart for user successfully');
        // After creating the shopping cart, add the product to it
        addToCart(UserId, ProductId, quantity, res);
    } catch (error) {
        console.error('Error creating shopping cart:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};

/**
 * addToCart - helper function that add items to user's cart
 * @param {number} UserId
 * @param {number} ProductId
 * @param {number} quantity
 */
const addToCart = async (UserId, ProductId, quantity, res) => {
    try {
        const results = await passQuery('SELECT * FROM Shopping_Cart_Item WHERE user_id = ? AND product_id = ?',
        [UserId, ProductId]);
		// If the product doesn't exist in the cart, insert it
        if (results.length === 0) {
            insertCartItem(UserId, ProductId, quantity, res);
        } else {
            // If the product already exists, update its quantity
            updateCartItem(UserId, ProductId, quantity, res);
        }
    } catch (error) {
        console.error('Error retrieving shopping cart item:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};
/** 
 * insertCartItem - helper function that insert a new item into the shopping cart
 * @param {number} UserId
 * @param {number} ProductId
 * @param {number} quantity
 */
const insertCartItem = async (UserId, ProductId, quantity, res) => {
    try {
        const results = await passQuery('INSERT INTO Shopping_Cart_Item (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [UserId, ProductId, quantity]);
		console.log('Product added to cart successfully, user:', UserId);
		updateCart(res);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};

/** 
 * updateCartItem - helper function that update the quantity of an existing item in the shopping cart
 * @param {number} UserId
 * @param {number} ProductId
 * @param {number} quantity
 */
const updateCartItem = async (UserId, ProductId, quantity, res) => {
    try {
		const results = await passQuery(
        'UPDATE Shopping_Cart_Item SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, UserId, ProductId]);
		console.log('Product quantity updated in cart successfully');
		updateCart(res);
    } catch (error) {
        console.error('Error updating quantity of product in cart:', error);
        res.status(500).json({ error: error });
        return;
    }
};

/**
 * getCart Controller - retrieves all information on user's cart
 */
exports.getCart = async (req, res) => {
	const UserId = req.session.UserId;
	try {
		const results = await passQuery('SELECT * FROM Shopping_Cart WHERE user_id = ?',
		[UserId]
		);
		if (results.length === 0)
		{
			console.log('User does not have anything in their cart.');
			res.status(500).json({ message: "Nothing is inside user's shopping cart" });
			return;
		}
		else 
		{
			console.log("Found user's shopping cart, now getting data from shopping cart items.")
			getCartItems(UserId, res);
		}
	} catch (error) {
		console.error('Error retrieving shopping cart, user shopping cart empty');
		return res.status(500).json({ error: error });
	}
};

/**
 * getCartTotal Controller - retrieves user's cart total
 */
exports.getCartTotal = async (req, res) => {
	const id = req.session.UserId;
	try {
		const result = await passQuery(
		'SELECT cart_total FROM Shopping_Cart WHERE user_id = ?',
		[id]
		);
		res.status(200).json(result);
	} catch (error) {
		console.error('Error fetching cart total:', error);
		res.status(500).json({ error: 'Internal server error' });
	}	
};

/**
 * updateQuantity Controller - updates the cart items' quantity
 */
exports.updateQuantity = async (req, res) => {
	const { quantity, productId } = req.body;
	const UserId = req.session.UserId;

	try {
		const results = await passQuery(
		'UPDATE Shopping_Cart_Item SET quantity = ? WHERE user_id = ? AND product_id = ?',
		[quantity, UserId, productId]
		);
		console.log('Shopping cart item retrieved successfully.');
		updateCart(res);
	} catch (error) {
        console.error('Error updating cart quantity:', error);
        res.status(500).json({ error: error });
		return;
    }
};

/**
 * addItems Controller - add new items to the cart
 */
exports.addItems = async (req, res) => {
    const { id } = req.params;
	const UserId = req.session.UserId;

    try {
		const results = await passQuery(
        'SELECT * FROM Shopping_Cart WHERE user_id = ?',
        [UserId]
		);
		if (results.length === 0) {
			createShoppingCart(UserId, id, req.body.quantity, res);
		} else {	
			addToCart(UserId, ProductId, req.body.quantity, res);
		}
    } catch (error) {
        console.error('Error retrieving shopping cart:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};