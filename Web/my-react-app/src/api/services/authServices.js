// src/api/services/authServices.js
import api from '../config/apiConfig';

{ /* CustomerSide Services */ }

/**
 * POST FUNCTION loginValidate to handle user login validation
 * @param { string } accountName - used to validate user's account name
 * @param { string } pw - used to validate user's password
 * @return { Promise<Object> || Error } Return user data or throw errors accordingly
 */
export const loginValidate = async (accountName, pw) => {
	try {
		const response = await api.post('/auth/login', { accountName, pw });
		if (response.status === 200) {
			return response;
		} else {
			throw new Error('Invalid password or account name.');
		}
	} catch (error) {
		console.error('User login error:', error);
		throw error;
	}
};

/**
 * POST FUNCTION to handle user registration
 * @param { Object } newUser - contains all input information
 * @return { Promise<Object> || Error } Return user data or throw errors accordingly
 */
export const registerUser = async (newUser) => {
	try {
	  const response = await api.post('/auth/register', {  });
	} catch (error) {
	
	}
};




{ /* SellerSide Services*/ }

/**
 * FUNCTION to handle admin login validation
 * @param { string } accountName - used to validate admin's account name
 * @param { string } pw - used to validate admin's password
 * @return { Promise<Object> || Error } Return admin data or throw errors accordingly
 */
 
export const adminLoginValidate = async (accountName, pw) => { 
	try {
		const response = await api.post('/auth/adminLogin', { accountName, pw });
			if (response.status === 200) {
				return response;
			} else {
				thrwo new Error('Invalid password or account name.');
			}
		} catch (error) {
			console.error('Admin login error:', error);
			throw error;
		}
};