// src/api/services/tests/authServices.test.js
import api from '../../config/apiConfig';
import axiosMockAdapter from 'axios-mock-adapter';
import { loginValidate, registerUser } from '../authServices';

const mock = new axiosMockAdapter(api);

describe('authServices', () => {
	afterEach(() => {
		mock.reset();
	});
	describe('loginValidate', () => {
		const mockData = {
				token: '.'
		};
		it('should validate user login with correct credentials', async () => {
			mock.onPost('/auth/login', { accountName: 'TestUser', pw: 'TestPW' })
				.reply(200, mockData);
			
			const result = await loginValidate('TestUser', 'TestPW');
			expect(result.data).toEqual(mockData);
			
			
		});
		
		it('should report error with wrong credentials but status of 200', async () => {
			mock.onPost('/auth/login', { accountName: 'wrongUser', pw: 'wrongPW' })
			    .reply(200, new Error('Invalid password or account name.'));
			try {
			  await loginValidate('wrongUser', 'wrongPW');
			} catch (error) {
			  expect(error.response.status).toBe(200);
			  expect(error).toBe('Invalid password or account name.');
			}
		});
		
		it('should report error with status code other than 200', async () => {
			mock.onPost('/auth/login', { accountName: 'wrongUser', pw: 'wrongPW' })
			    .reply(409, new Error());
			await expect(loginValidate('wrongUser', 'wrongPW')).rejects.toEqual(new Error('Request failed with status code 409'));
		});
	});
	describe('registerUser', () => {
		const mockData = {
				accountName: 'TestUser',
				pw: 'TestPW',
				fname: 'TestUser',
				lname: 'TestUser',
				phoneNum: '1234',
				email: 'testuser@email.com'
		};
		it('should register new user', async () => {
			
			mock.onPost('/auth/register', { 
			    accountName: 'TestUser',
				pw: 'TestPW',
				fname: 'TestUser',
				lname: 'TestUser',
				phoneNum: '1234',
				email: 'testuser@email.com' })
			.reply(200, { message: 'User created successfully' });
			
			const result = await registerUser(mockData);
			expect(result).toEqual(mockData.accountName);
			
			
		});
		
		it('should report error with pre-existing registered user of status 409', async () => {
			mock.onPost('/auth/register', 
			  { 
			    accountName: 'TestUser',
				pw: 'TestPW',
				fname: 'TestUser',
				lname: 'TestUser',
				phoneNum: '1234',
				email: 'testuser@email.com' 
			  })
		.reply(409, { error: "Email already exist, unable to create new user, please login." });
			await expect(registerUser(mockData)).rejects.toEqual(new Error('Email already in use, try logging in or retrieving password/accountName'));
		});
		
		it('should report error with status code other than 200', async () => {
			mock.onPost('/auth/login', { accountName: 'wrongUser', pw: 'wrongPW' })
			    .reply(500, { error: new Error() });
			await expect(loginValidate('wrongUser', 'wrongPW')).rejects.toEqual(new Error('Request failed with status code 500'));
		});
	});
});
