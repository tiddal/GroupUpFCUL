import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Students/Dashboard';
import Projects from '../pages/Students/Projects';
import Teams from '../pages/Students/Teams';

import Navigation from '../components/Navigation';
import ScrollToTop from '../components/ScrollToTop';

const StudentRoutes = () => (
	<BrowserRouter>
		<ScrollToTop />
		<Navigation />
		<Switch>
			<Route exact path="/" component={Dashboard} />
			<Route exact path="/projects/:unit" component={Projects} />
			<Route exact path="/projects/:unit/:project/teams" component={Teams} />
		</Switch>
	</BrowserRouter>
);

export default StudentRoutes;
