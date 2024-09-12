// src/api/services/productServices.test.js
import api from '../config/apiConfig';
import axiosMockAdapter from 'axios-mock-adapter';
import { getProducts, getOneProduct } from './productServices';

const mock = new axiosMockAdapter(api);


 /**
  * TEST productServices
  */

{ /* getProducts Tests */ }
describe('getProducts', () => {
	afterEach(() => {
		mock.reset();
	});
	
	it('get fetch products in correct format', async () => {
		const mockData = {
			products: [
			{id: 1, name: 'Product 1'}, {id: 2, name: 'Product 2'}
			],
			page: 1,
			limit: 2,
			totalItems: 5, // Total number of items in the mock data
			totalPages: 3,
		};
		mock.onGet('/CustomerRoute/productGeneral', { params: { page: 1, limit: 10 } }).reply(200, mockData);
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

{ /* getOneProduct Tests */ }
describe('getOneProduct', () => {
		afterEach(() => {
			mock.reset();
		});
		
		it('get one product in correct format', async () => {
			const mockData = {
				id: 1,
				name: 'Product 1',
				price: 11,
				description: 'Test Product 1',
			};
			mock.onGet(`/CustomerRoute/productDetail/${mockData.id}`).reply(200, mockData);
			const result = await getOneProduct(mockData.id);
			
			
			expect(result.status).toBe(200);
			expect(result.data.id).toEqual(mockData.id);
			expect(result.data.name).toEqual(mockData.name);
			expect(result.data.price).toEqual(mockData.price);
			expect(result.data.description).toEqual(mockData.description);
		});
		
		it('should handle a 404 error gracefully', async () => {
			mock.onGet('/CustomerRoute/productGeneral/1');;
			const result = await getOneProduct(1);
			expect(result).toBeNull();
		});
});


{/* addProducts Tests */}
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