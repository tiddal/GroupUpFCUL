import React, { useState, useEffect } from "react";
import adminService from "../../../services/admin";

import Navigation from "../../../components/Navigation";
import Table from "../../../components/Table";
import Context from "../../../components/Context";
import { ButtonSpinner } from "../../../components/Spinner";
import {
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
  const [searchInput, setSearchInput] = useState({
    initial: panelSearchInput ? panelSearchInput : "",
    value: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getClasses(code = "") {
      if (code === "") {
        const response = await adminService.get.unit_classes();
        const rows = response.map((class_) => createTableRow(class_));
        setList(rows);
      } else {
        const [class_, status] = await adminService.get.class_(code);
        status === 200 ? setList([createTableRow(class_)]) : setList();
      }
    }

    if (searchInput.initial !== "") {
      getClasses(searchInput.initial);
    } else {
      getClasses();
    }
  }, [searchInput]);

  async function getClassByCode() {
    setLoading(true);
    const [class_, status] = await adminService.get.class_(searchInput.value);
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
            pathname: `courses/${course}/units/${unit}/classes/2019-2020/${class_.number}`,
            initials: course.initials,
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
          { tier: `courses/${course}`, title: courseData.initials },
          { tier: `courses/${course}/units/${unit}`, title: unitData.initials },
          {
            tier: `courses/${course}/units/${unit}/list`,
            title: "listar turmas",
          },
        ]}
      />
      <Container>
        <Sheet>
          <Title>
            <FaUniversity />
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
              columns_width={[11, 17, 22, 17, 17, 16]}
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
