import React from 'react';
import Login from '../pages/Login';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const AuthRoutes = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={Login} />
		</Switch>
	</BrowserRouter>
);

export default AuthRoutes;
