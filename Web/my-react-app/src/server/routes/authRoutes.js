// src/server/routes/authRoutes.js
const express = require('express');
const cors = require('cors');
const authControllers = require('../controllers/authControllers');
const app = express();
const router = express.Router();

app.use(cors({ origin: 'http://localhost:3001' }));

// POST Route to handle customer login requests
router.post('/login', authControllers.userLogin); 

// POST Route to handle customer register requests
router.post('/register', authControllers.userRegister);

// POST Route to handle admin login requests
//router.post('/adminLogin', adminLogin);

module.exports = router;
