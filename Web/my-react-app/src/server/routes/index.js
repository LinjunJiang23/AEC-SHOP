// src/server/routes/index.js
const express = require('express');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');
const checkoutRoutes = require('./checkoutRoutes');
const orderRoutes = require('./orderRoutes');
const router = express.Router();

// Attach different route files
router.use('/auth', authRoutes);        // Routes for authentication (e.g., /auth/login)
router.use('/products', productRoutes); // Routes for products (e.g., /products/details/:id)
router.use('/cart', cartRoutes);        // Routes for shopping cart (e.g., /cart)
router.use('/checkout', checkoutRoutes);// Routes for check out (e.g., /checkout)
router.use('/order', orderRoutes);

module.exports = router;
