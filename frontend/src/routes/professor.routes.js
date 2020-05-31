import React from 'react';
import Dashboard from '../pages/Professors/Dashboard';
import Projects from '../pages/Professors/Projects';
import NewProject from '../pages/Professors/NewProject';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AsyncNavigation from '../components/AsyncNavigation';

const ProfessorRoutes = () => (
	<BrowserRouter>
		<AsyncNavigation />
		<Switch>
			<Route exact path="/" component={Dashboard} />
			<Route exact path="/projects/:unit" component={Projects} />
			<Route path="/projects/:unit/new" component={NewProject} />
		</Switch>
	</BrowserRouter>
);

export default ProfessorRoutes;
