// src/server/utils/cookieUtils.js

const cookieUtils = {
	setCookie: (res, name, value, options = {}) => {
	  const defaults = { httpOnly: true, secure: true, sameSite: 'none' };
	  res.cookie(name, value, { ...defaults, ...options });
	},
	
	getCookie: (req, name) => {
		return req.cookies[name];
	},
	
	clearCookie: (res, name) => {
		res.clearCookie(name);
	}
};

module.exports = cookieUtils;