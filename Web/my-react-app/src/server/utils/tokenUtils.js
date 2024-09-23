const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'default_key';



const createToken= (username, user_id, role) => {
	return jwt.sign({
		  username: username,
		  user_id: user_id,
		  role: role
	},
		secretKey,
	{ expiresIn: '1h' });
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
module.exports = {
	createToken,
	verifyToken,
};