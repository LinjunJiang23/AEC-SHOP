// src/server/routes/authRoutes.js
const express = require('express');
const cors = require('cors');
const { userLogin, userRegister } = require('../controllers/authControllers');
const app = express();
const router = express.Router();

app.use(cors({ origin: 'http://localhost:3001' }));

// POST Route to handle customer login requests
router.post('/login', userLogin); 

// POST Route to handle customer register requests
router.post('/register', userRegister);

// POST Route to handle merchant register requests
router.post('/seller/register', merchantRegister);

// POST Route to handle merchant login requests
router.post('/seller/login', merchantLogin);

module.exports = router;
