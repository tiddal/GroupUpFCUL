import React from "react";
import Dashboard from "../pages/Students/Dashboard";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const StudentRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default StudentRoutes;
