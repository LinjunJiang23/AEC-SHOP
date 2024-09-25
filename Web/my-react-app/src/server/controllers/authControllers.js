// src/server/controllers/authControllers.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'default_key';
const queryUtils = require('../utils/queryUtils');
const passwordUtils = require('../utils/passwordUtils');
const { setTokenInSession } = require('../utils/sessionUtils');
const { createToken } = require('../utils/tokenUtils');

createNewUser = async (accountName, pw, fname, lname, phoneNum, email, registeredDate, res) => {
	try {
		const hashedPW = await passwordUtils.hashPassword(pw);
		const results = await queryUtils.passQuery(
		`INSERT INTO Customer (username, hashed_password, fname, lname, 
		phone_number, email, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
		[accountName, hashedPW, fname, lname, phoneNum, email, registeredDate]
		);
		res.status(200).json({ message: 'User created successfully' });
	} catch (error) {
		console.error('Error creating new user:', error);
		return res.status(500).json({ error: error });
		
	} 
};

const userLogin = async (req, res) => {	
		try {
			const { email, pw } = req.body;
			const results = await queryUtils.passQuery(
			'SELECT * FROM Customer WHERE email = ?',
			[email]
			);
			if (results.length > 0) {
				
				const user = results[0];
				
				const isMatch = await passwordUtils.comparePassword(pw, user.hashed_password);
				if (isMatch) {
				  // Generate a JWT token
				  const token = createToken(user.username, user.user_id, 'user');
				  setTokenInSession(req, token);
				  return res.status(200).json({username: user.username, role: 'user'});
				} else {
				  return res.status(401).json({ error: 'Password are wrong.' });
				}				
			} else {
				return res.status(401).json({ error: "User not found." });
			}
		} catch (error) {
			return res.status(500).json({ error: 'Internal server error' });
		}
};



const userRegister = async (req, res) => {
		const { accountName, pw, fname, lname, phoneNum, email } = req.body;
		const currentDate = new Date();
		const registeredDate = currentDate.toISOString().slice(0, 10);
		
		try {
			const results = await queryUtils.passQuery(
			  'SELECT * FROM Customer WHERE email = ?', 
			  [email]
			);
			if (results.length === 0) {
				await createNewUser(accountName, pw, fname, lname, phoneNum, email, registeredDate, res);
			} else {
				return res.status(409).json({ error: "Email already exist, unable to create new user, please login." });
			}
		} catch (error) {	
			console.error(error);
			return res.status(500).json({ error: error });
		}
};

module.exports = {
	userLogin,
	userRegister,
};