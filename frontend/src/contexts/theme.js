import React, { createContext } from 'react';
import { ThemeProvider } from 'styled-components';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

import { usePersistedState } from '../hooks';

export const ThemeContext = createContext({});

export const CustomThemeProvider = ({ children }) => {
	const [theme, setTheme] = usePersistedState('@GroupUpTheme', light);

	function toggleTheme() {
		setTheme(theme.title === 'light' ? dark : light);
	}

	return (
		<ThemeContext.Provider value={{ toggleTheme, title: theme.title }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};
