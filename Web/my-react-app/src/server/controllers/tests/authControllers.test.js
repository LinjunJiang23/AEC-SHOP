// src/server/controllers/tests/authControllers.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { userLogin, userRegister } = require('../authControllers');
const { passQuery } = require('../../utils/queryUtils');


const app = express();
app.use(express.json());

app.post('/auth/login', userLogin);
app.post('/auth/register', userRegister);

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('../../utils/queryUtils', () => ({
	passQuery: jest.fn()
}));

describe('Authentication Controller Tests', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	
	const mockUser = {
		user_id: 1,
		username: 'testUser',
		pw: 'password',
		fname: 'John',
		lname: 'Doe',
		email: 'john.doe@example.com',
	};
	
	describe('Controller userLogin', () => {
	  it('should log in user with correct credentials and return JWT', async () => {
		const req = { 
			body: { accountName: 'mockAccount', pw: 'mockPW' } //mock request body
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
		
		passQuery.mockResolvedValue([mockUser]);   //simulate database return result
		jwt.sign.mockReturnValue('mocked_jwt_token');  //simulate token creation
		
		await userLogin(req, res);
		
		expect(passQuery).toHaveBeenCalledWith(
		  'SELECT * FROM Customer WHERE username = ? AND hashed_password = ?', 
		  ['mockAccount', 'mockPW']
		);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(
		{
			user: mockUser,
			token: 'mocked_jwt_token'
		});
	  });
	  
	  it('should report 401 error', async () => {
		const req = { 
		  body: { accountName: 'mockAccount', pw: 'mockPW' }
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
		
		passQuery.mockResolvedValue([]);
		await userLogin(req, res);
		expect(res.status).toHaveBeenCalledWith(401);
	  });
	});
	
	describe('POST /auth/register', () => {
	  it('should register new user with non existing credentials', async () => {
		const req = { 
		  body: { 
		    accountName: 'testUser',
			pw: 'testPW',
			fname: 'testUser',
			lname: 'testUser',
			phoneNum: '123',
			email: 'john.doe@example.com'
		  }
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
		  const registeredDate = new Date().toISOString().slice(0, 10);
		  passQuery.mockResolvedValue({ message: 'User created successfully'});
		  await userRegister(req, res);
		  expect(passQuery).toHaveBeenCalledWith(
		  'SELECT * FROM Customer WHERE email = ?',
		   ['john.doe@example.com']
		  );
	  });
	  
	  it('should return 409 if email is already used', async () => {
		passQuery.mockResolvedValueOnce([mockUser]);
		
		const response = await request(app)
		  .post('/auth/register')
		  .send({
			accountName: 'newUser',
			pw: 'password',
			fname: 'John',
			lname: 'Doe',
			phoneNum: '123456789',
			email: 'john.doe@example.com',
		  });
		expect(response.status).toBe(409);
		expect(response.body.error).toBe('Email already exist, unable to create new user, please login.');
	  });
	});
});