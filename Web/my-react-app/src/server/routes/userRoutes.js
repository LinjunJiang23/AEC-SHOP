// src/server/routes/userRoutes.js

const express = require('express');
const cors = require('cors');

const { getUserId, getUserDetails } = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

const app = express();
const router = express.Router();

app.use(cors({ origin: 'http://localhost:3001' }));

router.get('/', authMiddleware, getUserId);
