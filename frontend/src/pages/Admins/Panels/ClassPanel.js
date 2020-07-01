import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import adminService from "../../../services/admin";

import { CardSpinner } from "../../../components/Spinner";
import Context from "../../../components/Context";
import { StatusCard, SearchCard, XSmallCard } from "../../../components/Card";

import { FaListUl, FaEdit, FaSearch, FaUserPlus } from "react-icons/fa";
import { useYear } from "../../../hooks";

import {
  Container,
  SearchSection,
  SearchBar,
  Button,
  StatusCardData,
} from "./styles";

function ClassPanel() {
  const [loading, setLoading] = useState(true);
  const { selectedYear } = useYear();
  const [classData, setClassData] = useState({
    courseData: { initials: "", code: "" },
    unitData: { initials: "", code: "" },
    students: [],
    professors: [],
  });
  const [searchInput, setSearchInput] = useState("");
  const {
    params: { course, unit, class_number },
  } = useRouteMatch("/courses/:course/units/:unit/classes/:class_number");
  const history = useHistory();

  useEffect(() => {
    async function setState() {
      let [{ initials, code }] = await adminService.get.courseByCode(course);
      const courseData = { initials, code };
      [{ initials, code }] = await adminService.get.unitByCode(course, unit);
      const unitData = { initials, code };
      const [students, status] = await adminService.get.studentsFromClass(
        class_number,
        selectedYear,
        course,
        unit
      );
      if (status === 404) {
        return history.push(`/courses/${course}/units/${unit}/classes/`);
      }
      const [professors] = await adminService.get.professorsFromClass(
        class_number,
        selectedYear,
        course,
        unit
      );
      setClassData({
        courseData,
        unitData,
        students,
        professors,
      });
      setLoading(false);
    }
    setState();
  }, [course, unit, class_number, selectedYear, history]);

  function handleSearch(event) {
    event.preventDefault();
    history.push({
      pathname: `/courses/${course}/units/${unit}/classes/${class_number}/members`,
      panelSearchInput: searchInput,
    });
  }

  return (
    <>
      {!loading && (
        <Context
          path={[
            { tier: "courses", title: "cursos" },
            {
              tier: `courses/${course}`,
              title: classData.courseData.initials,
            },
            {
              tier: `courses/${course}/units`,
              title: "cadeiras",
            },
            {
              tier: `courses/${course}/units/${unit}`,
              title: classData.unitData.initials,
            },
            {
              tier: `courses/${course}/units/${unit}/classes`,
              title: "turmas",
            },
            {
              tier: `courses/${course}/units/${unit}/classes/${class_number}`,
              title: class_number,
            },
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
                  {classData.students.length} Alunos
                </StatusCardData>
                <StatusCardData>
                  {classData.professors.length} Professores
                </StatusCardData>
              </>
            )
          }
        />
        <SearchCard>
          <SearchSection onSubmit={handleSearch}>
            <SearchBar
              placeholder={"Procurar membro da turma..."}
              onChange={({ target }) => setSearchInput(target.value)}
            />
            <Button>
              <FaSearch />
            </Button>
            <span>Procurar por número de utilizador</span>
          </SearchSection>
        </SearchCard>

        <XSmallCard
          path={`/courses/${course}/units/${unit}/classes/${class_number}/members`}
          label={"Ver Membros"}
          icon={<FaListUl />}
        />
        <XSmallCard
          path={`/courses/${course}/units/${unit}/classes/${class_number}/members/new`}
          label={"Adicionar Membro"}
          icon={<FaUserPlus />}
        />
        <XSmallCard
          path={`/courses/${course}/units/${unit}/classes/${class_number}/edit`}
          label={"Editar Turma"}
          icon={<FaEdit />}
        />
      </Container>
    </>
  );
}

export default ClassPanel;
