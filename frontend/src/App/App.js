import React from 'react';
import GlobalStyles from '../styles/global';
import { AuthProvider } from '../contexts/auth';

import Routes from '../routes';

function App() {
	return (
		<div>
			<AuthProvider>
				<GlobalStyles />
				<Routes />
			</AuthProvider>
		</div>
	);
}

export default App;
