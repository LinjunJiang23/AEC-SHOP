// src/server/controllers/userControllers.js
const { getTokenFromSession, getUserFromSession } = require('../utils/sessionUtils');
const { verifyToken } = require('../utils/tokenUtils');

const getUserId = async (req, res) => {
	try {
		const token = await getTokenFromSession(req);
		if (!token) {
			return res.status(401).json({ error: 'No token found' });
		}
		const user = await verifyToken(token);
		if (!user) {
			return res.status(401).json({ error: 'Invalid token' });
		}
		res.status(200).json(user.user_id);
	} catch (error) {
		console.error('Error getting user info from session:', error);
		return res.status(500).json({error: 'Error getting user info from session'});
	}
};

const getUserDetails = async (req, res) => {
	try {
		const user = await getUserFromSession(req);
		if (!user) {
			return res.status(401).json({ error: 'No user found'});
		}
		res.status(200).json(user);
	} catch (error) {
		console.error('Error getting user details from session:', error);
		return res.status(500).json({error: 'Error getting user info from session'});
	}
};

module.exports = {
	getUserId,
	getUserDetails,
};