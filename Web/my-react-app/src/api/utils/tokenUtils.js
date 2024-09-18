// src/api/utils/tokenUtils.js

export const saveToken = (token) => {
	localStorage.setItem('token', token);
};

export const getToken = () => {
	return localStorage.getItem('token');
};

export const clearToken = () => {
	localStorage.removeItem('token');
};