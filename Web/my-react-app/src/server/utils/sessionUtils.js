// src/server/utils/sessionUtils.js

const getTokenFromSession = (req) => {
	return req.session.token || null;
};

const getUserFromSession = (req) => {
	return req.session.user || null;
};

const setTokenInSession = (req, token) => {
	req.session.token = token;
};

const setUserInSession = (req, user) => {
	req.session.user = user;
};


const clearSession = (req) => {
	req.session.destroy((err) => {
		if (err) {
			console.error('Error destroying session:', err);
		}
	});
};

module.exports = {
	getTokenFromSession,
	setTokenInSession,
	getUserFromSession,
	setUserInSession,
	clearSession,
};