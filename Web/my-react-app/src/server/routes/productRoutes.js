// src/server/routes/productRoutes.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

const { getProducts, getProductsById } = require('../controllers/productControllers');

app.use(cors({ origin: 'http://localhost:3001' }));


// GET Route to display products
router.get('/', getProducts);

// GET Route to display product details
router.get('/details/:id', getProductsById);



module.exports = router;