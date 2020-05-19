import React from 'react';
import Dashboard from '../pages/Admins/Dashboard';
import AdminPanel from '../pages/Admins/Panels/Admin';
import ProfessorPanel from '../pages/Admins/Panels/Professor';
import StudentPanel from '../pages/Admins/Panels/Student';
import CoursesPanel from '../pages/Admins/Panels/Courses';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const AdminRoutes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Dashboard} />
			<Route path="/admins" exact component={AdminPanel} />
			<Route path="/professors" exact component={ProfessorPanel} />
			<Route path="/students" exact component={StudentPanel} />
			<Route path="/courses" exact component={CoursesPanel} />
		</Switch>
	</BrowserRouter>
);

export default AdminRoutes;
