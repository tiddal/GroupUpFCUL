import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import adminService from "../../../services/admin";

import { CardSpinner } from "../../../components/Spinner";
import Context from "../../../components/Context";
import { StatusCard, SearchCard, XSmallCard } from "../../../components/Card";
import { useYear } from "../../../hooks";

import { FaListUl, FaEdit, FaSearch, FaUsers } from "react-icons/fa";

import {
  Container,
  SearchSection,
  SearchBar,
  Button,
  StatusCardData,
} from "./styles";

function UnitPanel() {
  const [loading, setLoading] = useState(true);
  const { selectedYear } = useYear();
  const [unitData, setUnitData] = useState({
    course_initials: "",
    unit_initials: "",
    classes: [],
  });
  const [searchInput, setSearchInput] = useState("");
  const {
    params: { course, unit },
  } = useRouteMatch("/courses/:course/units/:unit");
  const history = useHistory();

  useEffect(() => {
    async function setState() {
      const [
        { initials: course_initials },
      ] = await adminService.get.courseByCode(course);
      const [{ initials: unit_initials }] = await adminService.get.unitByCode(
        course,
        unit
      );
      const classes = await adminService.get.classesFromUnit(
        course,
        unit,
        selectedYear
      );
      setUnitData({
        course_initials,
        unit_initials,
        classes,
      });
      setLoading(false);
    }
    setState();
  }, [course, unit, selectedYear]);

  function handleSearch(event) {
    event.preventDefault();
    history.push({
      pathname: `/courses/${course}/units/${unit}/classes`,
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
              title: unitData.course_initials,
            },
            {
              tier: `courses/${course}/units`,
              title: "cadeiras",
            },
            {
              tier: `courses/${course}/units/${unit}`,
              title: unitData.unit_initials,
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
                  {unitData.classes.length} Turmas
                </StatusCardData>
              </>
            )
          }
        />
        <SearchCard>
          <SearchSection onSubmit={handleSearch}>
            <SearchBar
              placeholder={"Procurar turma..."}
              onChange={({ target }) => setSearchInput(target.value)}
            />
            <Button>
              <FaSearch />
            </Button>
            <span>Procurar por número da turma</span>
          </SearchSection>
        </SearchCard>

        <XSmallCard
          path={`/courses/${course}/units/${unit}/classes`}
          label={"Ver Turmas"}
          icon={<FaListUl />}
        />
        <XSmallCard
          path={`/courses/${course}/units/${unit}/classes/new`}
          label={"Adicionar Turma"}
          icon={<FaUsers />}
        />
        <XSmallCard
          path={`/courses/${course}/units/${unit}/edit`}
          label={"Editar Cadeira"}
          icon={<FaEdit />}
        />
      </Container>
    </>
  );
}

export default UnitPanel;
