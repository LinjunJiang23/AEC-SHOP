// src/server/routes/tests/authRoutes.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authRoutes = require('../authRoutes');
const { userLogin, userRegister } = require('../../controllers/authControllers');
const { passQuery } = require('../../utils/queryUtils');

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('../../controllers/authControllers');
jest.mock('../../utils/queryUtils', () => ({
	passQuery: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('authRoutes', () => {
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
		role: 'user'
	};
	
	describe('POST /auth/login', () => {
	  it('should log in user with correct credentials and return JWT', async () => {
		userLogin.mockImplementation((req, res) => {
			const token = jwt.sign(
			{ userId: mockUser.user_id, username: mockUser.username, role: mockUser.role },
			'secret',
			{ expiresIn: '1h' }
			);
			res.status(200).json({
				user: mockUser,
				token: 'mockToken'
			});
		});
		jwt.sign.mockReturnValue('mockToken');
		
		const response = await request(app)
		  .post('/auth/login')
		  .send({ accountName: 'testUser', pw: 'password' })
		  .expect(200);
		  
		expect(response.body.user).toEqual(mockUser);
		expect(response.body.token).toBe('mockToken');
		expect(jwt.sign).toHaveBeenCalledWith(
		  { 
			username: mockUser.username, 
			role: mockUser.role 
		  },
		  expect.any(String),
		  { expiresIn: '1h' }
		);
	  });
	  
	  it('should run 401 for invalid credentials', async () => {
		userLogin.mockImplementation((req, res) => {
			res.status(401).json({ error: 'User name or password are wrong, try again' });
		});
		
		const response = await request(app)
			.post('/auth/login')
			.send({ accountName: 'wrongUser', pw: 'wrongPassword' });
		expect(response.status).toBe(401);
		expect(response.body.error).toBe('User name or password are wrong, try again');
	  });
	});
	
	describe('POST /auth/register', () => {
	  it('should register a new user with non-existing credentials', async () => {
		userRegister.mockImplementation((req, res) => {
			res.status(200).json({
				message: 'User created successfully',
			});
		});
		
		const response = await request(app)
		  .post('/auth/register')
		  .send({
		    accountName: 'newUser',
			pw: 'password',
			fname: 'John',
			lname: 'Doe',
			phoneNum: '123456789',
			email: 'john.doe@example.com',
		  })
		  .expect(200);
		  
		expect(response.status).toBe(200);
		expect(response.body.message).toBe('User created successfully');
	  });
	  
	  it('should return 409 if email is already used', async () => {
		// First, simulate that user exists
		userRegister.mockImplementation((req, res) => {
			res.status(409).json({
				error: 'Email already exist, unable to create new user, please login.',
			});
		});

		// Simulate the second attempt to register with the same email
		const response = await request(app)
		  .post('/auth/register')
		  .send({
			accountName: 'newUser',
			pw: 'password',
			fname: 'John',
			lname: 'Doe',
			phoneNum: '123456789',
			email: 'john.doe@example.com',
		  })
		  .expect(409);

		expect(response.body.error).toBe('Email already exist, unable to create new user, please login.');
	  });
	});
});
