import React from 'react';
import Login from '../pages/Login';
import GlobalStyles from '../styles/global';
import { AuthProvider } from '../contexts/auth';

function App() {
	return (
		<div>
			<AuthProvider>
				<GlobalStyles />
				<Login />
			</AuthProvider>
		</div>
	);
}

export default App;
