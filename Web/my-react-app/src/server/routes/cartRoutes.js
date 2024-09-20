// src/server/routes/cartRoutes.js
const express = require('express');
const cors = require('cors');

const { getCart, getCartTotal, updateQuantity, addItems } = require('../controllers/cartControllers');


const app = express();
const router = express.Router();

app.use(cors({ origin: 'http://localhost:3001' }));


// GET to get user's shopping cart
router.get('/', getCart);

// GET to get cart total
router.get('/total', getCartTotal);

// POST to update cart quantity
router.post('/updateQuantity', updateQuantity);

// POST to add items to cart
router.post('/add/:id', addItems); 

// POST to delete items from cart
//router.post('/delete', deleteItems);

// POST to clear the cart
//router.post('/clear', clearCart);

	
module.exports = router;