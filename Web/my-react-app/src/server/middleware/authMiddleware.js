// src/server/middleware/authMiddleware
if (typeof setImmediate === 'undefined') {
    global.setImmediate = (fn) => setTimeout(fn, 0);
}

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'May0623';

/**
 * MIDDLEWARE guestLogin - verifies if it is guest or user
 * @param req
 * @param res
 * @param next
 */
exports.authOrCreateGuest = async (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		try {
			const guestId = `guest_${Date.now()}`;
			const guestUser = {
				userId: guestId,
				username: guestId,
				role: 'guest'
			};
			const guestToken = jwt.sign(
				guestUser,
				secretKey,
				{ expiresIn: '1h' }
			);
			res.status(200).setHeader('Authorization', `Bearer ${guestToken}`);
			req.user = guestUser;
			console.log('guest creation request received at: ', new Date().toLocaleTimeString());
			next();
		} catch (error) {
			console.error('Error creating guest user:', error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	} else {
		try {
			const decoded = jwt.verify(token, secretKey);
			req.user = decoded;
			console.log('authenticate request received at: ', new Date().toLocaleTimeString());
			next();
		} catch (error) {
			console.error('Token verification failed:', error);
			return res.status(401).json({ error: 'Invalid or expired token' });
		}
	}
};