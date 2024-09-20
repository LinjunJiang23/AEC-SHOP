// src/api/utils/tokenUtils.js
import { jwtDecode } from 'jwt-decode';

export const saveToken = (token) => {
	localStorage.setItem('token', token);
};

export const getToken = () => {
	return localStorage.getItem('token');
};

export const clearToken = () => {
	localStorage.removeItem('token');
};

export const decodeToken = (token) => {
	return jwtDecode(token);
};
