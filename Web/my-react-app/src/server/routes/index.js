// src/server/routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const authOrCreateGuest = require('../middleware/authMiddleware');
const router = express.Router();

// Attach different route files
router.use('/auth', authRoutes);        // Routes for authentication (e.g., /auth/login)
router.use('/products', authOrCreateGuest, productRoutes); // Routes for products (e.g., /products)

module.exports = router;
