import React from "react";
import Dashboard from "../pages/Admins/Dashboard";
import AdminPanel from "../pages/Admins/Panels/AdminPanel";

import StudentPanel from "../pages/Admins/Panels/StudentPanel";
import ProfessorPanel from "../pages/Admins/Panels/ProfessorPanel";
import NewAdmin from "../pages/Admins/NewEntries/NewAdmin";
import ListAdmins from "../pages/Admins/Lists/ListAdmins";
import LoadAdminFile from "../pages/Admins/LoadFile/LoadAdminFile";
import EditAdmin from "../pages/Admins/Edits/EditAdmin";

import ListStudents from "../pages/Admins/Lists/ListStudents";
import EditStudents from "../pages/Admins/Edits/EditStudent";
import NewStudent from "../pages/Admins/NewEntries/NewStudent";
import LoadStudentFile from "../pages/Admins/LoadFile/LoadStudentFile";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EditStudent from "../pages/Admins/Edits/EditStudent";

import NewProfessor from "../pages/Admins/NewEntries/NewProfessor";
import ListProfessors from "../pages/Admins/Lists/ListProfessors";
import LoadProfessorFile from "../pages/Admins/LoadFile/LoadProfessorFile";
import EditProfessor from "../pages/Admins/Edits/EditProfessor";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const AdminRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/admins" exact component={AdminPanel} />
      <Route path="/admins/new" component={NewAdmin} />
      <Route path="/admins/list" component={ListAdmins} />
      <Route path="/admins/file" component={LoadAdminFile} />
      <Route path="/admins/:user/edit" component={EditAdmin} />
      <Route path="/students" exact component={StudentPanel} />
      <Route path="/students/list" exact component={ListStudents} />
      <Route path="/students/:user/edit" exact component={EditStudent} />
      <Route path="/students/new" exact component={NewStudent} />
      <Route path="/students/file" exact component={LoadStudentFile} />
      <Route path="/professors" exact component={ProfessorPanel} />
      <Route path="/professors/new" component={NewProfessor} />
      <Route path="/professors/list" component={ListProfessors} />
      <Route path="/professors/file" component={LoadProfessorFile} />
      <Route path="/professors/:user/edit" component={EditProfessor} />
    </Switch>
  </BrowserRouter>
);

export default AdminRoutes;
