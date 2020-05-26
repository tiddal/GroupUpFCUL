import React, { useState, useEffect } from "react";
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
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useAuth } from "../../../hooks";

function EditAdmin({
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
  const [editAdminForm, setEditAdminForm] = useState(initialState);
  const [removeAdminForm, setRemoveAdminForm] = useState({
    username: {
      id: "username",
      type: "text",
      label: "Número de administrador",
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
    async function getAdmin() {
      const [response, status] = await adminService.getAdminByUsername(user);
      if (!isCancelled) {
        if (status !== 200) {
          return history.push("/admins/list");
        }
        Object.keys(response).map((key) =>
          setEditAdminForm((prevState) => {
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
    getAdmin();
    return () => (isCancelled = true);
  }, [user, history]);

  function handleEditInputs(target, inputKey) {
    const [valid, info] = validate(
      target.value,
      editAdminForm[inputKey].validation
    );
    const updatedForm = {
      ...editAdminForm,
      [inputKey]: {
        ...editAdminForm[inputKey],
        value: target.value,
        valid,
        error: !valid,
        info,
      },
    };
    setEditAdminForm(updatedForm);
    let validForm = true;
    for (let key in updatedForm) {
      validForm = updatedForm[key].valid && validForm;
    }
    setEditValid(validForm);
  }

  function handleRemoveInput(target) {
    const [valid] = validate(target.value, removeAdminForm.username.validation);
    const updatedForm = {
      ...removeAdminForm,
      username: {
        ...removeAdminForm.username,
        value: target.value,
        valid,
        error: !valid,
      },
    };
    setRemoveAdminForm(updatedForm);
    setRemoveValid(updatedForm.username.valid);
  }

  async function handleEditSubmission(event) {
    event.preventDefault();
    if (!editValid) return;
    setLoadingEdit(true);
    const adminData = {};
    Object.keys(editAdminForm).map(
      (key) => (adminData[key] = editAdminForm[key].value)
    );
    const [response, status] = await adminService.editAdmin(adminData, user);
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
      setEditAdminForm({
        ...editAdminForm,
        [error.key]: {
          ...editAdminForm[error.key],
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
    history.push("/admins/list");
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
          { tier: "admins", title: "admins" },
          { tier: `admins/${user}/edit`, title: `editar ${user}` },
        ]}
      />
      <Container>
        <Sheet>
          <Title>
            <FaEdit />
            <span>{user}</span>
          </Title>
          <Form autoComplete="off" onSubmit={handleEditSubmission}>
            {Object.keys(editAdminForm).map((key) => (
              <Input
                key={editAdminForm[key].id}
                id={editAdminForm[key].id}
                type={editAdminForm[key].type}
                label={editAdminForm[key].label}
                validation={editAdminForm[key].validation}
                error={editAdminForm[key].error}
                info={editAdminForm[key].info}
                value={editAdminForm[key].value}
                change={({ target }) =>
                  handleEditInputs(target, editAdminForm[key].id)
                }
              />
            ))}
            <Button disabled={!editValid}>
              {loadingEdit ? <ButtonSpinner /> : "Guardar"}
            </Button>
          </Form>
          <Title danger>
            <FaTrash />
            <span>Remover administrador</span>
          </Title>
          <Form autoComplete="off" onSubmit={handleRemoveSubmission}>
            <Input
              key={removeAdminForm.username.id}
              id={removeAdminForm.username.id}
              type={removeAdminForm.username.type}
              label={removeAdminForm.username.label}
              validation={removeAdminForm.username.validation}
              value={removeAdminForm.username.value}
              error={removeAdminForm.username.error}
              info={removeAdminForm.username.info}
              change={({ target }) =>
                handleRemoveInput(target, removeAdminForm.username.id)
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

export default EditAdmin;
