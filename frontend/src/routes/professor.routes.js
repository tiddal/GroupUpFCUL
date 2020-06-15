import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Professors/Dashboard';
import Projects from '../pages/Professors/Projects';
import NewProject from '../pages/Professors/NewProject';

import Navigation from '../components/Navigation';
import ScrollToTop from '../components/ScrollToTop';
import Stages from '../pages/Professors/Stages';

const ProfessorRoutes = () => (
	<BrowserRouter>
		<ScrollToTop />
		<Navigation />
		<Switch>
			<Route exact path="/" component={Dashboard} />
			<Route exact path="/projects/:unit" component={Projects} />
			<Route path="/projects/:unit/new" component={NewProject} />
			<Route path="/projects/:unit/:project/stages" component={Stages} />
		</Switch>
	</BrowserRouter>
);

export default ProfessorRoutes;
