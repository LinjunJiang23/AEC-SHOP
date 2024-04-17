const express = require('express');
const cors = require('cors');
const connection = require('../db');

const app = express();
const router = express.Router();

app.use(cors({ origin: 'http://localhost:3001' }));



// Route to display general products
router.get('/productGeneral', (req, res) => {
    connection.query('SELECT * FROM Product', (err, results, fields) => {
        if (err) {
            console.error('Error fetching product data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results);
    });
});


// Route to display product details
router.get('/productDetail/:id', (req, res) => {
    const { id } = req.params; // Use req.params to access route parameters
    connection.query('SELECT * FROM Product WHERE product_id = ?',
	[id],
	(err, results, fields) => {
        if (err) {
            console.error('Error fetching product detail:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results);
    });
});


// Route to handle customer login requests
router.post('/loginValidate', (req, res) => {
    const { accountName, pw } = req.body;

    connection.query(
        'SELECT * FROM Customer WHERE username = ? AND hashed_password = ?',
        [accountName, pw],
        (err, results, fields) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                if (results.length !== 0) {
                    console.log('Login successfully.');
                    req.session.UserId = results[0].user_id;
                    console.log("req.session data:", req.session.UserId);
                    console.log("result is:", results);
                    res.status(200).json(results);
                } else {
                    console.log("User or password are wrong, try again");
                    res.status(401).json({ error: "User or password are wrong, try again" });
                }
            }
        }
    );
});


// Route to handle customer register requests
router.post('/register', (req, res) => {
	const { accountName, pw } = req.body;
	
	connection.query(
		'SELECT * FROM Customer WHERE username = ?', 
		[accountName], 
		(err, results, fields) => {
			if (err) {
				console.error(err);
				res.status(500).json({ error: err });
				return;
			}
			else {
				if (results.length === 0) {
					console.log("User name does not exist, able to create new user");
					createNewUser(accountName, pw, res);
				} else {
					console.log("User name already exist, unable to create new user, pick a new one!");
					res.status(409).json({ error: "User name already exist, pick another one" });
					return;
				}
			}
		}
	);
});

const createNewUser = (accountName, pw, res) => {
	connection.query(
		'INSERT INTO Customer (username, hashed_password) VALUES (?, ?)',
		[accountName, pw],
		(err, results, fields) => {
			if (err) {
				console.error('Error creating new user:', err);
				res.status(500).json({ error: err });
				return;
			} else {
				console.log('Created User successfully');
				res.status(200).json({ message: 'User created successfully' });
			}
		}
	);
};

// Route to handle accessing user information from session
router.get('/user', (req, res) => {
	const UserId = req.session.UserId;
	console.log("The User ID from user api is:", UserId);
	res.status(200).json(UserId);
});




// Route that add items to cart
router.post('/addToCart/:ProductId', (req, res) => {
    const { ProductId } = req.params;
	const UserId = req.session.UserId;

    connection.query(
        'SELECT * FROM Shopping_Cart WHERE user_id = ?',
        [UserId],
        (err, results, fields) => {
            if (err) {
                console.error('Error retrieving shopping cart:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
			else {
				if (results.length === 0) {
					createShoppingCart(UserId, ProductId, req.body.quantity, res);
				} else {
					
					addToCart(UserId, ProductId, req.body.quantity, res);
				}
			}
        }
    );
});

// Function to create a shopping cart for a user if it doesn't exist
const createShoppingCart = (UserId, ProductId, quantity, res) => {
    connection.query(
        'INSERT INTO Shopping_Cart (user_id) VALUES (?)',
        [UserId],
        (err, results, fields) => {
            if (err) {
                console.error('Error creating shopping cart:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            console.log('Created new shopping cart for user successfully');
            // After creating the shopping cart, add the product to it
            addToCart(UserId, ProductId, quantity, res);
        }
    );
};

// Function to add a product to the shopping cart
const addToCart = (UserId, ProductId, quantity, res) => {
    connection.query(
        'SELECT * FROM Shopping_Cart_Item WHERE user_id = ? AND product_id = ?',
        [UserId, ProductId],
        (err, results, fields) => {
            if (err) {
                console.error('Error retrieving shopping cart item:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            // If the product doesn't exist in the cart, insert it
            if (results.length === 0) {
                insertCartItem(UserId, ProductId, quantity, res);
            } else {
                // If the product already exists, update its quantity
                updateCartItem(UserId, ProductId, quantity, res);
            }
        }
    );
};

// Function to insert a new item into the shopping cart
const insertCartItem = (UserId, ProductId, quantity, res) => {
    connection.query(
        'INSERT INTO Shopping_Cart_Item (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [UserId, ProductId, quantity],
        (err, results, fields) => {
            if (err) {
                console.error('Error adding product to cart:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            console.log('Product added to cart successfully, user:', UserId);
            res.status(200).json({ message: 'Product added to cart successfully' });
        }
    );
};

// Function to update the quantity of an existing item in the shopping cart
const updateCartItem = (UserId, ProductId, quantity, res) => {
    connection.query(
        'UPDATE Shopping_Cart_Item SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, UserId, ProductId],
        (err, results, fields) => {
            if (err) {
                console.error('Error updating quantity of product in cart:', err);
                res.status(500).json({ error: err });
                return;
            }
            console.log('Product quantity updated in cart successfully');
            res.status(200).json({ message: 'Product quantity updated in cart successfully' });
        }
    );
};

// Route to get user's shopping cart
router.get('/getShoppingCart', (req, res) => {
	const UserId = req.session.UserId;
	connection.query(
		'SELECT * FROM Shopping_Cart WHERE user_id = ?',
		[UserId],
		(err, results, fields) => {
			if (err) {
				console.error('Error retrieving shopping cart, user shopping cart empty');
				res.status(500).json({ error: err });
				return;
			}
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
		}
	);
});

const getShoppingCartItem = (UserId, res) => {
    connection.query(
        'SELECT Shopping_Cart_Item.product_id, Product.price, Shopping_Cart_Item.quantity, Product.product_name, Product.img_url ' + 
        'FROM Shopping_Cart_Item ' +
        'INNER JOIN Product ON Shopping_Cart_Item.product_id = Product.product_id WHERE Shopping_Cart_Item.user_id = ?',
        [UserId],
        (err, results, fields) => {
            if (err) {
                console.error('Error retrieving shopping cart items:', err);
                res.status(500).json({ error: err });
            } else {
                if (results && results.length > 0) {
                    console.log('Shopping cart item retrieved successfully.');
                    res.status(200).json(results);
                } else {
                    console.log('Shopping cart is empty');
                    res.status(404).json({ message: 'Shopping cart is empty, please add items.' });
                }
            }
        }
    );
};


module.exports = router;
