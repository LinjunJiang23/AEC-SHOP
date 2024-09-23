// src/server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = process.env.SECRET_KEY || 'default_key';

const createGuestToken = () => {
	const guestId = `guest_${Date.now()}`;
	return jwt.sign({
		  user: {
			  userId: guestId,
			  username: guestId
		  },
		  role: 'guest'
		},
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
	return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, (err, decoded) => {
			if (err) {
				reject(err);
			} else {
				resolve(decoded);
			}
		});
	});
};

/**
 * MIDDLEWARE authOrCreateGuest - verifies if it is guest or user
 */
const authOrCreateGuest = async (req, res, next) => {
	const token = req.headers.Authorization;
	if (!token) {
		try {
			const guestToken = await createGuestToken();
			res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
			res.setHeader('Access-Control-Expose-Headers', 'Authorization'); // Expose the Authorization header to the frontend
			res.status(200).setHeader('Authorization', `Bearer ${guestToken}`);
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