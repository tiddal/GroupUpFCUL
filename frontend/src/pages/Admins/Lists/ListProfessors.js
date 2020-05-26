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

function ListProfessors({ location: { panelSearchInput } }) {
  const [list, setList] = useState();
  const [searchInput, setSearchInput] = useState({
    initial: panelSearchInput ? panelSearchInput : "",
    value: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProfessors(username = "") {
      if (username === "") {
        const response = await adminService.getProfessors();
        const rows = response.map((user) => createTableRow(user));
        setList(rows);
      } else {
        const [professor, status] = await adminService.getProfessorByUsername(
          username
        );
        status === 200 ? setList([createTableRow(professor)]) : setList();
      }
    }

    if (searchInput.initial !== "") {
      getProfessors(searchInput.initial);
    } else {
      getProfessors();
    }
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

  const createTableRow = (user) => [
    {
      data: user.avatar_url ? (
        <Avatar>
          <img src={user.avatar_url} alt={`${user.username} profile`} />
        </Avatar>
      ) : (
        <Avatar>
          <span>{user.first_name.charAt(0)}</span>
        </Avatar>
      ),
    },
    { data: user.username },
    { data: `${user.first_name} ${user.last_name}`, align: "left" },
    {
      data: (
        <Link to={`/professors/${user.username}/edit`}>
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
          { tier: "professors", title: "professores" },
          { tier: "professors/list", title: "listar" },
        ]}
      />
      <Container>
        <Sheet>
          <Title>
            <FaListAlt />
            <span>Professors</span>
          </Title>
          <SearchSection onSubmit={handleSearch}>
            <SearchBar
              placeholder={"Procurar professor..."}
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
            <span>Procurar por número de professor</span>
          </SearchSection>
          <TableSection>
            <Table
              columns_width={[9, 15, 67, 9]}
              columns={[
                { name: <FaPortrait /> },
                { name: "Número" },
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

export default ListProfessors;
