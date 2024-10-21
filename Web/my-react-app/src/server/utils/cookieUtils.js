// src/server/utils/cookieUtils.js

const setCookie = (res, name, value, options = {}) => {
	  const defaults = { httpOnly: true, secure: true, sameSite: 'none' };
	  res.cookie(name, value, { ...defaults, ...options });
};
	
const getCookie = (req, name) => {
		return req.cookies[name];
};
	
const clearCookie = (res, name) => {
		res.clearCookie(name);
};

module.exports = {
	setCookie,
	getCookie,
	clearCookie,
};