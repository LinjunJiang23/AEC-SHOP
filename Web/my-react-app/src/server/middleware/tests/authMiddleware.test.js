// src/server/middleware/tests/authMiddleware.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { authOrCreateGuest } = require('../authMiddleware');
const app = express();

app.use('/products', authOrCreateGuest, (req, res) => {
	console.log('Route handler reached');
	const token = req.get('Authorization').replace('Bearer ', '');
	res.send(`Welcome, ${req.user.username}`);
});



describe('authOrCreateGuest Tests', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	
	it('should generate a guest token and set it in the response headers', async () => {
		const response = await request(app)
		  .get('/products')
		  .expect(200);
		  
		expect(response.header).toHaveProperty('authorization');
		const token = response.headers.authorization.replace('Bearer ', '');
		const decoded = jwt.verify(token, 'May0623');
		expect(decoded.role).toBe('guest');
		
	});
	
});