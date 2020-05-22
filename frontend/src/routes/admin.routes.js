import React from 'react';
import Dashboard from '../pages/Admins/Dashboard';
import AdminPanel from '../pages/Admins/Panels/AdminPanel';

import NewAdmin from '../pages/Admins/NewEntries/NewAdmin';
import ListAdmins from '../pages/Admins/Lists/ListAdmins';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const AdminRoutes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Dashboard} />
			<Route path="/admins" exact component={AdminPanel} />
			<Route path="/admins/new" component={NewAdmin} />
			<Route path="/admins/list" component={ListAdmins} />
		</Switch>
	</BrowserRouter>
);

export default AdminRoutes;
