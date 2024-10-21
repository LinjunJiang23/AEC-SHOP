// src/server/routes/checkoutRoutes.js
const express = require('express');
const cors = require('cors');
const { createPaymentIntent } = require('../controllers/checkoutControllers');
const app = express();
const router = express.Router();


app.use(cors({ origin: 'http://localhost:3001' }));


router.post('/', createPaymentIntent);

module.exports = router;