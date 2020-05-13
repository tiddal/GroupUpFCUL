import React from 'react';
import Dashboard from '../pages/Admins/Dashboard';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const AdminRoutes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={Dashboard} />
		</Switch>
	</BrowserRouter>
);

export default AdminRoutes;
