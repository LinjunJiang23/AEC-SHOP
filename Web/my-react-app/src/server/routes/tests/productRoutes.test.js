// src/server/routes/tests/productRoutes.test.js
const request = require('supertest');
const express = require('express');
const { getProducts, getProductsById } = require('../../controllers/productControllers');
const { passQuery } = require('../../utils/queryUtils');
const productRoutes = require('../productRoutes');

jest.mock('../../controllers/productControllers');
jest.mock('../../utils/queryUtils', () => ({
	passQuery: jest.fn()
}));
const app = express();
app.use('/products', productRoutes);

describe('productRoutes', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	
	describe('GET /products', () => {
		it('should return products and pagination info', async () => {
			
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
			
			expect(response.body).toEqual({
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
		
		it('should report error', async () => {
			
			getProducts.mockImplementation((req, res) => {
				res.status(500).json({});
			});
			const response = await request(app)
			  .get('/products')
			  .expect(500);
		});
	});
	
	describe('GET /products/details/:id', () => {
		it('should return selected product by id', async () => {
			getProductsById.mockImplementation((req, res) => {
				res.status(200).json({product_id: 1, name: 'Product 1'});
			});
			
			const response = await request(app)
			  .get('/products/details/1')
			  .expect(200);
			
			expect(response.body).toEqual({
				product_id: 1, name: 'Product 1'
			});
		});
		
		it('should report error', async () => {
			getProductsById.mockImplementation((req, res) => {
				res.status(500).json({});
			});
			const response = await request(app)
			  .get('/products/details/1')
			  .expect(500);
		});
	});
});