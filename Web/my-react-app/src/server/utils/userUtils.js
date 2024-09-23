// src/server/utils/userUtils.js
const jwt = require('jsonwebtoken');
const { getTokenFromSession } = require('./sessionUtils');
const { verifyToken } = require('./tokenUtils');
const { getCookie } = require('../utils/cookieUtils');

const getUserId = async (req) => {
	try {
	  const token = await getTokenFromSession(req);
	  if (token) {  
		const decoded = await verifyToken(token);
		return decoded.user_id;
	  }
	} catch (error) {
	  throw new Error(error);
	};
};

module.exports = {
	getUserId,
};