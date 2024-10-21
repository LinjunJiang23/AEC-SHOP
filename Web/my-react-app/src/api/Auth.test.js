// src/api/Auth.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/Button/Button';
import { AuthProvider, Auth } from './Auth';
import { loginValidate, adminLoginValidate } from './services/authServices';
import api from './config/apiConfig';
import { errorHandler } from './utils/errorHandler';

// Mock dependencies
jest.mock('./services/authServices');
jest.mock('./config/apiConfig', () => ({
	get: jest.fn()
}));
jest.mock('./utils/errorHandler');



describe('AuthProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const TestComponent = () => {
    const { user, isLogIn, login, adminLogin, error, logout, role } = React.useContext(Auth);
    return (
      <div>
        <p>{isLogIn ? `Logged in as ${role}` : `Should be ${role}`}</p>
        <Button onClick={ () => {login('testUser@email.com', 'testPassword')} }>Login</Button>
        <Button onClick={ () => {adminLogin('adminUser@email.com', 'adminPassword')} }>Admin Login</Button>
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
    expect(screen.getByText('Should be guest')).toBeInTheDocument();
  });

  it('should handle user login', async () => {
    const mockUser = { username: 'testUser', role: 'user' };
    loginValidate.mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    screen.getByText('Login').click(); // Trigger login
    await waitFor(() => expect(screen.getByText('Logged in as user')).toBeInTheDocument());
  });

  it('should handle admin login', async () => {
    const mockAdmin = { admin: 'adminData', role: 'admin' };
    adminLoginValidate.mockResolvedValue(mockAdmin);
	
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    screen.getByText('Admin Login').click(); // Trigger admin login
    await waitFor(() => expect(screen.getByText('Logged in as admin')).toBeInTheDocument());
  });

  it('should handle logout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    screen.getByText('Logout').click(); // Trigger logout

    expect(screen.getByText('Should be guest')).toBeInTheDocument();
  });
});
