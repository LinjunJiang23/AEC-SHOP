// src/server/controllers/tests/productControllers.test.js
const request = require('supertest');
const express = require('express');
const productControllers = require('../productControllers');
const queryUtils = require('../../utils/queryUtils');


const app = express();
app.use(express.json());

app.get('/products', productControllers.getProducts);
app.get('/products/details/:id', productControllers.getProductsById);

jest.mock('../../utils/queryUtils', () => ({
	passQuery: jest.fn()
}));

describe('productControllers', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	
	describe('getProducts Controller', () => {
		it('should return products and pagination info', async () => {
		  const req = { query: { page: 1, limit: 10 } };
		  const res = {
		    status: jest.fn().mockReturnThis(),
		    json: jest.fn()
		  };

		  queryUtils.passQuery.mockResolvedValue([
		    { product_id: 1, name: 'Product 1' },
		    { product_id: 2, name: 'Product 2' }
		  ]);

		  await productControllers.getProducts(req, res);

		  expect(queryUtils.passQuery).toHaveBeenCalledWith('SELECT * FROM Product LIMIT ? OFFSET ?', [10, 0]);
		  expect(res.status).toHaveBeenCalledWith(200);
		  expect(res.json).toHaveBeenCalledWith({
		    products: [
			  { product_id: 1, name: 'Product 1' },
			  { product_id: 2, name: 'Product 2' }
			],
		    page: 1,
		    limit: 10,
		    totalPages: 1,
		    totalItems: 2
	  	  });
	    });
		
		it('should report server error', async () => {
			const req = {};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			queryUtils.passQuery.mockResolvedValue([]);
			
			await productControllers.getProducts(req, res);
			expect(res.status).toHaveBeenCalledWith(500);
		});
	});
	
	describe('getProductsById Controller', () => {
		it('should return selected product by id and pagination info', async () => {
			const req = { params: {id: 1} };
			const res = {
			  status: jest.fn().mockReturnThis(),
			  json: jest.fn()
			};
			
			queryUtils.passQuery.mockResolvedValue([1]);
			
			await productControllers.getProductsById(req, res);
			expect(queryUtils.passQuery).toHaveBeenCalledWith('SELECT * FROM Product WHERE product_id = ?', [1]);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith([1]);
		});
		
		it('should report server error', async () => {
			const req = {
				params: { id: 1 }
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn()
			};
			queryUtils.passQuery.mockResolvedValue([]);
			
			await productControllers.getProductsById(req, res);
			expect(res.status).toHaveBeenCalledWith(500);
		});
	});
});	