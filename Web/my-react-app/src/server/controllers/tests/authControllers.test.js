// src/server/controllers/tests/authControllers.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { userLogin, userRegister } = require('../authControllers');
const { passQuery } = require('../../utils/queryUtils');
const { hashPassword, comparePassword } = require('../../utils/passwordUtils');
const { setTokenInSession } = require('../../utils/sessionUtils');
const { checkIfUserExists, setUser } = require('../../utils/userUtils');

const app = express();
app.use(express.json());

app.post('/auth/login', userLogin);
app.post('/auth/register', userRegister);

jest.mock('jsonwebtoken');
jest.mock('../../utils/queryUtils', () => ({
	passQuery: jest.fn()
}));
jest.mock('../../utils/passwordUtils', () => ({
	hashPassword: jest.fn(),
	comparePassword: jest.fn()
}));

jest.mock('../../utils/userUtils', () => ({
	checkIfUserExists: jest.fn(),
	setUser: jest.fn()
}));

describe('Authentication Controller Tests', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	
	
	
	describe('Controller userLogin', () => {
	  it('should log in user with correct credentials and return username and role', async () => {
	
		const mockUser = {
			user_id: 1,
			username: 'testUser',
			hashed_pw: 'testPW',
			fname: 'John',
			lname: 'Doe',
			email: 'john.doe@example.com',
		};
		const req = { 
			body: { email: 'john.doe@example.com', pw: 'testPW' } //mock request body
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
		checkIfUserExists.mockResolvedValue(false);
		passQuery.mockResolvedValue([mockUser]);   //simulate database return result
		comparePassword.mockResolvedValue(true);
		setUser.mockResolvedValue();
		
		await userLogin(req, res);
		
		expect(passQuery).toHaveBeenCalledWith(
		  'SELECT * FROM Customer WHERE email = ?', 
		  ['john.doe@example.com']
		);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({username: 'testUser', role: 'user'});

	  });
	    
	  it('should report 401 error for email', async () => {
		const req = { 
		  body: { email: 'mockAccount', pw: 'mockPW' }
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
		
		passQuery.mockResolvedValue([]);
		await userLogin(req, res);
		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({error: 'User not found.'});
	  });
	  
	  it('should report 401 error for wrong password', async () => {
	
		const mockUser = {
			user_id: 1,
			username: 'testUser',
			hashed_pw: 'testPW',
			fname: 'John',
			lname: 'Doe',
			email: 'john.doe@example.com',
		};
		const req = { 
		  body: { email: 'john.doe@example.com', pw: 'mockPW' }
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
		passQuery.mockResolvedValue([mockUser]);
		comparePassword.mockResolvedValue(false);	

		await userLogin(req, res);
		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({error: 'Password are wrong.'});
	  });
	});
	
	describe('Controller userRegister', () => {
    it('should register new user with non-existing credentials', async () => {
      const req = { 
        body: { 
          accountName: 'newUser',
          pw: 'newPW',
          fname: 'Jane',
          lname: 'Doe',
          phoneNum: '123456789',
          email: 'jane.doe@example.com'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
	  const newUser = { 
        ...req.body,
        hashed_password: 'newPW'
      };
	  hashPassword.mockResolvedValue('newPW');
	  passQuery
            .mockImplementationOnce(() => Promise.resolve([])) // No user found with email
            .mockImplementationOnce(() => Promise.resolve({ message: 'User created successfully' })); // User creation successful

      await userRegister(req, res);
	  
      expect(passQuery).toHaveBeenNthCalledWith(1, 
	  'SELECT * FROM Customer WHERE email = ?', 
	  ['jane.doe@example.com']);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });

    it('should return 409 if email is already used', async () => {		
		const mockUser = {
			user_id: 1,
			username: 'testUser',
			hashed_pw: 'testPW',
			fname: 'John',
			lname: 'Doe',
			email: 'john.doe@example.com',
		};
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