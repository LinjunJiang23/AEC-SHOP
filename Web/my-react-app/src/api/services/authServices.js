// src/api/services/authServices.js
import api from '../config/apiConfig';

 /* CustomerSide Services */ 
	
  /**
   * loginValidate - POST FUNCTION to handle user login validation
   * @param { string } accountName - used to validate user's account name
   * @param { string } pw - used to validate user's password
   * @return { Promise<Object> || Error } Return user data or throw errors accordingly
   */
const loginValidate = async (email, pw) => {
	try {
		const response = await api.post('/auth/login', { email, pw });
		if (response.data) {
			return response.data;
		} else {
			throw new Error(response.data.error);
		}
	} catch (error) {
		console.error('User login error:', error.message);
		throw error;
	}
};

  /**
   * registerUser - POST FUNCTION to handle user registration
   * @param { Object } newUser - contains all input information
   * @return { Promise<Object> || Error } Return user data or throw errors accordingly
   */
const registerUser = async (newUser) => {
	const accountName = newUser.accountName;
	const pw = newUser.pw;
	const fname = newUser.fname;
	const lname = newUser.lname;
	const phoneNum = newUser.phoneNum;
	const email = newUser.email;
	try {
	  
	  
	  await api.post('/auth/register', { accountName, pw, fname, lname, phoneNum, email });
	  return accountName;
	} catch (error) {
		console.error('User register error:', error);
		if (error.response.status === 409)
			 {
		  throw new Error('Email already in use, try logging in or retrieving password/accountName');
	    }
		throw error;
	}
};




  /* SellerSide Services*/

  /**
   * adminLoginValidate - POST FUNCTION to handle admin login validation
   * @param { string } accountName - used to validate admin's account name
   * @param { string } pw - used to validate admin's password
   * @return { Promise<Object> || Error } Return admin data or throw errors accordingly
   */
 
const adminLoginValidate = async (accountName, pw) => { 
	try {
		const response = await api.post('/auth/adminLogin', { accountName, pw });
			if (response.status === 200) {
				return response;
			} else {
				throw new Error('Invalid password or account name.');
			}
		} catch (error) {
			console.error('Admin login error:', error);
			throw error;
		}
};


export { 
	loginValidate,
	registerUser,
	adminLoginValidate
};