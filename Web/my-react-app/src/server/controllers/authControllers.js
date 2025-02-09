// src/server/controllers/authControllers.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'default_key';
const { passQuery } = require('../utils/queryUtils');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { checkIfUserExists, setUser } = require('../utils/userUtils');

//Helper function
async function createNewUser(accountName, pw, fname, lname, phoneNum, email, registeredDate, res) {
  try {
	const hashedPW = await hashPassword(pw);
	const results = await passQuery(
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
  const { email, pw } = req.body;
  try {
	const token = await checkIfUserExists(req);
	if (token) {
	  return res.status(200).json({ message: 'User already logged in', redirect: '/' });
	}
	const results = await passQuery('SELECT * FROM Customer WHERE email = ?', [email]);	
	if (results.length === 0) {
	  return res.status(401).json({ error: 'Invalid login credentials, user not found' });
	}
					
	const user = results[0];			
	const isMatch = await comparePassword(pw, user.hashed_password);
	if (!isMatch) {
	  return res.status(401).json({ error: 'Password are wrong.' });
	}
	// Generate a JWT token and store the user in session
	setUser(req, user);
	return res.status(200).json(user.username);						
  } catch (error) {
	console.error('Login error: ', error);
	return res.status(500).json({ error: 'Internal server error' });
  }
};

const userRegister = async (req, res) => {
  const { accountName, pw, fname, lname, phoneNum, email } = req.body;
  const currentDate = new Date();
  const registeredDate = currentDate.toISOString().slice(0, 10);
		
  try {
	const results = await passQuery('SELECT * FROM Customer WHERE email = ?', [email]);
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

const merchantLogin = async (req, res) => {
  const { email, pw } = req.body;
  try {
  
  } catch (err) {
  
  }
};

const merchantRegister = async (req, res) => {
  const { email, accountName, pw, phoneNum, registerKey } = req.body;
  const currentDate = new Date();
  const registeredDate = currentDate.toISOString().slice(0, 10);
  
  try {
	// const results = await passQuery('SELECT * FROM Store WHERE email = ?', [email]);
	// if (results.length === 0) {
	  // await createNewStore(accountName, pw, email, phoneNum, email, registeredDate, res);
	// } else {
	  // return res.status(409).json({ error: "Store already exist, unable to create new store, try " });
	//}
  } catch (error) {
  
  }
};

module.exports = {
	userLogin,
	userRegister,
	merchantRegister,
	merchantLogin,
};
