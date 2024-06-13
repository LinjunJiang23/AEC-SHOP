const express = require('express');
const cors = require('cors');
const connection = require('../db');

const app = express();
const router = express.Router();

app.use(cors({ origin: 'http://localhost:3001' }));



//Function to get product information
const getData = (query, params) => {
	return new Promise((resolve, reject) => {
		connection.query(query, params, (err, results, fields) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
		});
	});
};

// GET Route to display products
router.get('/productGeneral', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const offset = (page - 1) * limit;
    try {
		const products = await getData('SELECT * FROM Product LIMIT ? OFFSET ?', [limit, offset]);
		const totalResults = await getData('SELECT COUNT(*) AS count FROM Product', []);
		const totalItems = totalResults[0].count;
		const totalPages = Math.ceil(totalItems / limit);
		res.status(200).json({
			data: products,
			page,
			limit,
			totalPages,
			totalItems
		});	
	} catch (error) {
		console.error('Error fetching product data:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});


// GET Route to display product details
router.get('/productDetail/:id', async (req, res) => {
    const { id } = req.params; // Use req.params to access route parameters
    try {
		const productDetail = await getData('SELECT * FROM Product WHERE product_id = ?', [id]);
		res.status(200).json(productDetail);
	} catch (error) {
		console.error('Error fetching product detail:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// GET Route to get cart total
router.get('/carttotal', async (req, res) => {
	const id = req.session.UserId;
	try {
		const result = await getData('SELECT cart_total FROM Shopping_Cart WHERE user_id = ?',
		[id]);
		res.status(200).json(result);
	} catch (error) {
		console.error('Error fetching cart total:', error);
		res.status(500).json({ error: 'Internal server error' });
	}	
});

// GET Route to handle accessing user information from session
router.get('/user', (req, res) => {
	const UserId = req.session.UserId;
	console.log("The User ID from user api is:", UserId);
	res.status(200).json(UserId);
});

// GET Route to get user's shopping cart
router.get('/getShoppingCart', async (req, res) => {
	const UserId = req.session.UserId;
	try {
		const results = await getData('SELECT * FROM Shopping_Cart WHERE user_id = ?',
		[UserId]);
		if (results.length === 0)
		{
			console.log('User does not have anything in their cart.');
			res.status(500).json({ message: "Nothing is inside user's shopping cart" });
			return;
		}
		else 
		{
			console.log("Found user's shopping cart, now getting data from shopping cart items.")
			getShoppingCartItem(UserId, res);
		}
	} catch (error) {
		console.error('Error retrieving shopping cart, user shopping cart empty');
		res.status(500).json({ error: error });
		return;
	}}
);


//GET function
const getShoppingCartItem = async (UserId, res) => {
    try {
		const results = await getData(
        'SELECT Shopping_Cart_Item.product_id, Product.price, Shopping_Cart_Item.quantity, Product.product_name, Product.img_url ' + 
        'FROM Shopping_Cart_Item ' +
        'INNER JOIN Product ON Shopping_Cart_Item.product_id = Product.product_id WHERE Shopping_Cart_Item.user_id = ?',
        [UserId]);
		if (results && results.length > 0) {
            console.log('Shopping cart item retrieved successfully.');	
	        res.status(200).json(results); // Send the results as the response
        } else {
            console.log('Shopping cart is empty');
            res.status(404).json({ message: 'Shopping cart is empty, please add items.' });
        }
    } catch (error) {
		console.error('Error retrieving shopping cart items:', err);
        res.status(500).json({ error: error });
	}
};

// POST to update cart quantity
router.post('/updateCartQuantity', async (req, res) => {
	const { quantity, productId } = req.body;
	const UserId = req.session.UserId;

	try {
		const results = await getData(
		'UPDATE Shopping_Cart_Item SET quantity = ? WHERE user_id = ? AND product_id = ?',
		[quantity, UserId, productId]);
		console.log('Shopping cart item retrieved successfully.');
		updateCart(res);
	} catch (error) {
        console.error('Error updating cart quantity:', err);
        res.status(500).json({ error: error });
		return;
    }
});


// POST Route to handle customer login requests
router.post('/loginValidate', async (req, res) => {
    const { accountName, pw } = req.body;

    try {
		const results = await getData(
        'SELECT * FROM Customer WHERE username = ? AND hashed_password = ?',
        [accountName, pw]);
        if (results.length !== 0) {
            console.log('Login successfully.');
            req.session.UserId = results[0].user_id;
			req.session.UserName = results[0].username;
            console.log("req.session userId:", req.session.UserId);
			console.log("req.session username:", req.session.UserName);
            console.log("result is:", results);
			res.status(200).json(results);
        } else {
            console.log("User name or password are wrong, try again");
            res.status(401).json({ error: "User name or password are wrong, try again" });
        }
	} catch (error) {
		console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
	}
});


// POST Route to handle customer register requests
router.post('/register', async (req, res) => {
	const { accountName, pw, fname, lname, phoneNum, email } = req.body;
	const currentDate = new Date();
	const registeredDate = currentDate.toISOString().slice(0, 10);
	
	try {
		const results = await getData('SELECT * FROM Customer WHERE email = ?', 
		[email]);
		if (results.length === 0) {
			console.log("Email isn't used, able to create new user");
			createNewUser(accountName, pw, fname, lname, phoneNum, email, registeredDate, res);
		} else {
			console.log("Email already exist, unable to create new user, login!");
			res.status(409).json({ error: "Email already exist, unable to create new user, please login." });
			return;
		}
	} catch (error) {	
		console.error(error);
		res.status(500).json({ error: error });
		return;
	}
});

const createNewUser = async (accountName, pw, fname, lname, phoneNum, email, registeredDate, res) => {
	try {
		const results = await getData(`INSERT INTO Customer (username, hashed_password, fname, lname, 
		phone_number, email, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?)
		`,
		[accountName, pw, fname, lname, phoneNum, email, registeredDate]);
		console.log('Created User successfully');
		res.status(200).json({ message: 'User created successfully' });
	} catch (error) {
		console.error('Error creating new user:', error);
		res.status(500).json({ error: error });
		return;
	} 
};






// POST Route that add items to cart
router.post('/addToCart/:ProductId', async (req, res) => {
    const { ProductId } = req.params;
	const UserId = req.session.UserId;

    try {
		const results = await getData(
        'SELECT * FROM Shopping_Cart WHERE user_id = ?',
        [UserId]);
		if (results.length === 0) {
			createShoppingCart(UserId, ProductId, req.body.quantity, res);
		} else {	
			addToCart(UserId, ProductId, req.body.quantity, res);
		}
    } catch (error) {
        console.error('Error retrieving shopping cart:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
});

// Function to create a shopping cart for a user if it doesn't exist
const createShoppingCart = async (UserId, ProductId, quantity, res) => {
    try {
		const results = await getData(
        'INSERT INTO Shopping_Cart (user_id) VALUES (?)',
        [UserId]);
		console.log('Created new shopping cart for user successfully');
        // After creating the shopping cart, add the product to it
        addToCart(UserId, ProductId, quantity, res);
    } catch (error) {
        console.error('Error creating shopping cart:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};

// Function to add a product to the shopping cart
const addToCart = async (UserId, ProductId, quantity, res) => {
    try {
        const results = await getData('SELECT * FROM Shopping_Cart_Item WHERE user_id = ? AND product_id = ?',
        [UserId, ProductId]);
		// If the product doesn't exist in the cart, insert it
        if (results.length === 0) {
            insertCartItem(UserId, ProductId, quantity, res);
        } else {
            // If the product already exists, update its quantity
            updateCartItem(UserId, ProductId, quantity, res);
        }
    } catch (error) {
        console.error('Error retrieving shopping cart item:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};

// Function to insert a new item into the shopping cart
const insertCartItem = async (UserId, ProductId, quantity, res) => {
    try {
        const results = await getData('INSERT INTO Shopping_Cart_Item (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [UserId, ProductId, quantity]);
		console.log('Product added to cart successfully, user:', UserId);
		updateCart(res);
    } catch (error) {
        console.error('Error adding product to cart:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};

// Function to update the quantity of an existing item in the shopping cart
const updateCartItem = async (UserId, ProductId, quantity, res) => {
    try {
		const results = await getData(
        'UPDATE Shopping_Cart_Item SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, UserId, ProductId]);
		console.log('Product quantity updated in cart successfully');
		updateCart(res);
    } catch (error) {
        console.error('Error updating quantity of product in cart:', err);
        res.status(500).json({ error: err });
        return;
    }
};

//Function to update cart
const updateCart = async (res) => {
//Now updating all the relevant information of the cart item
	try {
		const results = await getData('CALL updateCart()',[]);
		console.log('Cart updated successfully');
		res.status(200).json({ message: "Success"});
	} catch (error) {
		console.error('Error updating cart:', err);
		res.status(500).json({error: err });
		return;
	}
};
	
module.exports = router;
