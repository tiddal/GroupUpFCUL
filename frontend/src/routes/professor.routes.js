import React from "react";
import Dashboard from "../pages/Professors/Dashboard";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const ProfessorRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default ProfessorRoutes;
