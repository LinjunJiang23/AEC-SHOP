const express = require('express');
const cors = require('cors');
const { createOrder } = require('../controllers/orderControllers');
const app = express();
const router = express.Router();

app.use(cors({ origin: 'http://localhost:3001' }));


router.post('/webhook', express.json({ type: 'application/json' }), createOrder);

module.exports = router;