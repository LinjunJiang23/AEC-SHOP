// src/api/services/authServices.js
import api from '../config/apiConfig';

{ /* CustomerSide Services */ }

/**
 * FUNCTION to handle user login validation
 * @param { string } accountName - used to validate user's account name
 * @param { string } pw - used to validate user's password
 * @return { Promise<Object> || Error } Return user data or throw errors accordingly
 */
export const loginValidate = async (accountName, pw) => {
	try {
		const response = await api.post('CustomerRoute/loginValidate', { accountName, pw });
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



{ /* SellerSide Services*/ }

/**
 * FUNCTION to handle admin login validation
 * @param { string } accountName - used to validate admin's account name
 * @param { string } pw - used to validate admin's password
 * @return { Promise<Object> || Error } Return admin data or throw errors accordingly
 */
 
export const adminLoginValidate = async (accountName, pw) => { 
	try {
		const response = await api.post('SellerRoute/adminLoginValidate', { accountName, pw });
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