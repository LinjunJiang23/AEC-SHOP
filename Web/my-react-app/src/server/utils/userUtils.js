// src/server/utils/userUtils.js
const jwt = require('jsonwebtoken');
const { getTokenFromSession, setTokenInSession, setUserInSession } = require('./sessionUtils');
const { createToken, verifyToken } = require('./tokenUtils');
const { getCookie } = require('../utils/cookieUtils');

const checkIfUserExists = async (req) => {
	try {
		const token = await getTokenFromSession(req);
		if (token) {
			return token;
		} 
		return false;
	} catch (error) {
		throw new Error(error);
	}
};

const getUserId = async (req) => {
	try {
	  const token = await checkIfUserExists(req);
	  if (token) {  
		const decoded = await verifyToken(token);
		return decoded.user_id;
	  }
	} catch (error) {
	  throw new Error(error);
	}
};

const setUser = async (req, user) => {
	try {
		const token = await createToken(user.username, user.user_id, 'user');
		setTokenInSession(req, token);
		setUserInSession(req, user);
	} catch (error) {
		throw new Error(error);
	}
};



module.exports = {
	checkIfUserExists,
	getUserId,
	setUser
};