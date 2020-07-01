import React, { useEffect, useState } from "react";
import adminService from "../../../services/admin";
import { useYear } from "../../../hooks";

import { Container, SmallCardData, BigCardData } from "./styles";

import Spinner from "../../../components/Spinner";

import { SmallCard, BigCard } from "../../../components/Card";

import { FaUserGraduate, FaUniversity, FaUserTie } from "react-icons/fa";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState({ online: [], offline: [] });
  const [professors, setProfessors] = useState({ online: [], offline: [] });
  const { selectedYear } = useYear();
  const [admins, setAdmins] = useState({ online: [], offline: [] });
  const [coursesData, setCoursesData] = useState({
    courses: [],
    units: [],
    classes: [],
  });

  async function setUsersStatus(setUsersState, service) {
    const users = await service();
    const online = users.filter((user) => user.status === "online");
    const offline = users.filter((user) => user.status === "offline");
    setUsersState({ online, offline });
  }

  useEffect(() => {
    async function setState() {
      await setUsersStatus(setStudents, adminService.get.students);
      await setUsersStatus(setProfessors, adminService.get.professors);
      await setUsersStatus(setAdmins, adminService.get.admins);
      const courses = await adminService.get.courses();
      const units = await adminService.get.units();
      const classes = await adminService.get.classes(selectedYear);
      setCoursesData({ courses, units, classes });
      setLoading(false);
    }
    setState();
  }, [selectedYear]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <SmallCard
            title={"alunos"}
            icon={<FaUserGraduate />}
            path={"/students"}
            label={"Gerir Alunos"}
            data={
              <>
                <SmallCardData status={"online"}>
                  {students.online.length} online <span></span>
                </SmallCardData>
                <SmallCardData status={"offline"}>
                  {students.offline.length} offline <span></span>
                </SmallCardData>
              </>
            }
          />
          <SmallCard
            title={"professores"}
            icon={<FaUserTie />}
            path={"/professors"}
            label={"Gerir Professores"}
            data={
              <>
                <SmallCardData status={"online"}>
                  {professors.online.length} online <span></span>
                </SmallCardData>
                <SmallCardData status={"offline"}>
                  {professors.offline.length} offline <span></span>
                </SmallCardData>
              </>
            }
          />
          <SmallCard
            title={"admins"}
            icon={<FaUserTie />}
            path={"/admins"}
            label={"Gerir Admins"}
            data={
              <>
                <SmallCardData status={"online"}>
                  {admins.online.length} online <span></span>
                </SmallCardData>
                <SmallCardData status={"offline"}>
                  {admins.offline.length} offline <span></span>
                </SmallCardData>
              </>
            }
          />
          <BigCard
            title={"cursos"}
            icon={<FaUniversity />}
            path={"/courses"}
            label={"Gerir Cursos"}
            data={
              <BigCardData>
                <span>{coursesData.courses.length} cursos</span>
                <span>{coursesData.units.length} cadeiras</span>
                <span>{coursesData.classes.length} turmas</span>
              </BigCardData>
            }
          />
        </Container>
      )}
    </>
  );
}

export default Dashboard;
