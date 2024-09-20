// src/server/controllers/tests/authControllers.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { userLogin, userRegister } = require('../authControllers');
const { passQuery } = require('../../utils/queryUtils');
const { hashPassword, comparePassword } = require('../../utils/passwordUtils');


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

describe('Authentication Controller Tests', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	
	
	
	describe('Controller userLogin', () => {
	  it('should log in user with correct credentials and return JWT', async () => {
		const hashed_pw = await hashPassword('testPW');
	
		const mockUser = {
			user_id: 1,
			username: 'testUser',
			hashed_pw: hashed_pw,
			fname: 'John',
			lname: 'Doe',
			email: 'john.doe@example.com',
		};
		const req = { 
			body: { accountName: 'testUser', pw: 'testPW' } //mock request body
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
		
		passQuery.mockResolvedValue([mockUser]);   //simulate database return result
		comparePassword.mockResolvedValue(true);
		jwt.sign.mockReturnValue('mocked_jwt_token');  //simulate token creation
		
		await userLogin(req, res);
		
		expect(passQuery).toHaveBeenCalledWith(
		  'SELECT * FROM Customer WHERE username = ?', 
		  ['testUser']
		);
		expect(jwt.sign).toHaveBeenCalledWith({
			user: {
				userId: 1,
				username: 'testUser',
			},
			role: 'user'
		},
		  process.env.JWT_SECRET || 'default_key',
		  { expiresIn: '1h' }
		);
		expect(res.json).toHaveBeenCalledWith({token: 'mocked_jwt_token'});
		expect(res.status).toHaveBeenCalledWith(200);

	  });
	    
	  it('should report 401 error for wrong user name', async () => {
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
		expect(res.json).toHaveBeenCalledWith({error: 'User not found.'});
	  });
	  
	  it('should report 401 error for wrong password', async () => {
		const hashed_pw = await hashPassword('testPW');
	
		const mockUser = {
			user_id: 1,
			username: 'testUser',
			hashed_pw: hashed_pw,
			fname: 'John',
			lname: 'Doe',
			email: 'john.doe@example.com',
		};
		const req = { 
		  body: { accountName: 'mockAccount', pw: 'mockPW' }
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
		
      const hashedPW = await hashPassword('newPW');
	  const newUser = { 
        ...req.body,
        hashed_password: hashedPW
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
      const hashed_pw = await hashPassword('testPW');
		
		const mockUser = {
			user_id: 1,
			username: 'testUser',
			hashed_pw: hashed_pw,
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