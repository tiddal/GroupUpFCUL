import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useAuth, useYear } from "../../../hooks";
import studentService from "../../../services/student";

import {
  FaProjectDiagram,
  FaAngleDown,
  FaUsers,
  FaInfoCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";

import {
  Container,
  Card,
  Title,
  Content,
  Button,
  ExpandButton,
  Info,
  InfoTitle,
} from "./styles";
import Spinner from "../../../components/Spinner";
import Context from "../../../components/Context";

function Projects() {
  const {
    params: { unit },
  } = useRouteMatch("/projects/:unit");
  const { user } = useAuth();
  const { selectedYear } = useYear();
  const [unitData, setUnitData] = useState();
  const [initializing, setInitializing] = useState(true);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    async function getInitialState() {
      const classes = await studentService.get.classes(
        user.username,
        selectedYear,
        2
      );
      const [unitData] = classes.filter(
        (class_) => class_.code.toString() === unit
      );
      setUnitData(unitData);
      const projects = await studentService.get.projects(
        unitData.course_code,
        unitData.code,
        selectedYear
      );
      const projectsData = projects.map((project) => ({
        expand: true,
        number: project.number,
        name: project.name,
        min_students: project.min_students,
        max_students: project.max_students,
        description: project.description,
      }));
      setProjectsData(projectsData);
      setInitializing(false);
    }
    getInitialState();
  }, [user, unit, selectedYear]);

  function handleCardState(project) {
    setProjectsData(
      projectsData.map((p) =>
        p.number === project.number ? { ...p, expand: !p.expand } : { ...p }
      )
    );
  }

  return (
    <>
      {!initializing && (
        <Context path={[{ tier: `projects/${unit}`, title: unitData.name }]} />
      )}
      {initializing ? (
        <Spinner />
      ) : (
        <Container>
          {projectsData.map((project) => (
            <Card key={`project${project.number} `} expand={project.expand}>
              <Title onClick={() => handleCardState(project)}>
                <span>
                  <FaProjectDiagram />
                  Projeto {project.number}
                </span>
                <ExpandButton expand={project.expand}>
                  <FaAngleDown />
                </ExpandButton>
              </Title>
              <Content expand={project.expand}>
                <Info>
                  <InfoTitle>
                    <FaInfoCircle /> Projeto {project.number}
                  </InfoTitle>
                  <p>
                    Etapa: 2/4
                    <br />
                    Grupos: 12
                    <br />
                    Alunos por grupo: {project.min_students}{" "}
                    {project.min_students !== project.max_students &&
                      `a ${project.max_students}`}
                    <br />
                    <a
                      href={project.assignment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enunciado <FaExternalLinkAlt />
                    </a>
                  </p>
                </Info>

                <Button to={`/projects/${unit}/1/teams`}>
                  <FaUsers />
                  Ver Grupos
                </Button>
              </Content>
            </Card>
          ))}
        </Container>
      )}
    </>
  );
}

export default Projects;
