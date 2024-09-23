// src/api/services/tests/productServices.test.js
import api from '../../config/apiConfig';
import axiosMockAdapter from 'axios-mock-adapter';
import { getProducts, getOneProduct } from '../productServices';

const mock = new axiosMockAdapter(api);


 /**
  * TEST productServices
  */

 /* getProducts Tests */ 
describe('API productServices getProducts', () => {
	afterEach(() => {
		mock.reset();
	});
	
	it('should get products in correct format', async () => {
		const mockData = {
			products: [
			{id: 1, name: 'Product 1'}, {id: 2, name: 'Product 2'}
			],
			page: 1,
			limit: 2,
			totalItems: 5, // Total number of items in the mock data
			totalPages: 3,
		};
		mock.onGet('/products', { params: { page: 1, limit: 10 } }).reply(200, mockData);
		const result = await getProducts(1, 10);
		
		expect(result.status).toBe(200);
		expect(result.data.products).toEqual(mockData.products);
		expect(result.data.page).toEqual(mockData.page);
		expect(result.data.limit).toEqual(mockData.limit);
		expect(result.data.totalItems).toEqual(mockData.totalItems);
		expect(result.data.totalPages).toEqual(mockData.totalPages);
	});
	
	it('should handle a 404 error gracefully', async () => {
		mock.onGet('/CustomerRoute/productGeneral', { params: { page: 1, limit: 10 } });
		
		const result = await getProducts(1, 10);
		expect(result).toBeNull();
	});	
});

 /* getOneProduct Tests */ 
describe('API productServices getOneProduct', () => {
		afterEach(() => {
			mock.reset();
		});
		
		it('should get one product in correct format', async () => {
			const mockData = {
				id: 1,
				name: 'Product 1',
				price: 11,
				description: 'Test Product 1',
			};
			mock.onGet(`/products/details/${mockData.id}`).reply(200, mockData);
			const result = await getOneProduct(mockData.id);
			
			console.log(result);
			expect(result.status).toBe(200);
			expect(result.data).toEqual(mockData);
		});
		
		it('should handle a 404 error gracefully', async () => {
			mock.onGet('/CustomerRoute/productGeneral/1');;
			const result = await getOneProduct(1);
			expect(result).toBeNull();
		});
		
		it('should report null for unfound product', async () => {
			const mockData = {
				id: 1,
				name: 'Product 1',
				price: 11,
				description: 'Test Product 1',
			};
			mock.onGet(`/products/details/2`).reply(404, mockData);
			const result = await getOneProduct(2);
			
			expect(result).toBeNull();
		});
		
});


/* addProducts Tests */
/* describe('addProducts', () => {
	afterEach(() => {
		mock.reset();
	});
	
	it('should only add product in the correct format', async () => {
		const mockData = {
			
		};
	});
	
});
*/