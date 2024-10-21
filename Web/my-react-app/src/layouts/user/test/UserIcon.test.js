// src/layouts/user/test/UserIcon.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Auth } from '../../../api/Auth';
import UserIcon from '../UserIcon';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../api/Auth');

describe('UserIcon', () => {
	beforeEach(() => {
      jest.resetAllMocks();
    });
	test('applies user value correctly on screen', () => {
		const mockAuthValue = {
			user: {username: 'TestUser'}
		};
		
		render(
		  
			<Auth.Provider value={mockAuthValue}>
				<BrowserRouter>
				  <UserIcon/>
				</BrowserRouter>
			</Auth.Provider>
		);
		expect(screen.getByText('Welcome, TestUser!')).toBeInTheDocument();
	});
	test('not apply user value on screen', () => {
			const mockAuthValue = {
				user: null
			};
			render(
			
			<Auth.Provider value={mockAuthValue}>
				<BrowserRouter>
				  <UserIcon/>
				</BrowserRouter>
			</Auth.Provider>
		);
		expect(screen).toEqual(expect.not.stringContaining('Welcome'));
	});
});