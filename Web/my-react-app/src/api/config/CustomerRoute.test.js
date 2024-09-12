import request from 'supertest';
import express from 'express';
import Router from '../../router/Router'; 

const app = express();
app.use('/CustomerRoute', Router);

describe('GET /productGeneral', () => {
	it('should calculate toatlPages correctly', async () => {
		const mockProducts = [
			{ id: 1, name: 'Product 1' },
			{ id: 2, name: 'Product 2' },
			{ id: 3, name: 'Product 3' },
		];
		
	jest.spyOn(global, 'getData').mockResolvedValue();
	
	const response = await request(app)
	  .get('/CustomerRoute/productGeneral')
	  .query({ page: 1, limit: 2 });
	
	const totalItems = mockProducts.length();
	const limit = 2;
	const totalPages = Math.ceil(totalItems / limit);
	
	expect(response.status).toBe(200);
	expect(response.body.data).toEqual(mockProducts);
	expect(response.body.totalItems).toBe(totalItems);
	expect(response.body.totalPages).toBe(totalPages);
	
	});
});

