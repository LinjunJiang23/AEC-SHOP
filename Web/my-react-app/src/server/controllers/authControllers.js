// src/server/controllers/authControllers.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'May0623';
const { passQuery } = require('../utils/queryUtils');


exports.guestLogin = async (req, res) => {
	const response = await api.get('/');
	const token = response.get('Authorization').replace('Bearer ', '');
	localStorage.setItem('guestToken', token);
};

exports.userLogin = async (req, res) => {
    
    try {
		const { accountName, pw } = req.body;
		const results = await passQuery(
        'SELECT * FROM Customer WHERE username = ? AND hashed_password = ?',
        [accountName, pw]
		);
        if (results.length !== 0) {
            
			const user = results[0];
			
			// Generate a JWT token
			const token = jwt.sign(
			  {
				  userId: user.user_id,
				  username: user.username,
				  role: 'user'
			  },
			  secretKey,
			  { expiresIn: '1h' }
            );
			
			res.status(200).json({
				user,
				token
			});
        } else {
            return res.status(401).json({ error: "User name or password are wrong, try again" });
        }
	} catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
	}
};

createNewUser = async (accountName, pw, fname, lname, phoneNum, email, registeredDate, res) => {
	try {
		const results = await passQuery(
		`INSERT INTO Customer (username, hashed_password, fname, lname, 
		phone_number, email, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
		[accountName, pw, fname, lname, phoneNum, email, registeredDate]
		);
		res.status(200).json({ message: 'User created successfully' });
	} catch (error) {
		console.error('Error creating new user:', error);
		return res.status(500).json({ error: error });
		
	} 
};

exports.userRegister = async (req, res) => {
	const { accountName, pw, fname, lname, phoneNum, email } = req.body;
	const currentDate = new Date();
	const registeredDate = currentDate.toISOString().slice(0, 10);
	
	try {
		const results = await passQuery(
		  'SELECT * FROM Customer WHERE email = ?', 
		  [email]
		);
		if (results.length === 0) {
			createNewUser(accountName, pw, fname, lname, phoneNum, email, registeredDate, res);
		} else {
			return res.status(409).json({ error: "Email already exist, unable to create new user, please login." });
		}
	} catch (error) {	
		console.error(error);
		return res.status(500).json({ error: error });
	}
};

