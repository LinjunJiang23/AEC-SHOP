// src/api/Auth.js
import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { loginValidate, adminLoginValidate } from './services/authServices';
import { errorHandler } from './utils/errorHandler';

const Auth = createContext();

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
	const [isGuest, setGuestLoggedIn] = useState(false);
	const [guest, setGuest] = useState(null);
	const [user, setUser] = useState(null);
	const [admin, setAdmin] = useState(null);
	const [error, setError] = useState(null);
	
	useEffect(() => {
	  const token = localStorage.getItem('token');
	  const guestToken = localStorage.getItem('guestToken');
	  if (token) {
	    const decodedUser = jwt_decode(token);
	    setLoggedIn(true);
		setUser(decodedUser);
	  } else if (guestToken) {
		const decodedGuest = jwt_decode(guestToken);
		setGuestLoggedIn(true);
		setGuest(decodedGuest);
	  } else {
		guestLogin();
	  }
	}, []);
	
	const guestLogin = async () => {
		try {
			const response = await fetch('/');
			if (!response.ok) throw new Error('Failed to create guest session');
			const token = response.headers['authorization'].replace('Bearer ', '');
			localStorage.setItem('guestToken', token);
			setGuestLoggedIn(true);
			const decodedGuest = jwt_decode(guestToken);
			setGuest(decodedGuest);
		} catch (error) {
			console.error('Guest login error:', error);
			setError('Failed to create guest session');
		}
	};
	
	const userLogin = async (accountName, pw) => {
		try {
			const response = await loginValidate(accountName, pw);
			const userData = response.data;
			
			//User log in successfully
			localStorage.setItem('token', userData.token);
			localStorage.setItem('user', JSON.stringify(userData.user));
			setUser(userData.user);
			setLoggedIn(true);
			setAdmin(null);
			setAdminLoggedIn(false);
			setError(null);
			
			//Remove existing guest data
			localStorage.removeItem('guestToken');
			setGuestLoggedIn(false);
			setGuest(null);
			
			
			return response;
			// Store JWT token in local storage
			localStorage.setItem('token', userData.token);
		} catch (error) {
			setError(errorHandler(error));
			setUser(null);
			setLoggedIn(false);
			console.error('User login error:', error);
		}
	};
	
	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('admin');
		
		setUser(null);
		setLoggedIn(false);
		setError(null);
		setAdminLoggedIn(false);
		setAdmin(null);
	};
	
	const adminLogin = async (accountName, pw) => {
		try {
			const response = await adminLoginValidate(accountName, pw);
			const adminData = response.data;
			
			localStorage.removeItem('guestToken');
			setGuestLoggedIn(false);
			setGuest(null);
			localStorage.removeItem('token');
			setUser(null);
			setLoggedIn(false);
			
			localStorage.setItem('adminToken', adminData.token);
			localStorage.setItem('admin', JSON.stringify(adminData.admin));
			setAdmin(adminData.admin);
			setAdminLoggedIn(true);
			
			setError(null);
			
			return response;
		} catch (error) {
			setError(errorHandler(error));
			setAdmin(null);
			setAdminLoggedIn(false);
			console.error('Admin login error: ', error);
		}
	};
	
	const contextValue = { guest, isGuest, guestLogin, user, isLoggedIn, userLogin, admin, isAdminLoggedIn, adminLogin, error };
	
	return (
	  <Auth.Provider value={contextValue}>
		{children}
	  </Auth.Provider>
	);
};

export { Auth, AuthProvider };