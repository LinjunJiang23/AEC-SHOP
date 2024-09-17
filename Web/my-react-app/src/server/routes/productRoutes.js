// src/server/routes/productRoutes.js
const express = require('express');
const cors = require('cors');

const { getProducts, getProductsById } = require('../controllers/productControllers');

const router = express.Router();

router.use(cors({ origin: 'http://localhost:3001' }));

// GET Route to display products
router.get('/', getProducts);

// GET Route to display product details
router.get('/details/:id', getProductsById);



module.exports = router;