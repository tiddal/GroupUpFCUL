import React, { useState } from "react";
import adminService from "../../../services/admin";

import { Container, Sheet, Title, Form, Button } from "./styles";

import Navigation from "../../../components/Navigation";
import Context from "../../../components/Context";
import Notification from "../../../components/Notification";
import { ButtonSpinner } from "../../../components/Spinner";
import Input from "../../../components/Input";

import { validate } from "../../../validators";

import {
  FaUserGraduate,
  FaUniversity,
  FaUserShield,
  FaUserTie,
  FaAddressCard,
} from "react-icons/fa";
import { useAuth } from "../../../hooks";

function NewStudent() {
  const initialState = {
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
    first_name: {
      id: "first_name",
      type: "text",
      label: "Nomes próprios",
      value: "",
      validation: { required: true, name: true },
      valid: false,
      error: false,
      info: "",
    },
    last_name: {
      id: "last_name",
      type: "text",
      label: "Apelidos",
      value: "",
      validation: { required: true, name: true },
      valid: false,
      error: false,
      info: "",
    },
    email: {
      id: "email",
      type: "text",
      label: "Email",
      value: "",
      validation: { required: true, email: true },
      valid: false,
      error: false,
      info: "",
    },
  };
  const { logout } = useAuth();
  const [valid, setValid] = useState(false);
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState(initialState);

  function handleInput(target, inputKey) {
    const [valid, info] = validate(
      target.value,
      newStudentForm[inputKey].validation
    );
    const updatedForm = {
      ...newStudentForm,
      [inputKey]: {
        ...newStudentForm[inputKey],
        value: target.value,
        valid,
        error: !valid,
        info,
      },
    };
    setNewStudentForm(updatedForm);
    let validForm = true;
    for (let key in updatedForm) {
      validForm = updatedForm[key].valid && validForm;
    }
    setValid(validForm);
  }

  async function handleSubmission(event) {
    event.preventDefault();
    if (!valid) return;
    setLoading(true);
    const studentData = {};
    Object.keys(newStudentForm).map(
      (key) => (studentData[key] = newStudentForm[key].value)
    );
    studentData.password = "password";
    studentData.role = { type: "admin", data: { previleges: 1 } };
    studentData.role = { type: "student", data: { previleges: 1 } };
    const [response, status] = await adminService.createStudent(studentData);
    const error = {};

    switch (status) {
      case 409:
        if (response.error.key === "email") {
          error.key = "email";
          error.msg = "Este email já se encontra registado.";
          break;
        }
        error.key = "username";
        error.msg = "Este número de utilizador já se encontra registado.";
        break;
      case 400:
        const field = response.validation.keys[0].split(".").pop();
        const [, msg] = validate(field, { [field]: true });
        error.key = field;
        error.msg = msg;
        break;
      case 401:
        logout();
        break;
      default:
        break;
    }
    if (Object.keys(error).length > 0) {
      setNewStudentForm({
        ...newStudentForm,
        [error.key]: {
          ...newStudentForm[error.key],
          info: error.msg,
          valid: false,
          error: true,
        },
      });
      setValid(false);
    } else {
      setNewStudentForm(initialState);
      setCreated(true);
      setTimeout(() => setCreated(false), 2000);
    }
    setLoading(false);
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
      <Context
        path={[
          { tier: "students", title: "alunos" },
          { tier: "students/new", title: "novo" },
        ]}
      />
      <Container>
        <Sheet>
          <Title>
            <FaAddressCard />
            <span>Novo Aluno</span>
          </Title>
          <Form autoComplete="off" onSubmit={handleSubmission}>
            {Object.keys(newStudentForm).map((key) => (
              <Input
                key={newStudentForm[key].id}
                id={newStudentForm[key].id}
                type={newStudentForm[key].type}
                label={newStudentForm[key].label}
                validation={newStudentForm[key].validation}
                error={newStudentForm[key].error}
                info={newStudentForm[key].info}
                value={newStudentForm[key].value}
                change={({ target }) =>
                  handleInput(target, newStudentForm[key].id)
                }
              />
            ))}
            <Button disabled={!valid}>
              {loading ? <ButtonSpinner /> : "Submeter"}
            </Button>
          </Form>
        </Sheet>
      </Container>
      <Notification popup={created} text={"Utilizador criado com sucesso."} />
    </>
  );
}

export default NewStudent;
