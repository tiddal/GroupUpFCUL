import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
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
  FaEdit,
  FaSearch,
  FaBook,
} from "react-icons/fa";

import {
  Container,
  SearchSection,
  SearchBar,
  Button,
  StatusCardData,
} from "./styles";

function CoursePanel() {
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState({
    initials: "",
    code: "",
    units: [],
    classes: [],
  });
  const [searchInput, setSearchInput] = useState("");
  const match = useRouteMatch("/courses/:course");
  const history = useHistory();

  useEffect(() => {
    async function setState() {
      const [{ initials, code }] = await adminService.get.courseByCode(
        match.params.course
      );
      const units = await adminService.get.units();
      const classes = await adminService.get.classes();
      setCourseData({ initials, code, units, classes });
      setLoading(false);
    }
    setState();
  }, [match.params.course]);

  function handleSearch(event) {
    event.preventDefault();
    history.push({
      pathname: "/courses/:code/list",
      panelSearchInput: searchInput,
    });
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
      {!loading && (
        <Context
          path={[
            { tier: "courses", title: "cursos" },
            { tier: "courses/list", title: "listar" },
            { tier: `courses/${courseData.code}`, title: courseData.initials },
          ]}
        />
      )}

      <Container>
        <StatusCard
          data={
            loading ? (
              <CardSpinner />
            ) : (
              <>
                <StatusCardData>
                  {courseData.units.length} Cadeiras
                </StatusCardData>
                <StatusCardData>
                  {courseData.classes.length} Turmas
                </StatusCardData>
              </>
            )
          }
        />
        <SearchCard>
          <SearchSection onSubmit={handleSearch}>
            <SearchBar
              placeholder={"Procurar cadeira..."}
              onChange={({ target }) => setSearchInput(target.value)}
            />
            <Button>
              <FaSearch />
            </Button>
            <span>Procurar por código de cadeira</span>
          </SearchSection>
        </SearchCard>

        <XSmallCard
          path={`/courses/${courseData.code}/list`}
          label={"Ver lista de Cadeiras"}
          icon={<FaListUl />}
        />
        <XSmallCard
          path={`/courses/${courseData.code}/units/new`}
          label={"Adicionar Cadeira"}
          icon={<FaBook />}
        />
        <XSmallCard
          path={`/courses/${courseData.code}/edit`}
          label={"Editar Curso"}
          icon={<FaEdit />}
        />
      </Container>
    </>
  );
}

export default CoursePanel;
