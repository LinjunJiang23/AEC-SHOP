// src/server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = process.env.SECRET_KEY || 'May0623';

const createGuestToken = () => {
	const guestId = `guest_${Date.now()}`;
	const guestUser = {
		userId: guestId,
		username: guestId,
		role: 'guest'
	};
	return jwt.sign(
		guestUser,
		secretKey,
		{ expiresIn: '1h' }
	);
};

/**
 * verifyToken - Verifies and decodes the jwt token from the request headers
 * @param { string } token
 * @return { Object } Decoded User
 */
const verifyToken = (token) => {
	return jwt.verify(token, secretKey);
};

/**
 * MIDDLEWARE authOrCreateGuest - verifies if it is guest or user
 */
const authOrCreateGuest = async (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		try {
			const guestToken = await createGuestToken();
			res.status(200).setHeader('Authorization', `Bearer ${guestToken}`);
			req.user = jwt.decode(guestToken);
			console.log('Guest creation request received at: ', new Date().toLocaleTimeString());
			return next();
		} catch (error) {
			console.error('Error creating guest user:', error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	} else {
		try {
			const decoded = await verifyToken(token);
			req.user = decoded;
			console.log('Authenticate user/guest request received at: ', new Date().toLocaleTimeString());
			return next();
		} catch (error) {
			console.error('Token verification failed:', error);
			return res.status(401).json({ error: 'Invalid or expired token' });
		}
	}
};

module.exports = { authOrCreateGuest };