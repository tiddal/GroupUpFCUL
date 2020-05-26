import React, { useState, useEffect } from "react";
import adminService from "../../../services/admin";
import { Container, Sheet, Title, Form, Button } from "./styles";
import Navigation from "../../../components/Navigation";
import Context from "../../../components/Context";
import Notification from "../../../components/Notification";
import { ButtonSpinner } from "../../../components/Spinner";
import Input from "../../../components/Input";
import studentService from "../../../services/student";
import { validate } from "../../../validators";

import {
  FaUserGraduate,
  FaUniversity,
  FaUserShield,
  FaUserTie,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useAuth } from "../../../hooks";

function EditStudent({
  match: {
    params: { user },
  },
  history,
}) {
  const initialState = {
    first_name: {
      id: "first_name",
      type: "text",
      label: "Nomes próprios",
      value: "",
      validation: { name: true },
      valid: true,
      error: false,
      info: "",
    },
    last_name: {
      id: "last_name",
      type: "text",
      label: "Apelidos",
      value: "",
      validation: { name: true },
      valid: true,
      error: false,
      info: "",
    },
    email: {
      id: "email",
      type: "text",
      label: "Email",
      value: "",
      validation: { email: true },
      valid: true,
      error: false,
      info: "",
    },
  };
  const { logout } = useAuth();
  const [editValid, setEditValid] = useState(false);
  const [removeValid, setRemoveValid] = useState(false);
  const [edited, setEdited] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [editStudentForm, setEditStudentForm] = useState(initialState);
  const [removeStudentForm, setRemoveStudentForm] = useState({
    username: {
      id: "username",
      type: "text",
      label: "Número de aluno",
      value: "",
      validation: { match: user },
      valid: false,
      error: false,
      info: (
        <div>
          Escreva <strong>{user}</strong> para confirmar que quer remover este
          utilizador
        </div>
      ),
    },
  });

  useEffect(() => {
    let isCancelled = false;
    async function getStudent() {
      const [response, status] = await adminService.getStudentByUsername(user);
      if (!isCancelled) {
        if (status !== 200) {
          return history.push("/students/list");
        }
        Object.keys(response).map((key) =>
          setEditStudentForm((prevState) => {
            if (key in prevState)
              return {
                ...prevState,
                [key]: { ...prevState[key], value: response[key] },
              };
            return prevState;
          })
        );
      }
    }
    getStudent();
    return () => (isCancelled = true);
  }, [user, history]);

  function handleEditInputs(target, inputKey) {
    const [valid, info] = validate(
      target.value,
      editStudentForm[inputKey].validation
    );
    const updatedForm = {
      ...editStudentForm,
      [inputKey]: {
        ...editStudentForm[inputKey],
        value: target.value,
        valid,
        error: !valid,
        info,
      },
    };
    setEditStudentForm(updatedForm);
    let validForm = true;
    for (let key in updatedForm) {
      validForm = updatedForm[key].valid && validForm;
    }
    setEditValid(validForm);
  }

  function handleRemoveInput(target) {
    const [valid] = validate(
      target.value,
      removeStudentForm.username.validation
    );
    const updatedForm = {
      ...removeStudentForm,
      username: {
        ...removeStudentForm.username,
        value: target.value,
        valid,
        error: !valid,
      },
    };
    setRemoveStudentForm(updatedForm);
    setRemoveValid(updatedForm.username.valid);
  }

  async function handleEditSubmission(event) {
    event.preventDefault();
    if (!editValid) return;
    setLoadingEdit(true);
    const studentData = {};
    Object.keys(editStudentForm).map(
      (key) => (studentData[key] = editStudentForm[key].value)
    );
    const [response, status] = await adminService.editStudent(
      studentData,
      user
    );
    const error = {};

    switch (status) {
      case 409:
        error.key = "email";
        error.msg = "Este email já se encontra registado.";
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
      setEditStudentForm({
        ...editStudentForm,
        [error.key]: {
          ...editStudentForm[error.key],
          error: true,
          valid: false,
          info: error.msg,
        },
      });
      setEditValid(false);
    } else {
      setEdited(true);
      setTimeout(() => setEdited(false), 2000);
    }
    setLoadingEdit(false);
  }

  async function handleRemoveSubmission(event) {
    event.preventDefault();
    if (!removeValid) return;
    setLoadingRemove(true);
    const [, status] = await adminService.removeUser(user);
    if (status !== 204) logout();
    setLoadingEdit(false);
    history.push("/students/list");
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
          { tier: "students", title: "students" },
          { tier: `students/${user}/edit`, title: `editar ${user}` },
        ]}
      />
      <Container>
        <Sheet>
          <Title>
            <FaEdit />
            <span>{user}</span>
          </Title>
          <Form autoComplete="off" onSubmit={handleEditSubmission}>
            {Object.keys(editStudentForm).map((key) => (
              <Input
                key={editStudentForm[key].id}
                id={editStudentForm[key].id}
                type={editStudentForm[key].type}
                label={editStudentForm[key].label}
                validation={editStudentForm[key].validation}
                error={editStudentForm[key].error}
                info={editStudentForm[key].info}
                value={editStudentForm[key].value}
                change={({ target }) =>
                  handleEditInputs(target, editStudentForm[key].id)
                }
              />
            ))}
            <Button disabled={!editValid}>
              {loadingEdit ? <ButtonSpinner /> : "Guardar"}
            </Button>
          </Form>
          <Title danger>
            <FaTrash />
            <span>Remover Aluno</span>
          </Title>
          <Form autoComplete="off" onSubmit={handleRemoveSubmission}>
            <Input
              key={removeStudentForm.username.id}
              id={removeStudentForm.username.id}
              type={removeStudentForm.username.type}
              label={removeStudentForm.username.label}
              validation={removeStudentForm.username.validation}
              value={removeStudentForm.username.value}
              error={removeStudentForm.username.error}
              info={removeStudentForm.username.info}
              change={({ target }) =>
                handleRemoveInput(target, removeStudentForm.username.id)
              }
              danger
            />
            <Button disabled={!removeValid} danger>
              {loadingRemove ? <ButtonSpinner /> : "Remover"}
            </Button>
          </Form>
        </Sheet>
      </Container>
      <Notification popup={edited} text={"Alterações guardadas."} />
    </>
  );
}

export default EditStudent;
