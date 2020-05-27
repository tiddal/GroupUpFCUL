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
  FaListAlt,
  FaSearch,
  FaExternalLinkAlt,
  FaPortrait,
} from "react-icons/fa";

import {
  Container,
  Sheet,
  Title,
  SearchSection,
  SearchBar,
  Button,
  Link,
  Avatar,
  TableSection,
} from "./styles";

function ListUnits({ location: { panelSearchInput }, match:{params:{course}} }) {
  const [list, setList] = useState();
  const [searchInput, setSearchInput] = useState({
    initial: panelSearchInput ? panelSearchInput : "",
    value: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUnits(unitCode = "") {
      if (unitCode === "") {
        const response = await adminService.getUnitsFromCourse(course);
        console.log(response)
        const rows = response.map((unit) => createTableRow(unit));
        setList(rows);
      } else {
        const [unit, status] = await adminService.getUnitByCode(
          course, unitCode
        );
        status === 200 ? setList([createTableRow(unit)]) : setList();
      }
    }

    if (searchInput.initial !== "") {
      getUnits(searchInput.initial);
    } else {
      getUnits();
    }
    console.log(course);
  }, [searchInput]);

  async function getProfessorByUsername() {
    setLoading(true);
    const [professor, status] = await adminService.getProfessorByUsername(
      searchInput.value
    );
    status === 200 ? setList([createTableRow(professor)]) : setList();
    setLoading(false);
  }

  function handleSearch(event) {
    event.preventDefault();
    getProfessorByUsername();
  }

  const createTableRow = (unit) => [
    {
      data: unit.code
    },
    { data: unit.initials },
    { data: unit.semester },
    { data: unit.name, align:"left" },
    {
      data: (
        <Link to={`/courses/${course}/units/${unit.code}`}>
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
          { tier: "course", title: "curso" },
          { tier: "course/units", title: "cadeiras" },
          { tier: "course/units/list", title: "listar" },
        ]}
      />
      <Container>
        <Sheet>
          <Title>
            <FaListAlt />
            <span>Cadeiras</span>
          </Title>
          <SearchSection onSubmit={handleSearch}>
            <SearchBar
              placeholder={"Procurar cadeira..."}
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
            <span>Procurar por código da cadeira</span>
          </SearchSection>
          <TableSection>
            <Table
              columns_width={[11, 10, 12, 58, 9]}
              columns={[
                { name: "Código" },
                { name: "Sigla" },
                { name: "Semestre" },
                { name: "Nome", align: "left"  },
              ]}
              rows={list}
            />
          </TableSection>
        </Sheet>
      </Container>
    </>
  );
}

export default ListUnits;
