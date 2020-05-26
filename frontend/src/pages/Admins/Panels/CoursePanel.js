import React, { useEffect, useState } from "react";
import adminService from "../../../services/admin";

import Navigation from "../../../components/Navigation";
import { CardSpinner } from "../../../components/Spinner";
import Context from "../../../components/Context";
import { StatusCard, SearchCard, XSmallCard } from "../../../components/Card";

import {
  FaUserGraduate,
  FaUniversity,
  FaUserShield,
  FaUserTie,
  FaListUl,
  FaUserPlus,
  FaFileUpload,
  FaSearch,
} from "react-icons/fa";

import {
  Container,
  SearchSection,
  SearchBar,
  Button,
  StatusCardData,
} from "./styles";

function CoursePanel({ history }) {
  const [loading, setLoading] = useState(true);
  const [coursesData, setCoursesData] = useState({
    courses: [],
    units: [],
    classes: [],
  });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function setState() {
      const courses = await adminService.getCourses();
      const units = await adminService.getUnits();
      const classes = await adminService.getClasses();
      setCoursesData({ courses, units, classes });
      setLoading(false);
    }
    setState();
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    history.push({ pathname: "/courses/list", panelSearchInput: searchInput });
  }

  return (
    <>
      <Navigation
        items={[
          { icon: <FaUserGraduate />, name: "Alunos", path: "/students" },
          { icon: <FaUserTie />, name: "Professores", path: "/professors" },
          { icon: <FaUserShield />, name: "Admins", path: "/admins" },
          { icon: <FaUniversity />, name: "Cursos", path: "/courses" },
        ]}
      />
      <Context path={[{ tier: "courses", title: "cursos" }]} />
      <Container>
        <StatusCard
          data={
            loading ? (
              <CardSpinner />
            ) : (
              <>
                <StatusCardData>
                  {coursesData.courses.length} Cursos
                </StatusCardData>
                <StatusCardData>
                  {coursesData.units.length} Cadeiras
                </StatusCardData>
                <StatusCardData>
                  {coursesData.classes.length} Turmas
                </StatusCardData>
              </>
            )
          }
        />
        <SearchCard>
          <SearchSection onSubmit={handleSearch}>
            <SearchBar
              placeholder={"Procurar curso..."}
              onChange={({ target }) => setSearchInput(target.value)}
            />
            <Button>
              <FaSearch />
            </Button>
            <span>Procurar por código de curso</span>
          </SearchSection>
        </SearchCard>

        <XSmallCard
          path={"courses/list"}
          label={"Ver lista de Cursos"}
          icon={<FaListUl />}
        />
        <XSmallCard
          path={"courses/new"}
          label={"Adicionar Curso"}
          icon={<FaUserPlus />}
        />
        <XSmallCard
          path={"courses/file"}
          label={"Carregar ficheiro"}
          icon={<FaFileUpload />}
        />
      </Container>
    </>
  );
}

export default CoursePanel;
