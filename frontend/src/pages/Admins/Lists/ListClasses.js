import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import adminService from "../../../services/admin";

import Navigation from "../../../components/Navigation";
import Table from "../../../components/Table";
import Context from "../../../components/Context";
import { ButtonSpinner } from "../../../components/Spinner";
import {
  FaUsers,
  FaUserGraduate,
  FaUniversity,
  FaUserShield,
  FaUserTie,
  FaSearch,
  FaExternalLinkAlt,
} from "react-icons/fa";

import {
  Container,
  Sheet,
  Title,
  SearchSection,
  SearchBar,
  Button,
  Link,
  TableSection,
} from "./styles";

function ListClasses({ location: { panelSearchInput } }) {
  const [list, setList] = useState();
  const [unitData, setUnitData] = useState({
    course_initials: "",
    course_code: "",
    unit_initials: "",
    unit_code: "",
  });
  const {
    params: { course, unit },
  } = useRouteMatch("/courses/:course/units/:unit");
  const [searchInput, setSearchInput] = useState({
    initial: panelSearchInput ? panelSearchInput : "",
    value: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function setState() {
      const [
        { initials: course_initials, code: course_code },
      ] = await adminService.get.courseByCode(course);
      const [
        { initials: unit_initials, code: unit_code },
      ] = await adminService.get.unitByCode(course, unit);
      console.log(unit_initials);
      setUnitData({
        course_initials,
        course_code,
        unit_initials,
        unit_code,
      });
      setLoading(false);
    }
    setState();

    async function getClasses(code = "") {
      if (code === "") {
        const response = await adminService.get.classesFromUnit(course, unit);
        console.log(response);
        const rows = response.map((class_) => createTableRow(class_));
        setList(rows);
      } else {
        const [class_, status] = await adminService.get.class_(
          code,
          course,
          unit
        );
        status === 200 ? setList([createTableRow(class_)]) : setList();
      }
    }

    if (searchInput.initial !== "") {
      getClasses(searchInput.initial);
    } else {
      getClasses();
    }
  }, [searchInput, course, unit]);

  async function getClassByCode() {
    setLoading(true);
    const [class_, status] = await adminService.get.class_(
      searchInput.value,
      course,
      unit
    );
    status === 200 ? setList([createTableRow(class_)]) : setList();
    setLoading(false);
  }

  function handleSearch(event) {
    event.preventDefault();
    getClassByCode();
  }

  const createTableRow = (class_) => [
    { data: class_.number },
    { data: class_.academic_year },
    { data: class_.week_day },
    { data: class_.begins_at },
    { data: class_.ends_at },
    {
      data: (
        <Link
          to={{
            pathname: `/courses/${course}/units/${unit}/classes/2019-2020/${class_.number}`,
          }}
        >
          <FaExternalLinkAlt />
        </Link>
      ),
    },
  ];

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
      <Context
        path={[
          { tier: "courses", title: "cursos" },
          {
            tier: `courses/${unitData.course_code}`,
            title: unitData.course_initials,
          },
          {
            tier: `courses/${unitData.course_code}/units`,
            title: "cadeiras",
          },
          {
            tier: `courses/${unitData.course_code}/units/${unitData.unit_code}`,
            title: unitData.unit_initials,
          },
          {
            tier: `courses/${unitData.course_code}/units/${unitData.unit_code}/classes`,
            title: "turmas",
          },
        ]}
      />
      <Container>
        <Sheet>
          <Title>
            <FaUsers />
            <span>Turmas</span>
          </Title>
          <SearchSection onSubmit={handleSearch}>
            <SearchBar
              placeholder={"Procurar turma..."}
              onChange={({ target }) =>
                setSearchInput({ initial: "", value: target.value })
              }
              value={
                searchInput.initial === ""
                  ? searchInput.value
                  : searchInput.initial
              }
            />
            <Button>{loading ? <ButtonSpinner /> : <FaSearch />}</Button>
            <span>Procurar por código de turma</span>
          </SearchSection>
          <TableSection>
            <Table
              columns_width={[12, 17, 22, 20, 20, 9]}
              columns={[
                { name: "Código" },
                { name: "Ano Lectivo" },
                { name: "Dia da Semana" },
                { name: "Hora Inicio" },
                { name: "Hora Fim" },
              ]}
              rows={list}
            />
          </TableSection>
        </Sheet>
      </Container>
    </>
  );
}

export default ListClasses;
