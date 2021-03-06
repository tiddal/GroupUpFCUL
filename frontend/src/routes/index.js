import React from 'react';
import AuthRoutes from './auth.routes';
import AdminRoutes from './admin.routes';
import ProfessorRoutes from './professor.routes';
import StudentRoutes from './student.routes';
import { useAuth } from '../hooks';
import Loading from '../pages/Loading';

const Routes = () => {
	const { loggedIn, user, starting } = useAuth();

	function handleRoutes() {
		if (!loggedIn) return <AuthRoutes />;
		switch (user.role) {
			case 'admin':
				return <AdminRoutes />;
			case 'professor':
				return <ProfessorRoutes />;
			case 'student':
				return <StudentRoutes />;
			default:
				return <AuthRoutes />;
		}
	}

	if (starting) return <Loading />;

	return handleRoutes();
};

export default Routes;
