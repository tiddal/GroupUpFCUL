import React from 'react';

import { useAuth } from '../../../hooks';

import { Container } from './styles';
import { useTheme } from '../../../hooks';

import Navbar from '../../../components/Navbar';

function Dashboard() {
	const { logout } = useAuth();
	const { toggleTheme } = useTheme();

	return (
		<Container>
			<Navbar />
			<h1>Dashboard</h1>
			<button onClick={logout}>Logout</button>
			<button onClick={toggleTheme}>Mudar tema</button>
		</Container>
	);
}

export default Dashboard;
