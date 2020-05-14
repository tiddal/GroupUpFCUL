import React, { createContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import API from '../services/api';
import authService from '../services/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [starting, setStarting] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function loadToken() {
			const localToken = localStorage.getItem('@GroupUpAuth:token');
			const localUser = localStorage.getItem('@GroupUpAuth:user');

			if (
				localToken &&
				localUser &&
				Date.now() <= jwt.decode(localToken).exp * 1000
			) {
				setUser(JSON.parse(localUser));
				API.defaults.headers.Authorization = `Bearer ${localToken}`;
			} else {
				localStorage.clear();
			}
			setStarting(false);
		}
		loadToken();
	}, []);

	async function login(userData) {
		setLoading(true);
		const { token } = await authService.authenticate(userData);
		if (!token) {
			setError(true);
		} else {
			API.defaults.headers.Authorization = `Bearer ${token}`;
			const { username, role } = jwt.decode(token);
			localStorage.setItem('@GroupUpAuth:token', token);
			localStorage.setItem(
				'@GroupUpAuth:user',
				JSON.stringify({ username, role })
			);
			setUser({ username, role });
			setError(false);
		}
		setLoading(false);
	}

	function logout() {
		localStorage.clear();
		setUser(null);
	}

	return (
		<AuthContext.Provider
			value={{
				loggedIn: !!user,
				user,
				loading,
				starting,
				error,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
