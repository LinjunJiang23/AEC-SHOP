// src/server/middleware/tests/authMiddleware.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { authOrCreateGuest } = require('../authMiddleware');
const productRoutes = require('../../routes/productRoutes');
const { getProducts, getProductsById } = require('../../controllers/productControllers');
const { passQuery } = require('../../utils/queryUtils');
const app = express();
app.use(express.json());

jest.mock('jsonwebtoken');
jest.mock('../../controllers/productControllers');
jest.mock('../../utils/queryUtils', () => ({
	passQuery: jest.fn()
}));
app.use('/products', authOrCreateGuest, productRoutes);




describe('authOrCreateGuest Tests', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	
	it('should generate a guest token and set it in the response headers', async () => {
		jwt.sign.mockReturnValue('mocked_token');
		jwt.verify.mockImplementation((token) => ({
			userId: 'guestTest',
			userName: 'guestTest',
			role: 'guest',
		}));
		
		getProducts.mockImplementation((req, res) => {
				res.status(200).json({
					products: [
					  {product_id: 1, name: 'Product 1'}, 
					  {product_id: 2, name: 'Product 2'}
					],
					page: 1,
					limit: 10,
					totalPages: 1,
					totalItems: 2					
				});
			});
		
		const response = await request(app)
		  .get('/products')
		  .expect(200);
		  
		expect(response.header).toHaveProperty('authorization');
		const token = response.headers.authorization.replace('Bearer ', '');
		
		expect(jwt.decode).toHaveBeenCalledWith(token);
		const decoded = jwt.verify(token, 'mock_secret');
		expect(decoded.role).toBe('guest');	
	});
});