import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import adminService from "../../../services/admin";

import { Container, Sheet, Title, Form, Button } from "./styles";

import Navigation from "../../../components/Navigation";
import Context from "../../../components/Context";
import Notification from "../../../components/Notification";
import { ButtonSpinner } from "../../../components/Spinner";
import Input from "../../../components/Input";

import { validate } from "../../../validators";

import {
  FaUsers,
  FaUserGraduate,
  FaUniversity,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import { useAuth } from "../../../hooks";

function NewUserToClass() {
  const initialStateStudent = {
    username: {
      id: "username",
      type: "text",
      label: "Número de aluno",
      value: "",
      validation: { required: true, username: true },
      valid: false,
      error: false,
      info: "",
    },
  };
  const initialStateProfessor = {
    username: {
      id: "username",
      type: "text",
      label: "Número de professor",
      value: "",
      validation: { required: true, username: true },
      valid: false,
      error: false,
      info: "",
    },
  };
  const [unitData, setUnitData] = useState({
    course_initials: "",
    course_code: "",
    unit_initials: "",
    unit_code: "",
  });
  const {
    params: { course, unit, class_number },
  } = useRouteMatch("/courses/:course/units/:unit/classes/:class_number");
  const [initializng, setInitializing] = useState(true);
  const { logout } = useAuth();
  const [valid, setValid] = useState(false);
  const [validP, setValidP] = useState(false);
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingP, setLoadingP] = useState(false);
  const [newStudentToClassForm, setNewStudentToClassForm] = useState(
    initialStateStudent
  );

  const [newProfessorToClassForm, setNewProfessorToClassForm] = useState(
    initialStateProfessor
  );

  useEffect(() => {
    async function setState() {
      const [
        { initials: course_initials, code: course_code },
      ] = await adminService.get.courseByCode(course);
      const [
        { initials: unit_initials, code: unit_code },
      ] = await adminService.get.unitByCode(course, unit);
      setUnitData({
        course_initials,
        course_code,
        unit_initials,
        unit_code,
      });
      setInitializing(false);
    }
    setState();
  }, [course, unit]);

  function handleInputStudent(target, inputKey) {
    const [valid, info] = validate(
      target.value,
      newStudentToClassForm[inputKey].validation
    );
    const updatedForm = {
      ...newStudentToClassForm,
      [inputKey]: {
        ...newStudentToClassForm[inputKey],
        value: target.value,
        valid,
        error: !valid,
        info,
      },
    };
    setNewStudentToClassForm(updatedForm);
    let validForm = true;
    for (let key in updatedForm) {
      validForm = updatedForm[key].valid && validForm;
    }
    setValid(validForm);
  }

  function handleInputProfessor(target, inputKey) {
    const [valid, info] = validate(
      target.value,
      newProfessorToClassForm[inputKey].validation
    );
    const updatedForm = {
      ...newProfessorToClassForm,
      [inputKey]: {
        ...newProfessorToClassForm[inputKey],
        value: target.value,
        valid,
        error: !valid,
        info,
      },
    };
    setNewProfessorToClassForm(updatedForm);
    let validForm = true;
    for (let key in updatedForm) {
      validForm = updatedForm[key].valid && validForm;
    }
    setValidP(validForm);
  }

  async function handleSubmissionStudent(event) {
    event.preventDefault();
    if (!valid) return;
    setLoading(true);
    const studentToClassData = {};
    Object.keys(newStudentToClassForm).map(
      (key) => (studentToClassData[key] = newStudentToClassForm[key].value)
    );
    const [response, status] = await adminService.create.studentToClass(
      unitData.unit_code,
      unitData.course_code,
      class_number,
      "2019-2020",
      studentToClassData
    );
    console.log(response);
    const error = {};
    switch (status) {
      case 409:
        error.key = "username";
        error.msg =
          "Já existe um estudante com este número de utilizador na turma.";
        break;
      case 400:
        const field = response.validation.keys[0].split(".").pop();
        const [, msg] = validate(field, { [field]: true });
        error.key = field;
        error.msg = msg;
        break;
      case 404:
        error.key = "username";
        error.msg =
          "Não existe nenhum estudante com este número de utilizador.";
        break;
      case 401:
        logout();
        break;
      default:
        break;
    }
    if (Object.keys(error).length > 0) {
      setNewStudentToClassForm({
        ...newStudentToClassForm,
        [error.key]: {
          ...newStudentToClassForm[error.key],
          info: error.msg,
          valid: false,
          error: true,
        },
      });
      setValid(false);
    } else {
      setNewStudentToClassForm(initialStateStudent);
      setCreated(true);
      setTimeout(() => setCreated(false), 2000);
    }
    setLoading(false);
  }

  async function handleSubmissionProfessor(event) {
    event.preventDefault();
    if (!valid) return;
    setLoadingP(true);
    const professorToClassData = {};
    Object.keys(newProfessorToClassForm).map(
      (key) => (professorToClassData[key] = newProfessorToClassForm[key].value)
    );
    const [response, status] = await adminService.create.professorToClass(
      unitData.unit_code,
      unitData.course_code,
      class_number,
      "2019-2020",
      professorToClassData
    );
    const error = {};
    switch (status) {
      case 409:
        error.key = "username";
        error.msg =
          "Já existe um professor com este número de utilizador na turma.";
        break;
      case 400:
        const field = response.validation.keys[0].split(".").pop();
        const [, msg] = validate(field, { [field]: true });
        error.key = field;
        error.msg = msg;
        break;
      case 404:
        error.key = "username";
        error.msg =
          "Não existe nenhum estudante com este número de utilizador.";
        break;
      case 401:
        logout();
        break;
      default:
        break;
    }
    if (Object.keys(error).length > 0) {
      setNewStudentToClassForm({
        ...newProfessorToClassForm,
        [error.key]: {
          ...newProfessorToClassForm[error.key],
          info: error.msg,
          valid: false,
          error: true,
        },
      });
      setValid(false);
    } else {
      setNewStudentToClassForm(initialStateProfessor);
      setCreated(true);
      setTimeout(() => setCreated(false), 2000);
    }
    setLoadingP(false);
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
      {!initializng && (
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
              tier: `courses/${unitData.course_code}/units/${unitData.unit_code}/classes/`,
              title: "turmas",
            },
            {
              tier: `courses/${unitData.course_code}/units/${unitData.unit_code}/classes/${class_number}`,
              title: class_number,
            },
            {
              tier: `courses/${unitData.course_code}/units/${unitData.unit_code}/classes/${class_number}/members/new`,
              title: "adicionar elemento",
            },
          ]}
        />
      )}

      <Container>
        <Sheet>
          <Title>
            <FaUsers />
            <span>Adicionar Aluno</span>
          </Title>
          <Form autoComplete="off" onSubmit={handleSubmissionStudent}>
            {Object.keys(newStudentToClassForm).map((key) => (
              <Input
                key={newStudentToClassForm[key].id}
                id={newStudentToClassForm[key].id}
                type={newStudentToClassForm[key].type}
                label={newStudentToClassForm[key].label}
                validation={newStudentToClassForm[key].validation}
                error={newStudentToClassForm[key].error}
                info={newStudentToClassForm[key].info}
                value={newStudentToClassForm[key].value}
                change={({ target }) =>
                  handleInputStudent(target, newStudentToClassForm[key].id)
                }
              />
            ))}
            <Button disabled={!valid}>
              {loading ? <ButtonSpinner /> : "Submeter"}
            </Button>
          </Form>
          <Title>
            <FaUsers />
            <span>Adicionar Professor</span>
          </Title>
          <Form autoComplete="off" onSubmit={handleSubmissionProfessor}>
            {Object.keys(newProfessorToClassForm).map((key) => (
              <Input
                key={newProfessorToClassForm[key].id}
                id={newProfessorToClassForm[key].id}
                type={newProfessorToClassForm[key].type}
                label={newProfessorToClassForm[key].label}
                validation={newProfessorToClassForm[key].validation}
                error={newProfessorToClassForm[key].error}
                info={newProfessorToClassForm[key].info}
                value={newProfessorToClassForm[key].value}
                change={({ target }) =>
                  handleInputProfessor(target, newProfessorToClassForm[key].id)
                }
              />
            ))}
            <Button disabled={!validP}>
              {loadingP ? <ButtonSpinner /> : "Submeter"}
            </Button>
          </Form>
        </Sheet>
      </Container>
      <Notification
        popup={created}
        text={"Utilizador adicionado com sucesso."}
      />
    </>
  );
}

export default NewUserToClass;
