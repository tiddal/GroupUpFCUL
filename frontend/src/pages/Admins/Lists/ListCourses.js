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

function ListCourses({ location: { panelSearchInput } }) {
  const [list, setList] = useState();
  const [searchInput, setSearchInput] = useState({
    initial: panelSearchInput ? panelSearchInput : "",
    value: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCourses(code = "") {
      if (code === "") {
        const response = await adminService.getCourses();
        const rows = response.map((course) => createTableRow(course));
        setList(rows);
      } else {
        const [course, status] = await adminService.getCourseByCode(code);
        status === 200 ? setList([createTableRow(course)]) : setList();
      }
    }

    if (searchInput.initial !== "") {
      getCourses(searchInput.initial);
    } else {
      getCourses();
    }
  }, [searchInput]);

  async function getCourseByCode() {
    setLoading(true);
    const [course, status] = await adminService.getCourseByCode(
      searchInput.value
    );
    status === 200 ? setList([createTableRow(course)]) : setList();
    setLoading(false);
  }

  function handleSearch(event) {
    event.preventDefault();
    getCourseByCode();
  }

  const createTableRow = (course) => [
    { data: course.code },
    { data: course.initials },
    { data: course.cycle },
    { data: course.name, align: "left" },
    {
      data: (
        <Link to={`/courses/${course.code}/`}>
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
          { tier: "courses/list", title: "listar" },
        ]}
      />
      <Container>
        <Sheet>
          <Title>
            <FaUniversity />
            <span>Cursos</span>
          </Title>
          <SearchSection onSubmit={handleSearch}>
            <SearchBar
              placeholder={"Procurar curso..."}
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
            <span>Procurar por código de curso</span>
          </SearchSection>
          <TableSection>
            <Table
              columns_width={[11, 10, 10, 60, 9]}
              columns={[
                { name: "Código" },
                { name: "Sigla" },
                { name: "Cíclo" },
                { name: "Nome", align: "left" },
              ]}
              rows={list}
            />
          </TableSection>
        </Sheet>
      </Container>
    </>
  );
}

export default ListCourses;
