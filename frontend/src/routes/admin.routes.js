import React from "react";
import Dashboard from "../pages/Admins/Dashboard";
import AdminPanel from "../pages/Admins/Panels/AdminPanel";
import ProfessorPanel from "../pages/Admins/Panels/ProfessorPanel";
import CoursePanel from "../pages/Admins/Panels/CoursePanel";

import NewAdmin from "../pages/Admins/NewEntries/NewAdmin";
import ListAdmins from "../pages/Admins/Lists/ListAdmins";
import LoadAdminFile from "../pages/Admins/LoadFile/LoadAdminFile";
import EditAdmin from "../pages/Admins/Edits/EditAdmin";

import NewProfessor from "../pages/Admins/NewEntries/NewProfessor";
import ListProfessors from "../pages/Admins/Lists/ListProfessors";
import LoadProfessorFile from "../pages/Admins/LoadFile/LoadProfessorFile";
import EditProfessor from "../pages/Admins/Edits/EditProfessor";

import NewCourse from "../pages/Admins/NewEntries/NewCourse";
import ListCourses from "../pages/Admins/Lists/ListCourses";
import LoadCourseFile from "../pages/Admins/LoadFile/LoadCourseFile";
import EditCourse from "../pages/Admins/Edits/EditCourse";

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
      <Route path="/professors" exact component={ProfessorPanel} />
      <Route path="/professors/new" component={NewProfessor} />
      <Route path="/professors/list" component={ListProfessors} />
      <Route path="/professors/file" component={LoadProfessorFile} />
      <Route path="/professors/:user/edit" component={EditProfessor} />
      <Route path="/courses/" exact component={CoursePanel} />
      <Route path="/courses/new" component={NewCourse} />
      <Route path="/courses/list" component={ListCourses} />
      <Route path="/courses/file" component={LoadCourseFile} />
      <Route path="/courses/:course/edit" component={EditCourse} />
    </Switch>
  </BrowserRouter>
);

export default AdminRoutes;
