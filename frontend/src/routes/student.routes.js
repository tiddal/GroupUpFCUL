import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Notifications from '../pages/Notifications';

import Dashboard from '../pages/Students/Dashboard';
import Projects from '../pages/Students/Projects';
import Teams from '../pages/Students/Teams';
import Team from '../pages/Students/Team';

import EditProfile from '../pages/EditProfile';
import Profile from '../pages/Profile';

import Navigation from '../components/Navigation';
import ScrollToTop from '../components/ScrollToTop';

const StudentRoutes = () => (
	<BrowserRouter>
		<ScrollToTop />
		<Navigation />
		<Switch>
			<Route exact path="/" component={Dashboard} />
			<Route path="/profile/edit" component={EditProfile} />
			<Route exact path="/profile/:user" component={Profile} />
			<Route exact path="/projects/:unit" component={Projects} />
			<Route exact path="/projects/:unit/:project/teams" component={Teams} />
			<Route path="/projects/:unit/:project/teams/:team" component={Team} />
			<Route path="/notifications" component={Notifications} />
			<Route render={() => <Redirect to="/" />} />
		</Switch>
	</BrowserRouter>
);

export default StudentRoutes;
