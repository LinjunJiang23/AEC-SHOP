// src/server/routes/tests/authRoutes.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userLogin, userRegister } = require('../../controllers/authControllers');
const { passQuery } = require('../../utils/queryUtils');


const app = express();
app.use(express.json());

app.post('/auth/login', userLogin);
app.post('/auth/register', userRegister);

jest.mock('jsonwebtoken');
jest.mock('bcrypt');
jest.mock('../../utils/queryUtils', () => ({
	passQuery: jest.fn()
}));

describe('Authentication Routes Tests', () => {
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
	
	describe('POST /auth/login, userLogin', () => {
	  it('should log in user with correct credentials and return JWT', async () => {
		passQuery.mockResolvedValueOnce([mockUser]);
		
		jwt.sign.mockReturnValue('mocked_jwt_token');
		
		const response = await request(app)
		  .post('/auth/login')
		  .send({ accountName: 'testUser', pw: 'password' });
		  
		expect(response.status).toBe(200);
		expect(response.body.user).toEqual(mockUser);
		expect(response.body.token).toEqual('mocked_jwt_token');
		expect(jwt.sign).toHaveBeenCalledWith(
		  { userId: mockUser.user_id, username: mockUser.username, role: mockUser.role },
		  expect.any(String),
		  { expiresIn: '1h' }
		);
	  });
	  
	  it('should run 401 for invalid credentials', async () => {
		passQuery.mockResolvedValueOnce([]);
		
		const response = await request(app)
			.post('/auth/login')
			.send({ accountName: 'wrongUser', pw: 'wrongPassword' });
		expect(response.status).toBe(401);
		expect(response.body.error).toBe('User name or password are wrong, try again');
	  });
	});
	
	describe('POST /auth/register', () => {
	  it('should register new user with non existing credentials', async () => {
		passQuery.mockResolvedValueOnce([]);
		
		passQuery.mockResolvedValueOnce({ insertId: 1 });
		
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
		  
		  expect(response.status).toBe(200);
		  expect(response.body.message).toBe('User created successfully');
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