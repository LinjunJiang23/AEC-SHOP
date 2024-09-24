// src/server/middleware/authMiddleware.js
const crypto = require('crypto');

const { createToken, verifyToken } = require('../utils/tokenUtils');
const { setTokenInSession, getTokenFromSession } = require('../utils/sessionUtils');
const { setCookie } = require('../utils/cookieUtils');

/**
 * MIDDLEWARE authOrCreateGuest - verifies if it is guest or user
 */
const authMiddleware = async (req, res, next) => {
	const token = getTokenFromSession(req);
	
	if (!token) {
		try {
			const guestName = `guest_${crypto.randomBytes(4).toString('hex')}_${Date.now()}`;
			const guestToken = await createToken(guestName, guestName, 'guest');
			await setTokenInSession(req, guestToken);
			await setCookie(res, 'guest', guestName, { maxAge: 3600000 });
			console.log('Guest creation request received at: ', new Date().toLocaleTimeString());
			req.user = { username: guestName, role: 'guest' };
			return next();
		} catch (error) {
			console.error('Error creating guest user:', error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	} else {
		try {
			const decoded = await verifyToken(token);
			req.user = {username: decoded.username, role: decoded.role};
			console.log('Authenticate user/guest request received at: ', new Date().toLocaleTimeString());
			return next();
		} catch (error) {
			console.error('Token verification failed:', error);
			return res.status(401).json({ error: 'Invalid or expired token' });
		}
	}
};

module.exports = authMiddleware;