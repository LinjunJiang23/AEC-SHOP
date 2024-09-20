// src/api/Auth.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/Button/Button';
import { AuthProvider, Auth } from './Auth';
import { loginValidate, adminLoginValidate } from './services/authServices';
import api from './config/apiConfig';
import { clearToken, saveToken, getToken, decodeToken } from './utils/tokenUtils';
import { errorHandler } from './utils/errorHandler';

// Mock dependencies
jest.mock('./services/authServices');
jest.mock('./config/apiConfig', () => ({
	get: jest.fn()
}));
jest.mock('./utils/tokenUtils');
jest.mock('./utils/errorHandler');



describe('AuthProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const TestComponent = () => {
    const { user, isLogIn, guestLogin, userLogin, adminLogin, error, logout, role } = React.useContext(Auth);
    return (
      <div>
        <p>{isLogIn ? `Logged in as ${role}` : 'Not logged in'}</p>
        <Button onClick={ () => {userLogin('testUser', 'testPassword')} }>Login</Button>
        <Button onClick={ () => {guestLogin()} }>Guest Login</Button>
        <Button onClick={ () => {adminLogin('adminUser', 'adminPassword')} }>Admin Login</Button>
        <Button onClick={ () => {logout()} }>Logout</Button>
        {error && <p>{error}</p>}
      </div>
    );
  };
  
  it('should render children correctly', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText('Not logged in')).toBeInTheDocument();
  });

  it('should handle user login', async () => {
    const mockUser = { username: 'testUser', role: 'user' };
    const mockToken = 'mockToken';
    loginValidate.mockResolvedValue({ data: { token: mockToken } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    screen.getByText('Login').click(); // Trigger login
    decodeToken.mockResolvedValue({user: 'mockUser'});
    await waitFor(() => expect(screen.getByText('Logged in as user')).toBeInTheDocument());
  });

  it('should handle admin login', async () => {
    const mockAdmin = { admin: 'adminData', role: 'admin' };
	const mockToken = 'mockToken';
    adminLoginValidate.mockResolvedValue({ data: {token: mockToken} });
	
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    screen.getByText('Admin Login').click(); // Trigger admin login
	decodeToken.mockResolvedValue({user: 'mockUser'});
    await waitFor(() => expect(screen.getByText('Logged in as admin')).toBeInTheDocument());
  });

  it('should handle guest login', async () => {
    const mockToken = 'guestToken';
    api.get.mockResolvedValue({ headers: { 'Authorization': `Bearer ${mockToken}` }, ok: true});
	
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    screen.getByText('Guest Login').click(); // Trigger guest login
	decodeToken.mockResolvedValue({user: 'mockUser'});
    await waitFor(() => expect(screen.getByText('Logged in as guest')).toBeInTheDocument());
	expect(saveToken).toHaveBeenCalledWith(mockToken);

  });

  it('should handle logout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    screen.getByText('Logout').click(); // Trigger logout

    expect(clearToken).toHaveBeenCalled();
    expect(screen.getByText('Not logged in')).toBeInTheDocument();
  });
});
