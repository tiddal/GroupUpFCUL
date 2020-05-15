import React from 'react';

import { useAuth } from '../../../hooks';

import { Container } from './styles';
import { useTheme } from '../../../hooks';

import Navigation from '../../../components/Navigation';

import {
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
} from 'react-icons/fa';

function Dashboard() {
	const { logout } = useAuth();
	const { toggleTheme } = useTheme();

	return (
		<Container>
			<Navigation
				items={[
					{ icon: <FaUserGraduate />, name: 'Alunos', path: '/students' },
					{ icon: <FaUserTie />, name: 'Professores', path: '/professors' },
					{ icon: <FaUserShield />, name: 'Admins', path: '/admins' },
					{ icon: <FaUniversity />, name: 'Cursos', path: '/courses' },
				]}
			/>
			<h1>Dashboard</h1>
			<button onClick={logout}>Logout</button>
			<button onClick={toggleTheme}>Mudar tema</button>
		</Container>
	);
}

export default Dashboard;
