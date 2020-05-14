import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import { AuthContext } from '../contexts/auth';

export function usePersistedState(key, initialState) {
	const [state, setState] = useState(() => {
		const localValue = localStorage.getItem(key);
		if (localValue) return JSON.parse(localValue);
		return initialState;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState];
}

export function useTheme() {
	const context = useContext(ThemeContext);
	return context;
}

export function useAuth() {
	const context = useContext(AuthContext);
	return context;
}
