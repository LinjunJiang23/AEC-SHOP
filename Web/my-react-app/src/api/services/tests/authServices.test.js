// src/api/services/tests/authServices.test.js
import api from '../config/apiConfig';
import axiosMockAdapter from 'axios-mock-adapter';
import { loginValidate, registerUser } from '../authServices';

const mock = new axiosMockAdapter(api);

describe('loginValidate', () => {
	afterEach(() => {
		mock.reset();
	};
	
	it('should validate user login with correct credentials', async () => {
		const mockData = {
			accountName: 'TestUser',
			pw: 'TestPW',
		};
		mock.onPost().reply(200, mockData);
		
	});
});
