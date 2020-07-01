import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import adminService from "../../../services/admin";

import { CardSpinner } from "../../../components/Spinner";
import Context from "../../../components/Context";
import { StatusCard, SearchCard, XSmallCard } from "../../../components/Card";

import { FaUniversity, FaListUl, FaFileUpload, FaSearch } from "react-icons/fa";
import { useYear } from "../../../hooks";

import {
  Container,
  SearchSection,
  SearchBar,
  Button,
  StatusCardData,
} from "./styles";

function CoursesPanel() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { selectedYear } = useYear();
  const [coursesData, setCoursesData] = useState({
    courses: [],
    units: [],
    classes: [],
  });
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function setState() {
      const courses = await adminService.get.courses();
      const units = await adminService.get.units();
      const classes = await adminService.get.classes(selectedYear);
      setCoursesData({ courses, units, classes });
      setLoading(false);
    }
    setState();
  }, [selectedYear]);

  function handleSearch(event) {
    event.preventDefault();
    history.push({ pathname: "/courses/list", panelSearchInput: searchInput });
  }

  return (
    <>
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
            <span>Procurar por código do curso</span>
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
          icon={<FaUniversity />}
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

export default CoursesPanel;
