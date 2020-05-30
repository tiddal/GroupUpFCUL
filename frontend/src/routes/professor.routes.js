import React from 'react';
import Dashboard from '../pages/Professors/Dashboard';
import Projects from '../pages/Professors/Projects';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AsyncNavigation from '../components/AsyncNavigation';

const ProfessorRoutes = () => (
	<BrowserRouter>
		<AsyncNavigation />
		<Switch>
			<Route exact path="/" component={Dashboard} />
			<Route path="/projects/:unit" component={Projects} />
		</Switch>
	</BrowserRouter>
);

export default ProfessorRoutes;
