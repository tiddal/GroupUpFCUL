import React from 'react';
import GlobalStyles from '../styles/global';
import { AuthProvider } from '../contexts/auth';
import { CustomThemeProvider } from '../contexts/theme';

import Routes from '../routes';

function App() {
	return (
		<CustomThemeProvider>
			<AuthProvider>
				<GlobalStyles />
				<Routes />
			</AuthProvider>
		</CustomThemeProvider>
	);
}

export default App;
