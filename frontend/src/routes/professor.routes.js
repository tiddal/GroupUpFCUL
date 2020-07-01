import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';

import Dashboard from '../pages/Professors/Dashboard';
import Projects from '../pages/Professors/Projects';
import NewProject from '../pages/Professors/NewProject';
import EditProject from '../pages/Professors/EditProject';

import Navigation from '../components/Navigation';
import ScrollToTop from '../components/ScrollToTop';
import Stages from '../pages/Professors/Stages';
import Teams from '../pages/Professors/Teams';
import Submissions from '../pages/Professors/Submissions';
import Submission from '../pages/Professors/Submission';

const ProfessorRoutes = () => (
	<BrowserRouter>
		<ScrollToTop />
		<Navigation />
		<Switch>
			<Route exact path="/" component={Dashboard} />
			<Route path="/profile/edit" component={EditProfile} />
			<Route exact path="/profile/:user" component={Profile} />
			<Route exact path="/projects/:unit" component={Projects} />
			<Route path="/projects/:unit/new" component={NewProject} />
			<Route exact path="/projects/:unit/:project/stages" component={Stages} />
			<Route
				exact
				path="/projects/:unit/:project/stages/:stage/submissions"
				component={Submissions}
			/>
			<Route
				path="/projects/:unit/:project/stages/:stage/submissions/:team"
				component={Submission}
			/>
			<Route path="/projects/:unit/:project/teams" component={Teams} />
			<Route path="/projects/:unit/:project/edit" component={EditProject} />
		</Switch>
	</BrowserRouter>
);

export default ProfessorRoutes;
